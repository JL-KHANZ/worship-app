import { createContext, useContext, useState } from "react"

interface TeamContextValue {
  team: TEAMCLIENT | null,
  saveTeam: (user: TEAMCLIENT | null) => void
}

const TeamContext = createContext<TeamContextValue | undefined>(undefined)

export function TeamProvider({ children }: any) {
  const [team, saveTeam] = useState<TEAMCLIENT | null>(null)
  return (
    <TeamContext.Provider value={{ team, saveTeam }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}