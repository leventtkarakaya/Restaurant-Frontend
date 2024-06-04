import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../context/userContext.jsx";
import { FoodProvider } from "../context/foodContext.jsx";
import { UserContextProvider } from "../context/cardContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FoodProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </FoodProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
