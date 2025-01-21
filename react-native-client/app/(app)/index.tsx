import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { AppleStyle } from 'react-native-scrollable-navigation-bar';
import { 
  fontfamily, 
  primaryColor, 
  secondaryColor,
   tertiaryColor, 
   bgColor, 
   mainScreenStyles } from '@/components/ui/PrefStyles';

import { RecommendedSongList, RecentSongList, TrendingSongList } from '../../assets/exampleSongs/exampleDB'

import SongsListViewComp from '@/components/songcomps/SongsListViewComp'

export default function HomeScreen() {

  return (
    <ScrollView style={{backgroundColor: bgColor, flex: 1}}>
        <SafeAreaView>
          <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/discoverPageIcon.png')} />
          <Text style={mainScreenStyles.titleText}>Discover</Text>
          {/* recent songs */}
          <View style={{marginBlockStart: 50}}>
            <SongsListViewComp viewTitle={"Recent Songs"} songList={RecentSongList} />
          </View>
          {/* recommended songs */}
          <View style={{marginBlockStart: 50}}>
            <SongsListViewComp viewTitle={"Recommended Songs"} songList={RecommendedSongList} />
          </View>
          {/* trending songs */}
          <View style={{marginBlockStart: 50}}>
            <SongsListViewComp viewTitle={"Trending Songs"} songList={TrendingSongList} />
          </View>
          <View style={{marginBlockEnd: 150}}></View>
        </SafeAreaView>
    </ScrollView>
  );
}