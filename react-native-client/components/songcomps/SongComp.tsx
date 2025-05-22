import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { bgColor, primaryColor, tertiaryColor } from "../ui/PrefStyles";
import { responsiveStyleSheet } from "../ui/responsive";



type songProps = {
  song: SONGOBJ;
  onPressSong: (song: SONGOBJ) => void;
  cardColor: string
}

export default function SongComp({song, onPressSong, cardColor} : songProps) {
  return (
    <TouchableOpacity style={[styles.card, {backgroundColor: cardColor}]} onPress={() => onPressSong?.(song)}>
      <Text style={styles.cardText}>{song.name}</Text>
    </TouchableOpacity>
  )
}

const styles = responsiveStyleSheet({
  card: {
    width: 120,
    height: 150,
    marginRight: 10,
    borderRadius: 12,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: primaryColor,
    textAlign: 'center',
  },
})