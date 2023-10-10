import * as Realm from "realm-web"

const REALM_APP_ID = "stock_viewer-szhrv"

const app = new Realm.App({ id: REALM_APP_ID })

import {
  isLoggedIn,
  loginAnonymous,
  loginWithKey,
  loginWithGoogle,
  logoutUser,
} from "./authentication"

export { app, isLoggedIn, loginAnonymous, loginWithKey, loginWithGoogle, logoutUser }
