import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bgColor, primaryColor, secondaryColor, tertiaryColor } from "../ui/PrefStyles";
import { responsiveStyleSheet } from "../ui/responsive";
import { IconSymbol } from "../ui/IconSymbol";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

type songProps = {
  song: SONGCLIENT;
  onPressSong: (song: string) => void;
  onSelectSong: (song: SONGCLIENT) => void;
  onDeselectSong: (song: SONGCLIENT) => void;
  cardColor: string
}

export default function SongComp({ song, onPressSong, cardColor, onSelectSong, onDeselectSong }: songProps) {
  const [selected, setSelected] = useState<boolean>(false)

  function songSelect() {
    setSelected(!selected);
    if(!selected) {
      onSelectSong(song);
    } else {
      onDeselectSong(song);
    }
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.checkBox} onPress={songSelect}>
        {selected ?
        <MaterialIcons name="radio-button-checked" color={primaryColor} size={30} />
      :
        <MaterialIcons name="radio-button-unchecked" color={primaryColor} size={30} />
       }
      </TouchableOpacity>
      <TouchableOpacity style={styles.song} onPress={() => onPressSong?.(song.id)}>
        <Text style={styles.cardText}>{song.name}</Text>
        <Text style={styles.cardText}>{song.artist}</Text>
        <Text style={styles.cardText}>{song.repKey}키</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = responsiveStyleSheet({
  card: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'space-between',
    backgroundColor: secondaryColor
  },
  cardText: {
    fontSize: 11,
    fontWeight: '500',
    color: primaryColor,
    textAlign: 'center',
  },
  checkBox: {
    padding: 5,
    justifyContent: "center",
  },
  song: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  }
})