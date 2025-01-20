import { Link } from 'expo-router';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, authScreenStyles } from '@/components/ui/PrefStyles';


const signInFunc = () => {
    console.log("Sign in button pressed")
}

export default function AboutScreen() {
    return (
        <SafeAreaView style={authScreenStyles.container}>
            <View style={authScreenStyles.view}>
                
                {/* Title */}
                <Text style={[{fontSize: 50, marginBlockEnd: 60, fontWeight: '900'}, authScreenStyles.text]}>Sign In</Text>

                {/* User Input */}
                <View style={[{marginBlockEnd: 20},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Username:</Text>
                    <TextInput style={authScreenStyles.input} placeholder='username' />
                </View>
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Password: </Text>
                    <TextInput style={authScreenStyles.input} placeholder='password'/>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity onPress={signInFunc} style={authScreenStyles.button}>
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