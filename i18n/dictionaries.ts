import type { Locale } from "./config";

const de = {
  meta: {
    title: "Lasertag Netronic Fun | Schlüsselfertige Lasertag-Arenen",
    description:
      "Wir bauen Ihr profitables Lasertag-Center in Deutschland – von der Ausrüstung bis zum ersten zahlenden Gast.",
  },
  menu: {
    label: "Seitenmenü",
    open: "Seitenmenü öffnen",
    close: "Menü schließen",
    home: "HOME",
    geraete: "GERÄTE",
    geschaeftsmodell: "GESCHÄFTSMODELL",
    schluesselfertig: "SCHLÜSSELFERTIG",
    ueberUns: "ÜBER UNS",
    kontakt: "KONTAKT",
  },
  language: {
    label: "die Sprache",
    switch: "Sprache wechseln",
  },
  hero: {
    titleLine1: "LASERTAG-BUSINESS.",
    titleLine2: "SCHLÜSSELFERTIG.",
    subtitle:
      "Wir bauen Ihr profitables Lasertag-Center – von der Ausrüstung bis zum ersten zahlenden Gast",
    catalog: "Katalog herunterladen",
    beratung: "Kostenlose Beratung",
    contact: "Kontaktieren Sie uns",
    slideAlt: "Lasertag-Ausrüstung von Netronic",
    slideLabel: "Bild",
  },
};

const en: typeof de = {
  meta: {
    title: "Lasertag Netronic Fun | Turnkey Lasertag Arenas",
    description:
      "We build your profitable lasertag center in Germany – from equipment to the first paying guest.",
  },
  menu: {
    label: "Side menu",
    open: "Open side menu",
    close: "Close menu",
    home: "HOME",
    geraete: "EQUIPMENT",
    geschaeftsmodell: "BUSINESS MODEL",
    schluesselfertig: "TURNKEY",
    ueberUns: "ABOUT US",
    kontakt: "CONTACT",
  },
  language: {
    label: "the Language",
    switch: "Switch language",
  },
  hero: {
    titleLine1: "LASERTAG BUSINESS.",
    titleLine2: "TURNKEY.",
    subtitle:
      "We build your profitable lasertag center – from equipment to the first paying guest",
    catalog: "Download catalog",
    beratung: "Free consultation",
    contact: "Contact us",
    slideAlt: "Lasertag equipment by Netronic",
    slideLabel: "Image",
  },
};

const dictionaries: Record<Locale, typeof de> = { de, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.de;
}