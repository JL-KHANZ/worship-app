import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import {
  fontfamily,
  primaryColor,
  secondaryColor,
  bgColor,
} from '@/components/ui/PrefStyles';
import { useState } from 'react';
import { responsiveStyleSheet } from '@/components/ui/responsive';

export default function TeamSpaceScreen() {


  function TeamSpaceView() {
    const [affiliatedTeams, setAffiliatedTeams] = useState([]);
    if (affiliatedTeams.length == 0) {
      return (
        <View>
          <TouchableOpacity>
            <Text>팀 만들기</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>Team Space</Text>
      <TeamSpaceView />
    </SafeAreaView>
  )
}

const styles = responsiveStyleSheet({
  view: {
    backgroundColor: bgColor,
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: primaryColor,
    fontWeight: "700",
    paddingLeft: 30
  },
})