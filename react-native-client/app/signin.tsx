import { Text, View, StyleSheet, Image, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const signInFunc = () => {
    console.log("Sign in button pressed")
}
const goToSignUp = () => {
    console.log("Go to Sign Up page")
}

export default function AboutScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>

                {/* Title */}
                <Text style={[{fontSize: 50, marginBlockEnd: 60, fontWeight: '900'}, styles.text]}>Sign In</Text>

                {/* User Input */}
                <View style={[{marginBlockEnd: 20},styles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '300'}, styles.text]}>Username:</Text>
                    <TextInput style={styles.input} />
                </View>
                <Text style={[{fontSize: 20, marginBlockEnd: 40, fontWeight: '300'}, styles.text]}>Password:</Text>

                {/* Sign In Button */}
                <TouchableOpacity onPress={signInFunc} style={styles.button}>
                    <Text style={[{fontSize: 20, fontWeight: '700'}, styles.text]}>Sign In</Text>
                </TouchableOpacity>
            </View>
                
            {/* Go To Button */}
            <TouchableOpacity onPress={goToSignUp} style={{marginBlockStart: 15}}>
                <Text style={{
                    color: secondaryColor, 
                    marginLeft: 60, 
                    textDecorationLine: 'underline', 
                    fontWeight: '200', 
                    fontFamily: fontfamily
                }}>Don't have an account? Press here to Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const fontfamily = 'Helvetica'
const primaryColor = '#fff'
const secondaryColor = '#FFAE00'
const tertiaryColor = '#363636'
const bgColor = '#4E4E4E'

const styles = StyleSheet.create({
    horizontal: {
        flex: 1,
        flexDirection: 'row',
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
        borderWidth: 1,
    },
    view: {
        marginBlockStart: 300,
        backgroundColor: tertiaryColor,
        paddingBlockStart: 50
    },
    button: {
        marginLeft: 60,
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: secondaryColor,
        borderColor: secondaryColor,
        borderRadius: 10,
        borderWidth: 10,
        marginBlockEnd: 60
    }
})