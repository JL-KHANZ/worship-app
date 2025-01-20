import { ScrollView, Text } from "react-native";
import { mainScreenStyles } from "../ui/PrefStyles";
import SongListComp from "./SongListComp";

export default function RecentSongsComp() {
    const songList = [
        require('../../assets/exampleSongs/song1.png'),
        require('../../assets/exampleSongs/song2.jpeg'),
        require('../../assets/exampleSongs/song3.jpeg'),
        require('../../assets/exampleSongs/song4.jpeg'),
    ]

    return (
        <ScrollView style={{marginLeft: 70}}>
            <Text style={mainScreenStyles.smallTitleText}>RecentSongs</Text>
            <SongListComp songSources={songList} />
        </ScrollView>
    )
}
