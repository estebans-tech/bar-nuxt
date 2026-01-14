export type Locale = string

export type CurrencyCode = "EUR" | "SEK" | "USD" | string

export type Money = {
  amount: number
  currency: CurrencyCode
}

export type MultilineCopy = string | string[]

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

export type PriceLine = {
  label?: string // t.ex. "Saft", "Schorle", "Flasche", "Alcohol Free"
  unit?: string  // t.ex. "0,2l", "2cl", "0,75l", "Fl.", "Portion"
  price: Money
}

export type MenuItem = {
  id: string
  name: string
  description: MultilineCopy
  price: Money
  prices?: PriceLine[]     // nya vägen
  tags?: DietaryTag[]
  allergens?: AllergenWarning[]
}

export type CalloutBlock = {
  type: "callout"
  title: string
  body: MultilineCopy
  variant?: "default" | "promo"
}

export type CategoryBlock = {
  type: "category"
  title: string
  subtitle?: MultilineCopy
}

export type ItemBlock = {
  type: "item"
  item: MenuItem
}

export type NoteBlock = {
  type: "note"
  body: MultilineCopy
}

export type MenuBlock = CalloutBlock | CategoryBlock | ItemBlock | NoteBlock

export type MenuPageModel = {
  pageTitle: string
  locale: Locale
  defaultCurrency?: CurrencyCode
  blocks: MenuBlock[]
}

