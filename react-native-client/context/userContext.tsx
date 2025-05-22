import { createContext, useContext, useState } from "react"

interface UserContextValue {
    user : USEROBJ | null,
    saveUser : (user : USEROBJ | null) => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children } : any) {
    const [user, saveUser] = useState<USEROBJ | null>(null)
    return (
        <UserContext.Provider value={{user, saveUser}}>
            { children }
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