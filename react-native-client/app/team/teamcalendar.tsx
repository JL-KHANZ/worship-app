import { getAllTeamSetLists } from "@/api";
import { bgColor } from "@/components/ui/PrefStyles";
import { responsiveStyleSheet } from "@/components/ui/responsive";
import { useTeam } from "@/context/teamContext";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function TeamCalendar() {
  const [teamSets, setTeamSets] = useState<Array<SETCLIENT | null>>()

  const { team } = useTeam();
  useEffect(() => {
    async function getData() {
      if(!team) return;
      const res = getAllTeamSetLists(team?.teamId)
    }

    getData()
  })

  function Calendar() {
    return (
      <View>
        <Text>캘린더</Text>
      </View>
    )
  }


  return (
    <View style={styles.view}>
      <Text style={styles.calendarTitle}>{team?.teamName} 캘린더:</Text>
      <Calendar  />
    </View>
  )
}

const styles = responsiveStyleSheet({
  view: {
    backgroundColor: bgColor,
    flex: 1,
    padding: 30
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#888"
  }
})