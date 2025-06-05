import { Text, TouchableOpacity, View } from "react-native"
import { primaryColor, tertiaryColor } from "../ui/PrefStyles"
import { getAllSetSongs } from "@/api";
import { responsiveStyleSheet } from "../ui/responsive";
import { useSetViewStore } from "@/lib/setStore";
import { router } from "expo-router";

interface Props {
  set: SETCLIENT,
}

var setSongs: Array<SONGCLIENT>;
export default function SetComp({ set }: Props) {

  setSongs = getAllSetSongs(set.id);

  function gotoSet() {
    useSetViewStore.getState().setSet(set)
    router.push(`/setviewer/${set.id}`)
  }

  return (
    <TouchableOpacity style={styles.view} onPress={gotoSet}>
      <Text style={styles.title}>{set.name}</Text>
      <Text style={styles.date}>만든날짜:{set.dateCreated}</Text>
      {set.songs.map((item, index) => (
        <View style={styles.setsonglist}>
          <Text style={styles.setsongindex}>{index+1}.</Text>
          <Text style={styles.setsongname}>{item.name}</Text>
        </View>
      ))}
      <View style={{ flex: 1 }}></View>
    </TouchableOpacity>
  )
}
const styles = responsiveStyleSheet({

  view: {
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 10,
    padding: 10,
    width: 110,
    height: 110,
    margin: 5,
    overflow: 'hidden'
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
  },
  setsonglist: {
    flexDirection: "row",
    marginVertical: 1,
    marginRight: 10
  },
  setsongindex: {
    color: tertiaryColor,
    fontSize: 10,
    marginRight: 3
  },
  setsongname: {
  },
  date: {
    alignItems: "flex-end",
    color: tertiaryColor,
    marginBottom: 2
  }
})