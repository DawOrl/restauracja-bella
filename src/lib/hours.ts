import { restaurant, type OpeningHours } from "@/data/restaurant";

/** Indeks = Date#getDay() (0 = niedziela), nazwy dni jak w schema.org. */
const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Godziny otwarcia w dniu tygodnia (0 = niedziela). */
export function hoursForWeekday(day: number): OpeningHours | undefined {
  return restaurant.hours.find((h) => h.days.includes(SCHEMA_DAYS[day]));
}

/** Bieżący dzień tygodnia w Krakowie, niezależnie od strefy przeglądarki. */
export function warsawWeekday(now = new Date()): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Warsaw",
    weekday: "long",
  }).format(now);
  return SCHEMA_DAYS.indexOf(name);
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Godziny rezerwacji co 30 minut: od otwarcia do godziny przed zamknięciem
 * (ostatni stolik musi zdążyć zjeść). Dzień z formularza (YYYY-MM-DD) albo
 * najdłuższy dzień tygodnia, gdy data nie jest jeszcze wybrana.
 */
export function reservationSlots(isoDate?: string): string[] {
  let hours: OpeningHours | undefined;
  if (isoDate) {
    const [y, m, d] = isoDate.split("-").map(Number);
    hours = hoursForWeekday(new Date(y, m - 1, d).getDay());
  }
  const opens = toMinutes(hours?.opens ?? "12:00");
  const closes = hours
    ? toMinutes(hours.closes)
    : Math.max(...restaurant.hours.map((h) => toMinutes(h.closes)));
  const slots: string[] = [];
  for (let t = opens; t <= closes - 60; t += 30) slots.push(toHHMM(t));
  return slots;
}

/** Krótki opis godzin do akapitu: "codziennie od 12:00". */
export function earliestOpening(): string {
  const all = restaurant.hours.map((h) => h.opens).sort();
  return all[0];
}
