import {
  isLoggedIn,
  loginAnonymous,
  loginWithKey,
  logoutUser,
} from "./authentication"

import { app } from "./Realm"

export { app, isLoggedIn, loginAnonymous, loginWithKey, logoutUser }
