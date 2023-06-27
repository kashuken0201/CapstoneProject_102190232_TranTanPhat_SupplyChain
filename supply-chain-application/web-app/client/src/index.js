import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { PaginationProvider } from "./context/paginationContext/PaginationContext";
import { RawContextProvider } from "./context/rawContext/RawContext";
import { ProductsContextProvider } from "./context/productContext/ProductContext";
import { UsersContextProvider } from "./context/userContext/UserContext";
import { DashboardContextProvider } from "./context/dashboardContext/DashboardContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <DashboardContextProvider>
      <ProductsContextProvider>
        <RawContextProvider>
          <UsersContextProvider>
            <PaginationProvider>
                <App />
            </PaginationProvider>
          </UsersContextProvider>
        </RawContextProvider>
      </ProductsContextProvider>
    </DashboardContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
