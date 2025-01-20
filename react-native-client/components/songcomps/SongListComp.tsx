import { Image, ScrollView, Text, StyleSheet } from "react-native";
import SongComp from "./SongComp";

interface Props {
    songSources: Array<any>,
}

export default function SongListComp({ songSources }: Props) {
    return (
        <ScrollView style={songListStyle.song}>
            <SongList songSources={songSources} />
        </ScrollView>
    )
}

function SongList({ songSources }: Props) {
    return songSources.map(song => {
        return <SongComp songSource={song} />
    })
}
// must be shown as row ... why does it not work
const songListStyle = StyleSheet.create({
    song: {
        flex: 1,
        flexDirection: 'row'
    }
})