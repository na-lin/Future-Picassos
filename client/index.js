import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./app/App";
import { BrowserRouter as Router } from "react-router-dom";

// MUI
import { ThemeProvider, CssBaseline } from "@mui/material";
import { customThemeOptions } from "./app/theme/customTheme";

const root = createRoot(document.getElementById("app"));

root.render(
  <ThemeProvider theme={customThemeOptions}>
    <CssBaseline />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>
);
