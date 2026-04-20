const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function useFormatters() {
  function formatCurrency(value) {
    return currencyFormatter.format(value)
  }

  function formatDate(value) {
    const date = value instanceof Date ? value : new Date(value)
    return dateFormatter.format(date)
  }

  return { formatCurrency, formatDate }
}
