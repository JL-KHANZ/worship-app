import { Text, View, StyleSheet } from "react-native";
import SetComp from "./SetComp";
import { mainScreenStyles } from "../ui/PrefStyles";
import { allSongs } from "@/assets/exampleSongs/exampleDB";

interface Props {
    sets : any,
    allSongs: any
}

export default function SetListComp({ sets }: Props) {
    return(
        <View style={localStyles.songListView}>
            {sets.map((set : any) => {
                return (
                    <View style={localStyles.songView}>
                        <SetComp set={set} key={set.setId} allSongs={allSongs} />
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