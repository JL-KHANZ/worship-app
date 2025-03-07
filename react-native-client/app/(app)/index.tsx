import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { AppleStyle } from 'react-native-scrollable-navigation-bar';
import { 
  fontfamily, 
  primaryColor, 
  secondaryColor,
   tertiaryColor, 
   bgColor, 
   mainScreenStyles } from '@/components/ui/PrefStyles';

import { getRecommendedSongList, getRecentSongList, getTrendingSongList } from '@/assets/api';
import SongsListViewComp from '@/components/songcomps/SongsListViewComp'
import { useEffect } from 'react';

var recentSongList : Array<SONGOBJ>
var recommendedSongList : Array<SONGOBJ>
var trendingSongList : Array<SONGOBJ>

export default function HomeScreen() {

  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
      <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/discoverPageIcon.png')} />
      <Text style={mainScreenStyles.titleText}>Discover</Text>
      <ScrollView>
        {/* recent songs */}
        <View style={{marginBlockStart: 50}}>
          <SongsListViewComp viewTitle={"Recent Songs"} songList={recentSongList} />
        </View>
        {/* recommended songs */}
        <View style={{marginBlockStart: 50}}>
          <SongsListViewComp viewTitle={"Recommended Songs"} songList={recommendedSongList} />
        </View>
        {/* trending songs */}
        <View style={{marginBlockStart: 50}}>
          <SongsListViewComp viewTitle={"Trending Songs"} songList={trendingSongList} />
        </View>
        <View style={{marginBlockEnd: 150}}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

useEffect(() => {
  recentSongList = getRecentSongList();
  recommendedSongList = getRecommendedSongList();
  trendingSongList = getTrendingSongList();
}, [])