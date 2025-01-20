import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';

export default function HomeScreen() {
  return (
    <SafeAreaView>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/searchPageIcon.png')} />
        <Text style={mainScreenStyles.titleText}>Search</Text>
    </SafeAreaView>
  );
}
