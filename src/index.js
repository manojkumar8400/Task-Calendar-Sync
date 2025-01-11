import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { TaskCrudProvider } from "./contexts/TaskCrudContext"
import { NetworkProvider } from "./contexts/NetworkContext"
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="301551714404-i2skvvk2epqfsjo4uddlbo2ial1cbeid.apps.googleusercontent.com">
      <TaskCrudProvider>
        <NetworkProvider>
          <App />
        </NetworkProvider>
      </TaskCrudProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
