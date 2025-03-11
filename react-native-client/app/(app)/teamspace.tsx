import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { 
  fontfamily, 
  primaryColor, 
  secondaryColor, 
  tertiaryColor, 
  bgColor, 
  mainScreenStyles, } from '@/components/ui/PrefStyles';
import { useState } from 'react';


export default function HomeScreen() {

  return (
      <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
          <Image style={[mainScreenStyles.titleIconImage, {top: -200}]} source={require('../../assets/icons/teamspacePageIcon.png')} />
          <Text style={mainScreenStyles.titleText}>Team Space</Text>
          <TeamSpaceView />
      </SafeAreaView>
  );
}

function TeamSpaceView() {
  const [affiliatedTeams, setAffiliatedTeams] = useState([]);
  
  if (affiliatedTeams.length == 0) {
    return (
      <View>
        <Text style={[mainScreenStyles.smallTitleText, {textAlign: 'center', marginBlockStart: 200}]}>You are not in a Team yet</Text>
        <Text style={[mainScreenStyles.text, {textAlign: 'center', marginBlockStart: 30}]}>Create or Join to begin</Text>
        <View style={localStyles.buttonView}>
          <TouchableOpacity style={localStyles.button}>
            <Text style={localStyles.text}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.button}>
            <Text style={localStyles.text}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row', 
    marginBlockStart: 150,
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: secondaryColor,
    padding: 30,
    width: 120,
    borderCurve: 'circular',
    borderRadius: 10,
  },
  text: {
    color: primaryColor,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fontfamily
  }
})