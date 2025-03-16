import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View } from 'react-native';
import { AppleStyle } from 'react-native-scrollable-navigation-bar';
import { 
  fontfamily, 
  primaryColor, 
  secondaryColor,
   tertiaryColor, 
   bgColor, 
   mainScreenStyles } from '@/components/ui/PrefStyles';

import { getRecommendedSongList, getRecentSongList, getTrendingSongList } from '@/api';
import SongsListViewComp from '@/components/songcomps/SongsListViewComp'
import { useEffect, useState } from 'react';


export default function HomeScreen() {
  const [recentSongList, setRecentSongList] = useState<Array<SONGOBJ>>([]);
  const [recommendedSongList, setRecommendedSongList] = useState<Array<SONGOBJ>>([]);
  const [trendingSongList, setTrendingSongList] = useState<Array<SONGOBJ>>([]);

  useEffect(() => {
    setRecentSongList(getRecentSongList());
    setRecommendedSongList(getRecommendedSongList());
    setTrendingSongList(getTrendingSongList());
  }, [])
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
