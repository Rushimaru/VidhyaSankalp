import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

/* CSS */
import "./assets/css/lib/bootstrap.min.css"
import "./assets/css/style.css"

/* Bootstrap JS (VERY IMPORTANT for dropdowns) */
import "bootstrap/dist/js/bootstrap.bundle.min.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
