export const formatDate = (input?: string | number): string => {
  if (!input) return ''

  const date = new Date(input).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return date
}
