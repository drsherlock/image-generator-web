import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  return store;
}

export const store = configureStore();
