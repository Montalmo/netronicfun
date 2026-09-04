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
    eyebrowBrand: "Lasertag Netronic Fun",
    eyebrowCity: "Magdeburg",
    eyebrowCountry: "Deutschland",
    titleLine1: "LASERTAG-BUSINESS.",
    titleLine2: "SCHLÜSSELFERTIG.",
    subtitle:
      "Wir bauen Ihr profitables Lasertag-Center – von der Ausrüstung bis zum ersten zahlenden Gast",
    catalog: "Katalog herunterladen",
    beratung: "Kostenlose Beratung",
    contact: "Kontaktieren Sie uns",
    slideAlt: "Lasertag-Ausrüstung von Netronic",
    slideLabel: "Bild",
    stats: [
  { value: "2 000 +", label: "Lasertag-Center weltweit" },
  { value: "15", label: "Jahre Erfahrung" },
  { value: "80 +", label: "Länder" },
],
partner: "Offizieller Partner von Netronic",
startTitle: "Sie wollen einen Lasertag-Business starten?",
problemsTitle: "Probleme",
solutionsTitle: "Lösungen",
problems: [
  "Hohe Investition, unklare Rendite",
  "Komplexe Technik, lange Einarbeitung",
  "Keine Ahnung von Marketing",
],
solutions: [
  "Klarer Businessplan mit 9–18 Monaten ROI",
  "Plug & Play — Setup in 10 Minuten",
  "Fertige Marketing-Kits inklusive",
],
sliderPrev: "Vorheriger Slide",
sliderNext: "Nächster Slide",
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
    eyebrowBrand: "Lasertag Netronic Fun",
    eyebrowCity: "Magdeburg",
    eyebrowCountry: "Germany",
    titleLine1: "LASERTAG BUSINESS.",
    titleLine2: "TURNKEY.",
    subtitle:
      "We build your profitable lasertag center – from equipment to the first paying guest",
    catalog: "Download catalog",
    beratung: "Free consultation",
    contact: "Contact us",
    slideAlt: "Lasertag equipment by Netronic",
    slideLabel: "Image",
    stats: [
  { value: "2,000+", label: "Lasertag centers worldwide" },
  { value: "15", label: "Years of experience" },
  { value: "80+", label: "Countries" },
],
partner: "Official partner of Netronic",
startTitle: "Want to start a lasertag business?",
problemsTitle: "Problems",
solutionsTitle: "Solutions",
problems: [
  "High investment, unclear returns",
  "Complex tech, long onboarding",
  "No clue about marketing",
],
solutions: [
  "Clear business plan with 9–18 month ROI",
  "Plug & play — setup in 10 minutes",
  "Ready-made marketing kits included",
],
sliderPrev: "Previous slide",
sliderNext: "Next slide",
  },
};

const dictionaries: Record<Locale, typeof de> = { de, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.de;
}