import logo from "./logo.svg"
import "./App.css"
import { Header, Login, Logout } from "./components"
import { TaskList } from "./Screen"
import { gapi } from "gapi-script"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // const clientId = '301551714404-i2skvvk2epqfsjo4uddlbo2ial1cbeid.apps.googleusercontent.com';

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   }

  //   gapi.load('client:auth2', start)
  // })

  const handleSuccess = async (token) => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        // localStorage.setItem("gToken", token)
        // console.log("Decoded Token:", decodedToken)

        // Extract user profile info
        const { name, email, picture } = decodedToken
        if (name) {
          setIsLoggedIn(true)
        }
        console.log("Name:", name)
        console.log("Email:", email)
        console.log("Picture:", picture)

        // Access Google Calendar API
        //   const accessToken = credentialResponse.credential
        //   const calendarEvents = await fetchCalendarEvents(accessToken)
        //   console.log("Calendar Events:", calendarEvents)
      } catch (err) {
        console.error("Error decoding token or fetching events:", err)
      }
    }
  }

  useEffect(() => {
    const gToken = localStorage.getItem("gToken")
    if (gToken) {
      handleSuccess(gToken)
    }
  }, [])

  return (
    <div className='App'>
      {!isLoggedIn ? <TaskList /> : <Login />}
      {/*<TaskList />*/}
      {/*<Logout />*/}
    </div>
  )
}

export default App
