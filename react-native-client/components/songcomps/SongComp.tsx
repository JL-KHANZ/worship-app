import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { primaryColor, mainScreenStyles } from "../ui/PrefStyles";

interface Props {
    songSource: any,
    name: string,
}

export default function SongComp({ songSource, name }: Props) {
    return (
        <View>
            <Image source={songSource} style={localStyles.image}/>
            <Text numberOfLines={1} style={[mainScreenStyles.subtitleText, localStyles.text]}>{name}</Text>
        </View>
    )
}

const localStyles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderCurve: 'circular',
        borderRadius: 10,
    },
    text: {
        textAlign: 'center', 
        marginBlockStart: 10, 
        width: 150, 
        alignItems: 'center'
    }
})