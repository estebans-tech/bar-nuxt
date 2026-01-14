# Meny – datamodell och komponentstruktur (Nuxt)

Det här dokumentet beskriver en **linjär** datamodell (”block i ordning”) som funkar för:
- 1 kolumn på mobil
- 2 kolumner på desktop via kolumnlayout/flow (utan att datat behöver veta om vänster/höger)

## Datamodell (TypeScript)

```ts
export type Locale = string

export type CurrencyCode = "EUR" | "SEK" | "USD" | string

export type Money = {
  amount: number
  currency: CurrencyCode
}

export type Text = string | string[]

export type DietaryTag = "V" | "VEGAN" | "GF" | "SPICY" | string

export type AllergenWarning =
  | "GLUTEN"
  | "MILK"
  | "EGG"
  | "FISH"
  | "PEANUT"
  | "SOY"
  | "TREE_NUTS"
  | "CELERY"
  | "MUSTARD"
  | "SESAME"
  | "SULPHITES"
  | "LUPIN"
  | "MOLLUSCS"
  | string

export type MenuItem = {
  id: string
  name: string
  description: Text
  price: Money
  tags?: DietaryTag[]
  allergens?: AllergenWarning[]
}

export type CalloutBlock = {
  type: "callout"
  title: string
  body: Text
  variant?: "default" | "promo"
}

export type CategoryBlock = {
  type: "category"
  title: string
  subtitle?: Text
}

export type ItemBlock = {
  type: "item"
  item: MenuItem
}

export type MenuBlock = CalloutBlock | CategoryBlock | ItemBlock

export type MenuPageModel = {
  pageTitle: string
  locale: Locale
  defaultCurrency?: CurrencyCode
  blocks: MenuBlock[]
}
```

### Modellprinciper

- `blocks` är en **enda** lista i läsordning: `callout → category → item → item → category → item …`
- En rätt (item) är ett eget block (`ItemBlock`) för att vara en **osplitbar enhet** när vi kolumniserar.
- En kategori definieras av en `CategoryBlock` och “gäller” tills nästa `CategoryBlock` dyker upp.
- `allergens` är en lista med allergivarningar per rätt. Den är optional för att ni ska kunna börja smått, men kan göras obligatorisk när datat är komplett.

### Exempel på dataform (förenklad)

```ts
const page: MenuPageModel = {
  pageTitle: "Speisekarte",
  locale: "de-DE",
  defaultCurrency: "EUR",
  blocks: [
    { type: "callout", title: "Montag ist Pizzatag", body: "..." },

    { type: "category", title: "PIZZA", subtitle: "..." },
    {
      type: "item",
      item: {
        id: "veg",
        name: "Vegetaria",
        description: "...",
        price: { amount: 12.9, currency: "EUR" },
        tags: ["V"],
        allergens: ["GLUTEN", "MILK"]
      }
    },

    { type: "category", title: "PASTA" },
    {
      type: "item",
      item: {
        id: "carb",
        name: "Carbonara",
        description: "...",
        price: { amount: 13.9, currency: "EUR" },
        allergens: ["GLUTEN", "EGG", "MILK"]
      }
    }
  ]
}
```

## Komponentstruktur (Nuxt)

Målet är att hålla komponenter små och med tydliga ansvar.

### Komponentträd (översikt)

```
MenuPage
└─ MenuBackgroundDecor
└─ MenuHeader
└─ MenuFlow
   ├─ (render block: callout)  → MenuCalloutCard
   ├─ (render block: category) → MenuCategoryHeader
   └─ (render block: item)     → MenuItemRow
      ├─ MenuItemTitleLine
      │  ├─ MenuItemName
      │  ├─ MenuItemBadges
      │  └─ MenuPrice
      ├─ MenuItemDescription
      └─ MenuItemAllergens (valfri)
```

### Ansvar per komponent

- **MenuPage**
  - sidcontainer, maxbredd, padding
  - laddar/receivar `MenuPageModel`

- **MenuBackgroundDecor**
  - rent dekorlager (absolut positionerat, pointer-events none)

- **MenuHeader**
  - renderar sidtitel (t.ex. “SPEISEKARTE”)

- **MenuFlow**
  - renderar `blocks` i ordning med `switch(block.type)`
  - hanterar responsiv layout:
    - mobil: normal vertikal stack
    - desktop: 2-kolumns “flow” (multi-column) eller annan strategi
  - ser till att block som inte får splittras hålls ihop (t.ex. item och callout)

- **MenuCalloutCard**
  - callout/promo-rutan (title + body) och dess styling

- **MenuCategoryHeader**
  - rubrik + eventuell underrad
  - kan (om ni vill) bära logik för att “hänga ihop” med nästa item så rubriker inte blir ensamma

- **MenuItemRow**
  - radrendering av en rätt:
    - namn + badges vänster
    - pris höger
    - beskrivning på egen rad
    - allergener (om ni väljer att visa dem i menyn)

- **MenuItemAllergens**
  - presenterar `allergens` som t.ex. textrad (“Allergener: gluten, mjölk”) eller små markörer
  - kan mappa interna koder (`"MILK"`) till displaytext enligt `locale`

- **MenuPrice**
  - format/typografi för pris (t.ex. decimaler, valuta)
  - använder `locale` + currency (fallback från `defaultCurrency`)

### Optional: logikkomponent för “gruppering”
Om ni senare behöver listor per kategori (t.ex. filter eller “hoppa till”) kan ni skapa en ren hjälpfunktion/komponent:

- **useMenuSections(blocks)**
  - gör om flödet till `[{ category, items[] }, ...]` utan att ändra originalmodellen

Det gör att ni kan ha både:
- render = flöde (för kolumnlayout)
- data = grupperad vy (för index, filter, sök)
