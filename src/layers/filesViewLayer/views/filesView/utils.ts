export const isImage = (path: string) =>
  !!path.toLowerCase().match(/\.(jpe?g|png|webp|avif)$/)
