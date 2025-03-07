import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import RoleTagComp from '@/components/tags/RoleTagComp';
import { getUser, getUserSets, getAllSongs } from '@/assets/api';
import SetListComp from '@/components/setcomps/SetListComp';
import { useEffect } from 'react';

var sets : Array<SETOBJ>;
var user : USEROBJ;
var userId : number = 1;

export default function HomeScreen() {

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

useEffect(() => {
  sets = getUserSets(userId);
  user = getUser(userId);
})

const localStyle = StyleSheet.create({
  tag: {
    flexDirection: 'row',
  }
})