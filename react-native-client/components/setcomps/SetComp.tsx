import { Text } from "react-native"
import { mainScreenStyles } from "../ui/PrefStyles"
import { useEffect } from "react";
import { getAllSetSongs } from "@/assets/api";

interface Props {
    set: SETOBJ,
}

var setSongs : Array<SONGOBJ>;
export default function SetComp({set} : Props) {

    setSongs = getAllSetSongs(set.setId);
    console.log("test", set.setId)

    return (
        <Text style={mainScreenStyles.subtitleText}>{ set.setId }</Text>
    )
}