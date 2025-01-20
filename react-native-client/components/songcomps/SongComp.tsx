import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
    songSource: any,
}

export default function SongComp({ songSource }: Props) {
    return (
        <Image source={songSource} style={imageStyle.image} />
    )
}

const imageStyle = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    }
})