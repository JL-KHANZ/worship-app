import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { 
  fontfamily, 
  primaryColor, 
  secondaryColor,
   tertiaryColor, 
   bgColor, 
   mainScreenStyles } from '@/components/ui/PrefStyles';

import RecentSongsComp from '@/components/songcomps/RecentSongsComp'

export default function HomeScreen() {
  return (
    <ScrollView style={{backgroundColor: bgColor, flex: 1}}>
        <SafeAreaView>
            <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/discoverPageIcon.png')} />
            <Text style={mainScreenStyles.titleText}>Discover</Text>
        </SafeAreaView>

        <View style={{marginBlockStart: 80}}>
          <RecentSongsComp />
        </View>
    </ScrollView>
  );
}