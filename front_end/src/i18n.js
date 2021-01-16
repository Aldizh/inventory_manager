import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "title": "Zhupani Market",
      "sales": "Sales",
      "small": "Small Volume",
      "big": "Large Volume",
      "home": "Home",
      "dataEntry": "Data Entry",
      "barCode": "Bar Code",
      "item": "Item",
      "buyPrice": "Buy Price",
      "sellPrice": "Sell Price",
      "buyPriceNew": "New Buying Price",
      "sellPriceNew": "New Selling Price",
      "nameNew": "New Name",
      "profit": "Profit",
      "totals": "Totals",
      "totalBuys": "Total Buys",
      "totalSales": "Total Sales",
      "totalProfit": "Total Profit",
      "dataCorrection": "Data Correction/Deletion",
      "delete": "Delete",
      "correct": "Correct",
      "newSale": "New Sale",
      "quantity": "Quantity",
      "quantityNew": "New Quantity"
    }
  },
  al: {
    translation: {
      "title": "Market Zhupani",
      "sales": "Shitjet",
      "small": "Pakice",
      "big": "Shumice",
      "home": "Kreu",
      "dataEntry": "Hedhje te Dhenash",
      "barCode": "Bar Kodi",
      "item": "Artikulli",
      "buyPrice": "Cmimi i Blerjes",
      "sellPrice": "Cmimi i Shitjes",
      "buyPriceNew": "Cmimi i Ri i Blerjes",
      "sellPriceNew": "Cmimi i Ri i Shitjes",
      "nameNew": "Emri i ri",
      "profit": "Fitimi (Leke te reja)",
      "totals": "Totalet",
      "totalBuys": "Blerjet Totale",
      "totalSales": "Shitjet Totale",
      "totalProfit": "Fitimi Total",
      "dataCorrection": "Fshirje/Korrigjim te dhenash",
      "delete": "Fshi",
      "correct": "Korrigjo",
      "newSale": "Shitje e Re",
      "quantity": "Sasia",
      "quantityNew": "Sasia e Re"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
