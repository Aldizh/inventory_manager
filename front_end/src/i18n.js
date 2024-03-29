import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      home: "Home",
      title: "Grocery Market",
      sales: "Sales",
      category: "Select a category from the list",
      small: "Small Volume Sales",
      big: "Large Volume Sales",
      actions: "Actions",
      inventoryEntry: "Enter Item",
      dataEntry: "Enter a sale",
      edit: "Edit",
      barCode: "Item ID",
      item: "Item",
      buyPrice: "Buy Price",
      sellPrice: "Sell Price",
      buyPriceNew: "New Buying Price",
      sellPriceNew: "New Selling Price",
      nameNew: "New Name",
      profit: "Profit",
      totals: "Totals",
      totalBuys: "Total Buys",
      totalSales: "Total Sales",
      totalProfit: "Total Profit",
      dataCorrection: "Manage | Create Item",
      delete: "Delete",
      correct: "Correct",
      newSale: "New Entry",
      updateSale: "Update Entry",
      quantity: "Quantity (Pcs)",
      quantityNew: "New Quantity",
      anonymous: "Anonymous Login",
      apiKey: "Key Login",
      google: "Google Login",
      loadAll: "Load Test Data",
      deleteAll: "Delete Test Data",
    },
  },
  al: {
    translation: {
      home: "Kreu",
      title: "Ushqimore",
      sales: "Shitjet",
      category: "Zgjidh nje nga kategorite",
      small: "Shitjet me Pakice",
      big: "Shitjet me Shumice",
      actions: "Veprime",
      inventoryEntry: "Artikull i ri",
      dataEntry: "Hidh shitje te re",
      edit: "Korrigjo",
      barCode: "Kodi i Artikullit",
      item: "Artikulli",
      buyPrice: "Cmimi i Blerjes",
      sellPrice: "Cmimi i Shitjes",
      buyPriceNew: "Cmimi i Ri i Blerjes",
      sellPriceNew: "Cmimi i Ri i Shitjes",
      nameNew: "Emri i ri",
      profit: "Fitimi (Leke te reja)",
      totals: "Totalet",
      totalBuys: "Blerjet Totale",
      totalSales: "Shitjet Totale",
      totalProfit: "Fitimi Total",
      dataCorrection: "Menaxhim | Krijim Artikulli",
      delete: "Fshi",
      correct: "Korrigjo",
      newSale: "Regjistro te dhenat ",
      updateSale: "Korrigjo te dhenat",
      quantity: "Sasia (Cope)",
      quantityNew: "Sasia e Re",
      anonymous: "Vazhdo si Anonim",
      apiKey: "Identifikohu me celes",
      google: "Identifikohu me google",
      loadAll: "Ngarko te dhena prove",
      deleteAll: "Fshi te dhenat prove",
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    lngs: ["en", "al"],
    defaultLanguage: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
