import { Link } from 'expo-router';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, authScreenStyles } from '@/components/ui/PrefStyles';
import { useState } from 'react';
import { defaultUser, signIn } from '@/api';


export default function AboutScreen() {
    const [user, setUser] = useState<USEROBJ>({
        userEmail: '', 
        userId: 0, 
        userName: '', 
        userPwd: '', 
        userRole: '', 
        userSetIds: [], 
        userTeamId: 0
    });

    const signInFunc = () => {
        console.log("input user", user.userName)
        try {
            signIn(user);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={authScreenStyles.container}>
            <View style={authScreenStyles.view}>
                
                {/* Title */}
                <Text style={[{fontSize: 50, marginBlockEnd: 60, fontWeight: '900'}, authScreenStyles.text]}>Sign In</Text>

                {/* User Input */}
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Email: </Text>
                    <TextInput style={authScreenStyles.input} placeholder='password' value={user.userEmail} onChangeText={(text) => setUser({...user, userEmail: text})} />
                </View>
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Password: </Text>
                    <TextInput style={authScreenStyles.input} placeholder='password' value={user.userPwd} onChangeText={(text) => setUser({...user, userPwd: text})} />
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