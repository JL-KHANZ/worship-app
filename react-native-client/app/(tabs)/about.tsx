import { Text, View, StyleSheet, Button } from 'react-native';


export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About Screen</Text>
            <Button onPress={testFunc} title='Button' color='#ffff'/>
        </View>
    );
}

function testFunc() {
    console.log("test");
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
    },
})