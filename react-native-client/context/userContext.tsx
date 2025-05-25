import { createContext, useContext, useState } from "react"

interface UserContextValue {
  user: USERCLIENT | null,
  saveUser: (user: USERCLIENT | null) => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children }: any) {
  const [user, saveUser] = useState<USERCLIENT | null>(null)
  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}