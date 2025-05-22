import { ScrollView, Text } from "react-native";
import { mainScreenStyles } from "../ui/PrefStyles";
import SongListComp from "./SongListComp";

interface Props {
    songList: Array<SONGOBJ>,
    viewTitle: String
}
export default function SongsListViewComp({ songList, viewTitle }: Props ) {

    function viewSong() {
      console.log("test")
    }
    return (
        <ScrollView style={{marginLeft: 30}}>
            <Text style={[mainScreenStyles.smallTitleText, {marginBlockEnd: 20}]}>{viewTitle}</Text>
            <SongListComp songs={songList} onPressSong={viewSong} />
        </ScrollView>
    )
}
