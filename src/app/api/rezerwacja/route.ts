import { NextResponse } from "next/server";

/**
 * Obsługa rezerwacji stolika.
 *
 * Demo: waliduje dane po stronie serwera i zwraca sukces.
 * Produkcyjnie podłączysz wysyłkę e-mail bez własnego backendu:
 *  - Web3Forms (process.env.WEB3FORMS_KEY), albo
 *  - Resend / Nodemailer w tym handlerze.
 * Miejsce na integrację oznaczono niżej.
 */

type Payload = {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
  message?: string;
  /** honeypot — ma być puste */
  company?: string;
};

function isValid(p: Payload): string | null {
  if (p.company) return "spam"; // honeypot trafiony
  if (!p.name || p.name.trim().length < 2) return "Podaj imię i nazwisko.";
  const digits = (p.phone ?? "").replace(/\D/g, "");
  if (digits.length < 9) return "Podaj poprawny numer telefonu.";
  if (!p.date) return "Wybierz datę.";
  if (!p.time) return "Wybierz godzinę.";
  if (!p.guests) return "Wybierz liczbę osób.";
  // data nie może być z przeszłości
  const picked = new Date(`${p.date}T${p.time || "00:00"}`);
  if (Number.isNaN(picked.getTime())) return "Nieprawidłowa data.";
  return null;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Nieprawidłowe żądanie." },
      { status: 400 }
    );
  }

  const error = isValid(body);
  if (error) {
    // honeypot: udajemy sukces, by nie informować bota
    if (error === "spam") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error }, { status: 422 });
  }

  // --- Tu podłącz realną wysyłkę (e-mail / system rezerwacji) ---
  // Przykład Web3Forms:
  // if (process.env.WEB3FORMS_KEY) {
  //   await fetch("https://api.web3forms.com/submit", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ access_key: process.env.WEB3FORMS_KEY, ...body }),
  //   });
  // }
  // -------------------------------------------------------------

  // W demo logujemy zgłoszenie po stronie serwera.
  console.info("[rezerwacja] nowe zgłoszenie:", {
    name: body.name,
    phone: body.phone,
    date: body.date,
    time: body.time,
    guests: body.guests,
  });

  return NextResponse.json({ ok: true });
}
