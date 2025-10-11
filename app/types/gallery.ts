// Public types for the Instagram/vibe grid

export interface GalleryItem {
    src: string
    alt: string
  }
  
  export interface InstagramConfig {
    handle?: string
    href: string
    images: GalleryItem[]
  }
  