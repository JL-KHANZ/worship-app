import { Text, View, StyleSheet } from "react-native";
import SetComp from "./SetComp";
import { mainScreenStyles } from "../ui/PrefStyles";
import { getAllSongs } from "@/api";
import { useEffect } from "react";

interface Props {
  sets: Array<SETCLIENT>,
}

export default function SetListComp({ sets }: Props) {
  return (
    <View style={localStyles.songListView}>
      {sets.map((set: SETCLIENT) => {
        return (
          <View style={localStyles.songView}>
            <SetComp set={set} key={set.id} />
          </View>
        )
      })}
    </View>
  )
}

const localStyles = StyleSheet.create({
  songListView: {
    flexDirection: 'row'
  },
  songView: {
    marginRight: 30,
  }
})
