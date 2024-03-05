//front/src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./component/errorBoundary";
import { AuthProvider } from "./context/authContext";

ReactDOM.render(
  <ErrorBoundary>
    <AuthProvider>
    <App />
  </AuthProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);