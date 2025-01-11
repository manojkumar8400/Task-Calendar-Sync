import { GoogleLogin } from "@react-oauth/google"
import React, { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
export const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    console.log("Login Success:", credentialResponse)

    try {
      const decodedToken = jwtDecode(credentialResponse.credential)
      // localStorage.setItem("gToken", credentialResponse.credential)
      console.log("Decoded Token:", decodedToken)

      // Extract user profile info
      const { name, email, picture } = decodedToken
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

  //   useEffect(() => {
  //     const gToken = localStorage.getItem("gToken")
  //     if (gToken) {
  //         handleSuccess()
  //       console.log("Token Found:", gToken)
  //     }
  //   }, [])

  // const fetchCalendarEvents = async (accessToken) => {
  //   try {
  //     const response = await axios.get(
  //       "https://www.googleapis.com/calendar/v3/calendars/primary/events",
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     )
  //     return response.data.items
  //   } catch (err) {
  //     console.error("Error fetching calendar events:", err)
  //   }
  // }

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed")
        }}
        useOneTap
        access_type='offline'
        prompt='consent'
      />
    </div>
  )
}
