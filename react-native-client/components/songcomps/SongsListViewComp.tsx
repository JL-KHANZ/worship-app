import { ScrollView, Text } from "react-native";
import { mainScreenStyles } from "../ui/PrefStyles";
import SongListComp from "./SongListComp";

interface Props {
    songList: Array<any>,
    viewTitle: String
} 
export default function SongsListViewComp({ songList, viewTitle }: Props ) {

    return (
        <ScrollView style={{marginLeft: 30}}>
            <Text style={[mainScreenStyles.smallTitleText, {marginBlockEnd: 20}]}>{viewTitle}</Text>
            <SongListComp songSources={songList} />
        </ScrollView>
    )
}
