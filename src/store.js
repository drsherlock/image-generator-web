import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

export function configureStore() {
  const store = createStore(reducers, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
