import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={[{fontSize: 50, marginBlockEnd: 40, fontWeight: '900'}, styles.text]}>Sign In</Text>
                <Text style={[{fontSize: 25, marginBlockEnd: 10}, styles.text]}>Username</Text>
                <Text style={[{fontSize: 25, marginBlockEnd: 30}, styles.text]}>Password</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={[{fontSize: 25}, styles.text]}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4E4E4E',
    },
    text: {
        color: '#fff',
        marginLeft: 60,
        fontFamily: 'Apple SD Gothic Neo',
    },
    view: {
        marginBlockStart: 300,
        backgroundColor: "#363636",
        paddingBlockStart: 50
    },
    button: {
        marginLeft: 60,
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#FFAE00',
        borderColor: '#FFAE00',
        borderRadius: 10,
        borderWidth: 10,
    }
})