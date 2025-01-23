import { Text } from "react-native"
import { mainScreenStyles } from "../ui/PrefStyles"

interface Props {
    set: any,
    allSongs: any
}

export default function SetComp({set, allSongs} : Props) {
    console.log("test", set[0].setId)

    return (
        <Text style={mainScreenStyles.subtitleText}>{ set[0].setId }</Text>
    )
}