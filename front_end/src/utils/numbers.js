// Utility to display price (static conversion form lek/usd for now)
// TO DO: Use currency conversion library to get the latest price
export const formatPrice = price => {
  const decimalPrice = parseFloat(price).toFixed(2)
  const lang = localStorage.getItem("language")
  switch (lang) {
    case "en":
      return `$${decimalPrice}`
    case "al":
      return `${decimalPrice * 100} lek`
    default:
      return `$${decimalPrice}`
  }
}
