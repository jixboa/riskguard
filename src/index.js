import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = document.getElementById("root");
const rootComponent = createRoot(root);
rootComponent.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
