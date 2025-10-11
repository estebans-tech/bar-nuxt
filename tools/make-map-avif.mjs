import sharp from 'sharp'

await sharp('public/images/sena-google-maps.png')
  .resize(1600, 900, { fit: 'cover', position: 'centre' })
  .toFormat('avif', { quality: 62 })
  .toFile('public/images/map/map-preview.avif')

console.log('wrote public/images/map/map-preview.avif')