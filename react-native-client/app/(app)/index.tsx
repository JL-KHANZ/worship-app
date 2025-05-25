import { Animated, SafeAreaView, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import SongsListViewComp from '@/components/songcomps/SongsListComp';
import { getRecentSongList, getRecommendedSongList, getTrendingSongList } from '@/api';
import SearchBar from '@/components/SearchBar';
import { bgColor, primaryColor } from '@/components/ui/PrefStyles';

export const TITLE_HEIGHT = 50;
export const MAX_FONT_SIZE = 50;
export const MIN_FONT_SIZE = MAX_FONT_SIZE * 0.67;
export const INPUT_RANGE = [0, 50]
export const OUTPUT_RANGE = [1, 0.7]

export default function HomeScreen() {
  const [recentSongList, setRecentSongList] = useState<SONGCLIENT[]>([]);
  const [recommendedSongList, setRecommendedSongList] = useState<SONGCLIENT[]>([]);
  const [trendingSongList, setTrendingSongList] = useState<SONGCLIENT[]>([]);
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    setRecentSongList(getRecentSongList());
    setRecommendedSongList(getRecommendedSongList());
    setTrendingSongList(getTrendingSongList());
  }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const fontSize = scrollY.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: [MAX_FONT_SIZE, MIN_FONT_SIZE],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: OUTPUT_RANGE,
    extrapolate: 'clamp',
  });

  function getSearch(text : string) {
    setSearchText(text)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Animated.Text style={[styles.pageTitle, { fontSize, opacity }]}>
          Discover
        </Animated.Text>
        <Animated.View style={{
          opacity,
          width: "100%",
          alignItems: "stretch",
          transform: [{
            scale: scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0.9],
            extrapolate: 'clamp',}) 
          }] 
        }}>
          <SearchBar 
          placeholder='검색'
          onChangeText={(text) => getSearch(text)} 
          value={searchText}
          recentSearches={["test", "test2"]}
          onSelectSearch={(text) => getSearch(text)}
           />
        </Animated.View>
      </View>

      <Animated.ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={{ height: TITLE_HEIGHT }} />
        <SongsListViewComp viewTitle="Recent Songs" songList={recentSongList} cardColor='#ffcbe1' />
        <SongsListViewComp viewTitle="Recommended Songs" songList={recommendedSongList} cardColor='#bcd8ec' />
        <SongsListViewComp viewTitle="Trending Songs" songList={trendingSongList} cardColor='#f9e1a8' />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
  titleWrapper: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 55,
  },
  pageTitle: {
    fontWeight: '500',
    color: primaryColor,
  },
  scrollContent: {
    paddingTop: 130, // space for fixed title
  },
});
