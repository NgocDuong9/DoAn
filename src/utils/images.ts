export const getFileUrl = (path?: string | null) => {
  if (!path)
    return 'https://archive.org/download/placeholder-image/placeholder-image.jpg'

  if (path.includes('http://') || path.includes('https://')) return path

  return `${process.env.NEXT_PUBLIC_SUPABASE_FILE_URL}/${path.replace(/[\u200B-\u200D\uFEFF]/g, '')}`
}

export const onErrorHandler = (e: any) => {
  const target = e.currentTarget as HTMLImageElement
  target.onerror = null // Prevents infinite loop if placeholder fails
  target.src = 'https://via.placeholder.com/100' // URL to your placeholder image
}
export const onErrorHandlerCar = (e: any) => {
  const target = e.currentTarget as HTMLImageElement
  target.onerror = null // Prevents infinite loop if placeholder fails
  target.src = '/background/gt3.png' // URL to your placeholder image
}
