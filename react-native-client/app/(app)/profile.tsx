import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/profilePageIcon.png')} />
        <Text style={mainScreenStyles.titleText}>Profile</Text>
    </SafeAreaView>
  );
}
