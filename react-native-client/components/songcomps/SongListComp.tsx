import { Image, ScrollView, Text, StyleSheet, View } from "react-native";
import SongComp from "./SongComp";

interface Props {
    songSources: Array<SONGOBJ>,
}

export default function SongListComp({ songSources }: Props) {
    return (
        <ScrollView>
            <SongList songSources={songSources} />
        </ScrollView>
    )
}

function SongList({ songSources }: Props) {
    return(
        <View style={localStyles.songListView}>
            {songSources.map(song => {
                return (
                    <View style={localStyles.songView}>
                        <SongComp songSource={song.route} key={song.songId} name={song.name} />
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