const escapeHTML = unsafe_str =>
  unsafe_str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;") // '&apos;' is not valid HTML 4

const langToCurrMap = () => {
  const lang = localStorage.getItem("language")
  switch (lang) {
    case "en":
      return "USD"
    case "al":
      return "ALL"
    default:
      return "USD"
  }
}

export { escapeHTML, langToCurrMap }
