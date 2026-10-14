/*
  Wspólne narzędzia dla nakładek (menu mobilne, podgląd galerii).

  lockScroll: licznik zamiast bezpośredniego body.style.overflow, więc
  zamknięcie jednej nakładki nie zdejmuje blokady, którą trzyma druga.

  isolate: oznacza jako `inert` wszystko w <body> poza gałęzią z nakładką.
  Tab, czytnik ekranu i kliknięcia nie wychodzą wtedy pod spód; po
  zamknięciu przywracamy tylko to, co sami oznaczyliśmy.
*/

let locks = 0;
let savedOverflow = "";

export function lockScroll(): () => void {
  if (locks === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = savedOverflow;
  };
}

export function isolate(keep: Element): () => void {
  const changed: HTMLElement[] = [];
  for (const child of Array.from(document.body.children)) {
    if (!(child instanceof HTMLElement)) continue;
    if (child === keep || child.contains(keep) || child.inert) continue;
    child.inert = true;
    changed.push(child);
  }
  return () => {
    for (const el of changed) el.inert = false;
  };
}
