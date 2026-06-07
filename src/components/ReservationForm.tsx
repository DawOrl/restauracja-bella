"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

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

function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 12; h <= 21; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 21) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

export function ReservationForm() {
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {}
  );
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const timeSlots = useMemo(() => buildTimeSlots(), []);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Podaj imię i nazwisko.";
    if (fields.phone.replace(/\D/g, "").length < 9)
      next.phone = "Podaj poprawny numer telefonu.";
    if (!fields.date) next.date = "Wybierz datę.";
    else if (fields.date < today) next.date = "Data nie może być z przeszłości.";
    if (!fields.time) next.time = "Wybierz godzinę.";
    if (!fields.guests) next.guests = "Wybierz liczbę osób.";
    if (!fields.consent) next.consent = "Wymagana zgoda.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
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
        setServerError(data.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch {
      setStatus("error");
      setServerError("Brak połączenia. Spróbuj ponownie za chwilę.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-cream/10 p-10 text-center ring-1 ring-cream/15">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-3xl text-gold">
          ✓
        </div>
        <h3 className="mt-6 font-display text-2xl text-cream">
          Dziękujemy, {fields.name.split(" ")[0]}!
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
          Otrzymaliśmy Twoją prośbę o rezerwację na {fields.date} o {fields.time}{" "}
          dla {fields.guests} os. Oddzwonimy, aby ją potwierdzić.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(initial);
            setStatus("idle");
          }}
          className="mt-7 rounded-full border border-cream/30 px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
        >
          Nowa rezerwacja
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold focus:bg-cream/10";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — ukryty przed ludźmi */}
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

      <Field label="Imię i nazwisko" error={errors.name} htmlFor="r-name">
        <input
          id="r-name"
          type="text"
          autoComplete="name"
          placeholder="Jan Kowalski"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          className={cn(inputCls, errors.name ? "border-red-300" : "border-cream/20")}
        />
      </Field>

      <Field label="Telefon" error={errors.phone} htmlFor="r-phone">
        <input
          id="r-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="600 100 200"
          value={fields.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={cn(inputCls, errors.phone ? "border-red-300" : "border-cream/20")}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Data" error={errors.date} htmlFor="r-date">
          <input
            id="r-date"
            type="date"
            min={today}
            value={fields.date}
            onChange={(e) => update("date", e.target.value)}
            className={cn(
              inputCls,
              "scheme-dark",
              errors.date ? "border-red-300" : "border-cream/20"
            )}
          />
        </Field>
        <Field label="Godzina" error={errors.time} htmlFor="r-time">
          <select
            id="r-time"
            value={fields.time}
            onChange={(e) => update("time", e.target.value)}
            className={cn(inputCls, errors.time ? "border-red-300" : "border-cream/20")}
          >
            <option value="" disabled>
              Wybierz
            </option>
            {timeSlots.map((t) => (
              <option key={t} value={t} className="text-espresso">
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Liczba osób" error={errors.guests} htmlFor="r-guests">
        <select
          id="r-guests"
          value={fields.guests}
          onChange={(e) => update("guests", e.target.value)}
          className={cn(inputCls, errors.guests ? "border-red-300" : "border-cream/20")}
        >
          <option value="" disabled>
            Wybierz
          </option>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <option key={n} value={String(n)} className="text-espresso">
              {n} {n === 1 ? "osoba" : "osoby"}
            </option>
          ))}
          <option value="8+" className="text-espresso">
            8+ (grupa)
          </option>
        </select>
      </Field>

      <Field label="Uwagi (opcjonalnie)" htmlFor="r-message">
        <textarea
          id="r-message"
          rows={3}
          placeholder="Alergie, stolik przy oknie, okazja…"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputCls, "resize-none border-cream/20")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-cream/70">
        <input
          type="checkbox"
          checked={fields.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
        />
        <span>
          Wyrażam zgodę na kontakt telefoniczny w celu potwierdzenia rezerwacji.
          {errors.consent && (
            <span className="block text-red-300">{errors.consent}</span>
          )}
        </span>
      </label>

      {serverError && (
        <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-200">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-gold px-6 py-4 text-base font-semibold text-espresso shadow-sm transition-all duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Wysyłanie…" : "Zarezerwuj stolik"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-cream/85"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
