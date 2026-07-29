import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import AllcountProvider from "./context/AllcountProvider";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AllcountProvider>
        <App />
      </AllcountProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
