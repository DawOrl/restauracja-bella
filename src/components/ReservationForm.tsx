"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { reservationSlots } from "@/lib/hours";

type Status = "idle" | "submitting" | "success" | "error";

type Fields = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

const initial: Fields = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  message: "",
  consent: false,
  company: "",
};

const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

/** 1 osoba, 2-4 osoby, 5+ osób */
function guestsLabel(value: string) {
  if (value === "8+") return "8 i więcej osób";
  const n = Number(value);
  if (n === 1) return "1 osoba";
  if (n >= 2 && n <= 4) return `${n} osoby`;
  return `${n} osób`;
}

/** Dzisiejsza data lokalnie jako YYYY-MM-DD (toISOString dałby datę w UTC). */
function localToday() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(y, m - 1, d));
}

const FIELD_ORDER: (keyof Fields)[] = [
  "name",
  "phone",
  "date",
  "time",
  "guests",
  "consent",
];

export function ReservationForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const today = useMemo(() => localToday(), []);
  const timeSlots = useMemo(
    () => reservationSlots(fields.date || undefined),
    [fields.date],
  );

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => {
      const nextFields = { ...f, [key]: value };
      // zmiana daty: godzina spoza godzin otwarcia tego dnia przestaje być ważna
      if (
        key === "date" &&
        f.time &&
        !reservationSlots(String(value) || undefined).includes(f.time)
      ) {
        nextFields.time = "";
      }
      return nextFields;
    });
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (fields.name.trim().length < 2) next.name = "Podaj imię i nazwisko.";
    if (fields.phone.replace(/\D/g, "").length < 9)
      next.phone = "Podaj numer telefonu (co najmniej 9 cyfr).";
    if (!fields.date) next.date = "Wybierz datę.";
    else if (fields.date < today) next.date = "Ta data już minęła.";
    if (!fields.time) next.time = "Wybierz godzinę.";
    if (!fields.guests) next.guests = "Wybierz liczbę osób.";
    if (!fields.consent)
      next.consent = "Bez tej zgody nie potwierdzimy rezerwacji.";
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const found = validate();
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/rezerwacja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(
          data.error ?? "Nie udało się wysłać zgłoszenia. Spróbuj ponownie.",
        );
      }
    } catch {
      setStatus("error");
      setServerError(
        "Brak połączenia z serwerem. Spróbuj ponownie za chwilę albo zadzwoń.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex min-h-[22rem] flex-col items-start justify-center sm:min-h-[28rem]"
        role="status"
      >
        <p className="kicker">Grazie</p>
        <h3 className="mt-3 font-display text-4xl leading-tight text-espresso">
          Dziękujemy, {fields.name.trim().split(" ")[0]}.
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-espresso-soft">
          Mamy Twoją prośbę o stolik: {formatDate(fields.date)}, godz.{" "}
          {fields.time}, {guestsLabel(fields.guests)}. Oddzwonimy na{" "}
          {fields.phone}, żeby ją potwierdzić.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(initial);
            setStatus("idle");
          }}
          className="mt-8 inline-flex min-h-11 items-center rounded-full border border-espresso/25 px-6 text-sm font-semibold text-espresso transition-colors hover:border-espresso"
        >
          Wyślij kolejne zgłoszenie
        </button>
      </div>
    );
  }

  const inputCls =
    "block w-full rounded-md border bg-white/70 px-4 py-3 text-base text-espresso placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] focus:border-terracotta focus:shadow-[0_0_0_3px_rgba(178,58,30,0.15)]";
  const borderFor = (k: keyof Fields) =>
    errors[k] ? "border-terracotta" : "border-espresso/20";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      aria-describedby="rez-info"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-espresso/20 pb-4">
        <h3 className="font-display text-2xl text-espresso">
          Prośba o rezerwację
        </h3>
        <p id="rez-info" className="text-sm text-muted">
          Wszystkie pola poza uwagami są wymagane.
        </p>
      </div>

      {/* Honeypot: ukryty przed ludźmi */}
      <div aria-hidden className="sr-only">
        <label>
          Nie wypełniaj
          <input
            tabIndex={-1}
            autoComplete="off"
            value={fields.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Imię i nazwisko" error={errors.name} htmlFor="r-name">
          <input
            id="r-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="np. Anna Nowak"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "r-name-err" : undefined}
            className={cn(inputCls, borderFor("name"))}
          />
        </Field>

        <Field label="Telefon" error={errors.phone} htmlFor="r-phone">
          <input
            id="r-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="np. 600 100 200"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "r-phone-err" : undefined}
            className={cn(inputCls, borderFor("phone"))}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        <Field
          label="Data"
          error={errors.date}
          htmlFor="r-date"
          className="col-span-2 sm:col-span-1"
        >
          <input
            id="r-date"
            name="date"
            type="date"
            min={today}
            suppressHydrationWarning
            value={fields.date}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "r-date-err" : undefined}
            className={cn(inputCls, "min-h-[3.125rem]", borderFor("date"))}
          />
        </Field>
        <Field label="Godzina" error={errors.time} htmlFor="r-time">
          <select
            id="r-time"
            name="time"
            value={fields.time}
            onChange={(e) => update("time", e.target.value)}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "r-time-err" : undefined}
            className={cn(
              inputCls,
              "min-h-[3.125rem] appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%234a3a2e' stroke-width='1.5'/%3E%3C/svg%3E\")] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10",
              borderFor("time"),
            )}
          >
            <option value="" disabled>
              Wybierz
            </option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Liczba osób" error={errors.guests} htmlFor="r-guests">
          <select
            id="r-guests"
            name="guests"
            value={fields.guests}
            onChange={(e) => update("guests", e.target.value)}
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? "r-guests-err" : undefined}
            className={cn(
              inputCls,
              "min-h-[3.125rem] appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%234a3a2e' stroke-width='1.5'/%3E%3C/svg%3E\")] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10",
              borderFor("guests"),
            )}
          >
            <option value="" disabled>
              Wybierz
            </option>
            {GUESTS.map((g) => (
              <option key={g} value={g}>
                {guestsLabel(g)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Uwagi (opcjonalnie)" htmlFor="r-message">
        <textarea
          id="r-message"
          name="message"
          rows={3}
          placeholder="Alergie, krzesełko dla dziecka, okazja..."
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputCls, "resize-none border-espresso/20")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 py-1 text-sm leading-relaxed text-espresso-soft">
          <input
            type="checkbox"
            name="consent"
            checked={fields.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "r-consent-err" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-terracotta"
          />
          <span>
            Zgadzam się na telefon w sprawie potwierdzenia tej rezerwacji.
          </span>
        </label>
        {errors.consent && (
          <p
            id="r-consent-err"
            className="mt-1 pl-8 text-sm font-medium text-terracotta"
          >
            {errors.consent}
          </p>
        )}
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-md border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-sm text-terracotta-dark"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-terracotta px-6 py-4 text-base font-semibold text-cream transition-colors duration-200 hover:bg-terracotta-dark active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting"
          ? "Wysyłamy zgłoszenie..."
          : "Wyślij prośbę o stolik"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-espresso"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-err`}
          className="mt-1.5 text-sm font-medium text-terracotta"
        >
          {error}
        </p>
      )}
    </div>
  );
}
