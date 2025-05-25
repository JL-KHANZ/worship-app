import { Text } from "react-native"
import { mainScreenStyles } from "../ui/PrefStyles"
import { useEffect } from "react";
import { getAllSetSongs } from "@/api";

interface Props {
  set: SETCLIENT,
}

var setSongs: Array<SONGCLIENT>;
export default function SetComp({ set }: Props) {

  setSongs = getAllSetSongs(set.id);

  return (
    <Text style={mainScreenStyles.subtitleText}>{set.id}</Text>
  )
}