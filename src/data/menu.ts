/**
 * Karta Bella Cucina.
 * Edytujesz tutaj — sekcja "Menu" i dane strukturalne aktualizują się same.
 * Zdjęcie pozycji podpina się automatycznie po `id` (zob. `menuImages`
 * w `src/data/images.ts`) — plik `src/images/menu/<id>.jpg`.
 */

export type DietTag = "wege" | "ostre" | "bezglutenowe" | "ryba" | "polecane";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** cena w PLN */
  price: number;
  tags?: DietTag[];
  /** wyróżniona pozycja (np. „polecane") — flaga danych */
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  /** nazwa włoska — duży nagłówek */
  name: string;
  /** podtytuł po polsku */
  subtitle: string;
  /** krótkie wprowadzenie */
  blurb?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "antipasti",
    name: "Antipasti",
    subtitle: "Przystawki",
    blurb: "Na dobry początek — to, czym dzielimy się przy stole.",
    items: [
      {
        id: "bruschette",
        name: "Bruschette al pomodoro",
        description:
          "Grzanki z chrupiącego chleba na zakwasie, pomidory z bazylią, czosnek i oliwa extra vergine.",
        price: 24,
        tags: ["wege"],
      },
      {
        id: "burrata",
        name: "Burrata di Puglia",
        description:
          "Kremowa burrata z Apulii, pomidory San Marzano, świeża bazylia i oliwa z pierwszego tłoczenia.",
        price: 39,
        tags: ["wege", "polecane"],
        featured: true,
      },
      {
        id: "tagliere",
        name: "Tagliere misto",
        description:
          "Deska włoskich wędlin i serów: prosciutto di Parma, salami, pecorino, gorgonzola, oliwki i grissini.",
        price: 58,
      },
      {
        id: "vitello",
        name: "Vitello tonnato",
        description:
          "Cienko krojona cielęcina w aksamitnym sosie z tuńczyka, kaparami i rukolą.",
        price: 42,
        tags: ["ryba"],
      },
      {
        id: "caprese",
        name: "Insalata caprese",
        description:
          "Mozzarella di bufala, dojrzałe pomidory, bazylia i krem balsamiczny.",
        price: 32,
        tags: ["wege", "bezglutenowe"],
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    subtitle: "Makarony",
    blurb: "Wyrabiany ręcznie każdego ranka. Serce naszej kuchni.",
    items: [
      {
        id: "carbonara",
        name: "Spaghetti alla carbonara",
        description:
          "Klasyka z Rzymu: guanciale, żółtka, pecorino romano i świeżo mielony pieprz. Bez śmietany.",
        price: 44,
        tags: ["polecane"],
        featured: true,
      },
      {
        id: "tagliatelle-ragu",
        name: "Tagliatelle al ragù",
        description:
          "Świeże tagliatelle z wolno duszonym ragù z wołowiny po bolońsku.",
        price: 48,
      },
      {
        id: "cacio-pepe",
        name: "Tonnarelli cacio e pepe",
        description: "Trzy składniki, perfekcja: makaron, pecorino i pieprz.",
        price: 39,
        tags: ["wege"],
      },
      {
        id: "ravioli",
        name: "Ravioli ricotta e spinaci",
        description:
          "Ręcznie lepione ravioli z ricottą i szpinakiem, masło szałwiowe i parmezan.",
        price: 46,
        tags: ["wege"],
      },
      {
        id: "frutti",
        name: "Linguine ai frutti di mare",
        description:
          "Linguine z owocami morza, czosnkiem, białym winem i pietruszką.",
        price: 56,
        tags: ["ryba"],
      },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    subtitle: "Z pieca opalanego drewnem",
    blurb: "Ciasto dojrzewa 48 godzin. Wypiek 90 sekund w 450°C.",
    items: [
      {
        id: "margherita",
        name: "Margherita",
        description:
          "Sos z pomidorów San Marzano, fior di latte, bazylia, oliwa extra vergine.",
        price: 34,
        tags: ["wege", "polecane"],
        featured: true,
      },
      {
        id: "diavola",
        name: "Diavola",
        description: "Pikantne salami spianata, mozzarella, pomidory, oliwki.",
        price: 42,
        tags: ["ostre"],
      },
      {
        id: "quattro",
        name: "Quattro formaggi",
        description:
          "Mozzarella, gorgonzola, fontina i parmezan z nutą miodu.",
        price: 44,
        tags: ["wege"],
      },
      {
        id: "prosciutto",
        name: "Prosciutto e rucola",
        description:
          "Mozzarella, prosciutto di Parma, rukola, płatki parmezanu.",
        price: 46,
      },
      {
        id: "ortolana",
        name: "Ortolana",
        description:
          "Grillowane warzywa, mozzarella, pomidory, bazylia.",
        price: 40,
        tags: ["wege"],
      },
    ],
  },
  {
    id: "secondi",
    name: "Secondi",
    subtitle: "Dania główne",
    blurb: "Sycące dania prosto z włoskich regionów.",
    items: [
      {
        id: "ossobuco",
        name: "Ossobuco alla milanese",
        description:
          "Wolno duszona gicz cielęca z risotto szafranowym i gremolatą.",
        price: 72,
        tags: ["polecane"],
      },
      {
        id: "branzino",
        name: "Branzino al forno",
        description:
          "Pieczona labraks z cytryną, ziołami i pieczonymi ziemniakami.",
        price: 68,
        tags: ["ryba", "bezglutenowe"],
      },
      {
        id: "pollo",
        name: "Pollo alla parmigiana",
        description:
          "Pierś z kurczaka w panierce, sos pomidorowy, mozzarella, parmezan.",
        price: 54,
      },
      {
        id: "melanzane",
        name: "Melanzane alla parmigiana",
        description:
          "Zapiekany bakłażan z sosem pomidorowym, mozzarellą i bazylią.",
        price: 46,
        tags: ["wege", "bezglutenowe"],
      },
    ],
  },
  {
    id: "dolci",
    name: "Dolci",
    subtitle: "Desery",
    blurb: "Słodkie zakończenie, jak u włoskiej nonny.",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisù della casa",
        description:
          "Nasz sztandarowy deser: mascarpone, espresso, biszkopty savoiardi, kakao.",
        price: 26,
        tags: ["wege", "polecane"],
        featured: true,
      },
      {
        id: "pannacotta",
        name: "Panna cotta ai frutti di bosco",
        description: "Aksamitna panna cotta z sosem z owoców leśnych.",
        price: 24,
        tags: ["wege", "bezglutenowe"],
      },
      {
        id: "cannoli",
        name: "Cannoli siciliani",
        description:
          "Chrupiące rurki z kremem ricotta, kawałkami czekolady i pistacją.",
        price: 25,
        tags: ["wege"],
      },
      {
        id: "gelato",
        name: "Gelato artigianale",
        description: "Domowe lody rzemieślnicze — zapytaj o smaki dnia.",
        price: 18,
        tags: ["wege", "bezglutenowe"],
      },
    ],
  },
  {
    id: "bevande",
    name: "Bevande",
    subtitle: "Napoje i wina",
    blurb: "Wina prosto z włoskich winnic i klasyczne aperitivo.",
    items: [
      {
        id: "vino-rosso",
        name: "Vino della casa (rosso / bianco)",
        description: "Wino domowe — kieliszek / karafka 0,5 l.",
        price: 18,
      },
      {
        id: "chianti",
        name: "Chianti Classico DOCG",
        description: "Toskania, butelka 0,75 l.",
        price: 120,
      },
      {
        id: "aperol",
        name: "Aperol Spritz",
        description: "Aperol, Prosecco, woda gazowana, plasterek pomarańczy.",
        price: 26,
        tags: ["polecane"],
      },
      {
        id: "negroni",
        name: "Negroni",
        description: "Gin, Campari, czerwony wermut.",
        price: 28,
      },
      {
        id: "espresso",
        name: "Caffè espresso",
        description: "Prawdziwe włoskie espresso.",
        price: 10,
      },
      {
        id: "acqua",
        name: "Acqua Panna / San Pellegrino",
        description: "Woda niegazowana / gazowana 0,75 l.",
        price: 14,
      },
    ],
  },
];

/** Liczba osób do selecta rezerwacji itp. — pomocnicze */
export const dietTagLabels: Record<DietTag, string> = {
  wege: "Wege",
  ostre: "Ostre",
  bezglutenowe: "Bez glutenu",
  ryba: "Ryba",
  polecane: "Polecane",
};
