// get the next array index basically to insert to db
export const generateId = (dataCount) => (dataCount)

export const formatPrice = (price) => {
  const decimalPrice = parseFloat(price).toFixed(2)
  const lang = localStorage.getItem('language');
  switch (lang) {
    case 'en':
      return `$${decimalPrice}`
    case 'al':
      return `${decimalPrice} lek`
    default:
      return `$${decimalPrice}`
  }
}
