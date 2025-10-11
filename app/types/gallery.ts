// Public types for the Instagram/vibe grid

export interface GalleryItem {
  src: string
  alt: string
}
  
export interface GalleryConfig {
  title?: string
  handle?: string
  href: string
  subtitle?: string
  cta?: { label: string; href: string }
  images: GalleryItem[]
}