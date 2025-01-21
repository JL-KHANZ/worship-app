import { StyleSheet, Text, View } from "react-native";
import { mainScreenStyles, primaryColor, secondaryColor } from "../ui/PrefStyles";

interface Props {
    role: String
}

export default function RoleTagComp({ role }: Props) {
    return (
        <View style={localStyle.box}>
            <Text style={[mainScreenStyles.text, {textAlign: 'center'}]}>{role}</Text>
        </View>
    )
}

const localStyle = StyleSheet.create({
    box: {
        backgroundColor: secondaryColor,
        width: 300,
        height: 40,
        marginBlockStart: 125,
        marginLeft: 50,
        justifyContent: 'center',
        borderCurve: "circular",
        borderRadius: 7
    }
})