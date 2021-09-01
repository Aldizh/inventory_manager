import { createStore } from "redux"

const defaultState = {
  pageData: [],
  totalCount: 0,
}

function manageStore(state, action) {
  switch (action.type) {
    case "UPDATE_INVENTORY":
      return {
        ...state,
        pageData: action.data,
      }
    case "UPDATE_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.data,
      }
    default:
      return state
  }
}

const store = createStore(manageStore, defaultState)
export default store
