import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { bgColor, primaryColor, tertiaryColor } from "../ui/PrefStyles";
import { responsiveStyleSheet } from "../ui/responsive";

type songProps = {
  song: SONGCLIENT;
  onPressSong: (song: SONGCLIENT) => void;
  cardColor: string
}

export default function SongComp({song, onPressSong, cardColor} : songProps) {
  return (
    <TouchableOpacity style={[styles.card, {backgroundColor: cardColor}]} onPress={() => onPressSong?.(song)}>
      <Text style={styles.cardText}>{song.name}</Text>
      <Text style={styles.cardKeyText}>{song.artist}</Text>
      <Text style={styles.cardText}>{song.key}키</Text>
    </TouchableOpacity>
  )
}

const styles = responsiveStyleSheet({
  card: {
    width: 100,
    height: 120,
    marginRight: 10,
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 12,
    fontWeight: '500',
    color: primaryColor,
    textAlign: 'center',
  },
  cardKeyText: {
    fontSize: 9,
    fontWeight: '500',
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5,
    fontStyle: "italic"
  },
})