import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';

export default function HomeScreen() {
  return (
    <SafeAreaView>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/teamspacePageIcon.png')} />
        <Text style={mainScreenStyles.titleText}>Team Space</Text>
    </SafeAreaView>
  );
}
