import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import SongsListViewComp from '@/components/songcomps/SongsListComp';
import { getRecentSongList, getRecommendedSongList, getTrendingSongList } from '@/api';
import SearchBar from '@/components/SearchBar';
import { bgColor, primaryColor } from '@/components/ui/PrefStyles';
import { router } from 'expo-router';
import CreateSetFieldComp from '@/components/setcomps/CreateSetFieldComp';
import { useSongStore } from '@/lib/setStore';

export const TITLE_HEIGHT = 50;
export const MAX_FONT_SIZE = 50;
export const MIN_FONT_SIZE = MAX_FONT_SIZE * 0.67;
export const INPUT_RANGE = [0, 50]
export const OUTPUT_RANGE = [1, 0.7]

export default function HomeScreen() {
  const [recentSongList, setRecentSongList] = useState<SONGCLIENT[]>([]);
  const [searchText, setSearchText] = useState<string>("")

  const [creatingSet, setCreatingSet] = useState<boolean>(false);
  const [selectedSongsList, setSelectedSongsList] = useState<SONGCLIENT[]>([]);

  useEffect(() => {
    setRecentSongList(getRecentSongList());
  }, []);

  useEffect(() => {
    if (selectedSongsList == null) {
      setCreatingSet(false);
    }
  }, [selectedSongsList])

  function gotoSong(song: SONGCLIENT) {
    useSongStore.getState().setSong(song)
    router.push(`/songs/${song.id}`)
  }
  function selectSong(song: SONGCLIENT) {
    setCreatingSet(true);
    setSelectedSongsList(prev => {
      const updated = [...prev, song];
      return updated;
    });
  }
  function deselectSong(song: SONGCLIENT) {
    setSelectedSongsList(prev => {
      const updated = prev.filter(item => item !== song);
      if (updated.length === 0) {
        setCreatingSet(false);
      }
      return updated;
    });
  }
  function getSearch(text: string) {
    setSearchText(text)
  }

  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: OUTPUT_RANGE,
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleWrapper}>
        <Animated.View style={{
          opacity,
          width: "100%",
          alignItems: "stretch",
          transform: [{
            scale: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0.9],
              extrapolate: 'clamp',
            })
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
        <SongsListViewComp
          onSelectSong={(item: SONGCLIENT) => selectSong(item)}
          onDeselectSong={(item: SONGCLIENT) => deselectSong(item)}
          onPressSong={(item: SONGCLIENT) => gotoSong(item)}
          viewTitle="Recent Songs"
          songList={recentSongList}
          cardColor='#ffcbe1'
        />
      </Animated.ScrollView>
      {creatingSet ?
        <CreateSetFieldComp songs={selectedSongsList} />
        :
        <View>
        </View>
      }
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
    paddingTop: 130,
    paddingHorizontal: 55
  },
});
