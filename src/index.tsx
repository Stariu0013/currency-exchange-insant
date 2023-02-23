import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";

import App from "./components/App/App";

import { store } from "./store/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>,
);
