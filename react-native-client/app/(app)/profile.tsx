import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import RoleTagComp from '@/components/tags/RoleTagComp';
import { user, teamMember1  } from '@/assets/exampleSongs/exampleDB';
import SetListComp from '@/components/setcomps/SetListComp';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/profilePageIcon.png')} />
        <View style={[localStyle.tag]}>
          <Text style={mainScreenStyles.titleText}>Profile</Text>
          <RoleTagComp role={teamMember1.role} />
        </View>
        <Text style={[mainScreenStyles.smallTitleText, {marginLeft: 80}]}>{user.name}</Text>
        <ScrollView style={{marginBlockStart: 50, marginInline: 80}}>
          <SetListComp />
        </ScrollView>
    </SafeAreaView>
  );
}

const localStyle = StyleSheet.create({
  tag: {
    flexDirection: 'row',
  }
})