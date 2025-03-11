import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import RoleTagComp from '@/components/tags/RoleTagComp';
import { getUser, getUserSets, getAllSongs, defaultUser } from '@/assets/api';
import SetListComp from '@/components/setcomps/SetListComp';
import { useEffect, useState } from 'react';


export default function HomeScreen() {
  const [sets, setSets] = useState<Array<SETOBJ>>([]);
  const [user, setUser] = useState<USEROBJ>(defaultUser);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    setSets(getUserSets(userId));
    setUser(getUser(userId));
  }, [])
  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/profilePageIcon.png')} />
        <View style={[localStyle.tag]}>
          <Text style={mainScreenStyles.titleText}>Profile</Text>
          <RoleTagComp role={user.role} />
        </View>
        <Text style={[mainScreenStyles.smallTitleText, {marginLeft: 80}]}>{user.name}</Text>
        <ScrollView style={{marginBlockStart: 50, marginInline: 80}}>
          <SetListComp sets={sets} />
        </ScrollView>
    </SafeAreaView>
  );
}


const localStyle = StyleSheet.create({
  tag: {
    flexDirection: 'row',
  }
})