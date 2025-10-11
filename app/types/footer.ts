export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterConfig {
  brand: { name: string; tagline?: string }
  address: { line1: string; line2: string }
  phone: { label: string; href: string }
  links: {
    quick: FooterLink[]
    legal: FooterLink[]
  }
  social?: FooterLink[] // e.g. instagram
  todayOpenText?: string
}