import { Text, View, StyleSheet } from "react-native";
import SetComp from "./SetComp";
import { mainScreenStyles } from "../ui/PrefStyles";
import { getAllSongs } from "@/assets/api";
import { useEffect } from "react";

interface Props {
    sets : Array<SETOBJ>,
}

export default function SetListComp({ sets }: Props) {
    return(
        <View style={localStyles.songListView}>
            {sets.map((set : any) => {
                return (
                    <View style={localStyles.songView}>
                        <SetComp set={set} key={set.setId} />
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
