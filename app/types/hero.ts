// Types used by HeroSection component
export interface HappyHour {
    active: boolean
    text: string
  }
  
  export interface HeroProps {
    title: string
    subtitle: string
    heroImage: string
    phoneHref: string
    mapsHref: string
    openInfo?: string
    happyHour?: HappyHour
  }