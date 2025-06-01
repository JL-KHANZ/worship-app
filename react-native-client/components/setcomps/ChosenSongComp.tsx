import { StyleSheet, Text, View } from "react-native";
import { primaryColor, secondaryColor, tertiaryColor } from "../ui/PrefStyles";
import { useEffect, useState } from "react";
import { responsiveStyleSheet } from "../ui/responsive";

type Props = {
  song: SONGCLIENT;
  numb: number;
}
export default function ChosenSongComp({ song, numb }: Props) {

  const [chosenKey, setChosenKey] = useState<string>("")

  useEffect(() => {
    if (song.repKey) setChosenKey(song.repKey)
    else setChosenKey("TBC")
  }, [])
  return (
    <>
      <View style={styles.chosenSongCard}>
        <Text style={styles.indexNumber}>{numb}</Text>
        <Text style={styles.songTitle}>{song.name}</Text>
        <Text style={styles.songKey}>{chosenKey}키</Text>
      </View>
    </>
  )
}

const styles = responsiveStyleSheet({
  chosenSongCard: {
    marginHorizontal: 35,
    padding: 5,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  indexNumber: {
    color: secondaryColor,
    fontSize: 10
  },
  songTitle: {
    color: secondaryColor,
    fontSize: 12
  },
  songKey: {
    color: secondaryColor,
    fontSize: 10
  },
})