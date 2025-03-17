import { Link } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, authScreenStyles } from '@/components/ui/PrefStyles';


export default function AboutScreen() {
    const data = [
        {key:'1', value:'Worship Leader'},
        {key:'2', value:'Keyboard'},
        {key:'3', value:'Elec Guitar'},
        {key:'4', value:'Bass'},
        {key:'5', value:'Sound Engineer'},
        {key:'6', value:'Vocal'},
    ]
    const [user, setUser] = useState<USEROBJ>({
        userEmail: '',
        userId: 0,
        userName: '',
        userPwd: '',
        userRole: '',
        userSetIds: [],
        userTeamId: 0,
    })


    const minNameLen = 3;
    const minPwdLen = 7;
    function checkNameCrit() : boolean {
        if (user.userName.length > minNameLen) {
            return true;
        }
        return false;
    }
    function checkPwdCrit() : boolean {
        if (user.userPwd.length > minPwdLen) {
            return true;
        }
        return false;
    }
    function checkEmailCrit() : boolean {
        return false;
    }

    function signUpFunc() {
        if (checkEmailCrit() && checkNameCrit() && checkPwdCrit()) {
            console.log("criteria met");
        }
    }
    return (
        <SafeAreaView style={authScreenStyles.container}>
            <View style={authScreenStyles.view}>
                
                {/* Title */}
                <Text style={[{fontSize: 50, marginBlockEnd: 60, fontWeight: '900'}, authScreenStyles.text]}>Sign Up</Text>

                {/* User Input */}
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Username:</Text>
                    <TextInput style={authScreenStyles.input} placeholder='username' value={user.userName} onChangeText={(text) => setUser({...user, userName: text})} />
                </View>
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Email:       </Text>
                    <TextInput style={authScreenStyles.input} placeholder='email' value={user.userEmail} onChangeText={(text) => setUser({...user, userEmail: text})} />
                </View>
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Password: </Text>
                    <TextInput style={authScreenStyles.input} placeholder='password' value={user?.userPwd} onChangeText={(text) => setUser({...user, userPwd: text})} />
                </View>
                <View style={[{marginBlockEnd: 40},authScreenStyles.horizontal]}>
                    <Text style={[{fontSize: 20, marginRight: 20, fontWeight: '400'}, authScreenStyles.text]}>Role in Worship Team:</Text>
                    <SelectList 
                    boxStyles={{borderColor: primaryColor, backgroundColor: primaryColor}} 
                    dropdownStyles={{backgroundColor: primaryColor}} 
                    dropdownTextStyles={{color: secondaryColor}}
                    inputStyles={{color: secondaryColor}}
                    setSelected={(val : any) => setUser({...user, userRole: val})} 
                    data={data} 
                    save="value"
                    />
                </View>

                {/* Sign In Button */}
                <TouchableOpacity onPress={signUpFunc} style={authScreenStyles.button}>
                    <Text style={[{fontSize: 20, fontWeight: '700', fontFamily: fontfamily, color: primaryColor}]}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            {/* Go To Button */}
            <TouchableOpacity style={{marginBlockStart: 15, marginLeft: 60}}>
                <Link href={'/signin'}>
                <Text style={{
                    color: secondaryColor,
                    marginLeft: 60,
                    textDecorationLine: 'underline',
                    fontWeight: '200',
                    fontFamily: fontfamily
                }}>Already have an account? Press here to Sign In</Text>
                </Link>
            </TouchableOpacity>
        </SafeAreaView>
    );
}