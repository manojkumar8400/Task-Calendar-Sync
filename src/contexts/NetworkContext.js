import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react"

// Create a context for network status
const NetworkContext = createContext()

const NetworkProvider = ({ children }) => {
  const [isOnline, setOnline] = useState(() => navigator.onLine)

  const setOnlineToTrue = useCallback(() => {
    setOnline(true)
  }, [])

  const setOnlineToFalse = useCallback(() => {
    setOnline(false)
  }, [])

  useEffect(() => {
    window.addEventListener("online", setOnlineToTrue)
    window.addEventListener("offline", setOnlineToFalse)

    return () => {
      window.removeEventListener("online", setOnlineToTrue)
      window.removeEventListener("offline", setOnlineToFalse)
    }
  }, [setOnlineToTrue, setOnlineToFalse])
  
  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetworkCheck = () => useContext(NetworkContext)
export { useNetworkCheck, NetworkProvider }
