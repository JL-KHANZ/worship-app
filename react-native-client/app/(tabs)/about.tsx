import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {

    const handlePress = () => {
        console.log("text pressed");
    }
    const myText = 'view: most basic building block. can use SafeAreaView to make sure content does not conflict spacially with device displays text: text can have styles that use StyleSheet, images can either bring local image or from an api - local -> requier("route") ; api -> {uri, width, height}'

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} onPress={handlePress}>What I've learnt</Text>
            <Text style={styles.text}>{myText}</Text>
            <Image source={{
                uri: "https://picsum.photos/200/300",
                width: 300,
                height: 300,
            }} resizeMode='contain' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
    },
})