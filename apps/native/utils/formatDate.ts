export const formatDueDate = (date: Date) => {
  if (!date) return ''

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return formattedDate.replace(/\b(\d{1,2})\b/, (day) => `${day}`)
}
