import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function AboutScreen() {

    const handlePress = () => {
        console.log("button pressed");
    }
    const myText = 'view: most basic building block. can use SafeAreaView to make sure content does not conflict spacially with device displays text: text can have styles that use StyleSheet, images can either bring local image or from an api - local -> requier("route") ; api -> {uri, width, height}'

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Button onPress={() => alert('button tapped')} title='Test' color={'orange'}/>
                <Link href='/signin' style={{color:'#fff'}}>
                    <Text style={{color:'#000'}}>GO</Text>
                </Link>
            </View>
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
    view: {
        flex: 1,
        marginLeft: 30,
    }
})