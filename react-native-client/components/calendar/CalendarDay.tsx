import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { responsiveStyleSheet } from "../ui/responsive";
import { primaryColor, secondaryColor } from "../ui/PrefStyles";

type Props = {
  day: string,
  setList: Array<SETCLIENT> | null
}
export default function CalendarDay({ day, setList } : Props) {
  const [hasSet, setHasSet] = useState<boolean>(false)
  const [set, setSet] = useState<SETCLIENT | null>(null)

  useEffect(() => {
    if (!setList) return;
    for (let i of setList) {
      if (i.targetDate.toString() == day) {
        setHasSet(true)
        break
      }
    }

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>{day.slice(8, 10)}</Text>
    </View>
  )
}

const styles = responsiveStyleSheet({
  container: {
    width: '90%',
    aspectRatio: 0.8,
    backgroundColor: secondaryColor,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: '5%',
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: primaryColor,
  }
})