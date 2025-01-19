import { Link } from 'expo-router';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const signInFunc = () => {
    console.log("Sign in button pressed")
}

export default function AboutScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                
                {/* Title */}
                <Text style={[{fontSize: 50, marginBlockEnd: 60, fontWeight: '900'}, styles.text]}>Sign In</Text>

                {/* User Input */}
                <View style={[{marginBlockEnd: 20},styles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, styles.text]}>Username:</Text>
                    <TextInput style={styles.input} placeholder='username' onFocus={changeColor} />
                </View>
                <View style={[{marginBlockEnd: 40},styles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, styles.text]}>Password: </Text>
                    <TextInput style={styles.input} placeholder='password'/>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity onPress={signInFunc} style={styles.button}>
                    <Text style={[{fontSize: 20, fontWeight: '700', fontFamily: fontfamily, color: primaryColor}]}>Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Go To Button */}
            <TouchableOpacity style={{marginBlockStart: 15, marginLeft: 60}}>
                <Link href={'/signup'}>
                    <Text style={{
                        color: secondaryColor,
                        textDecorationLine: 'underline',
                        fontWeight: '200',
                        fontFamily: fontfamily
                    }}>Don't have an account? Press here to Sign Up</Text>
                </Link>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const fontfamily = 'Helvetica'
const primaryColor = '#fff'
const secondaryColor = '#FFAE00'
const tertiaryColor = '#363636'
const bgColor = '#4E4E4E'

const changeColor = () => {
    console.log("test")
}


const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: bgColor,
    },
    text: {
        color: primaryColor,
        marginLeft: 60,
        fontFamily: fontfamily,
    },
    input: {
        flex: 1,
        color: 'white',
        marginRight: 200,
        borderColor: primaryColor,
        borderWidth: 1,
        paddingBlockStart: 10,
        paddingBlockEnd: 10,
        borderCurve: 'circular',
        borderRadius: 5,
    },
    view: {
        marginBlockStart: 350,
        backgroundColor: tertiaryColor,
        paddingBlockStart: 50
    },
    button: {
        marginLeft: 60,
        alignItems: 'center',
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderRadius: 10,
        borderWidth: 10,
        marginBlockEnd: 60,
        width: 200,
    }
})