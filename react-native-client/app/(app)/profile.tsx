import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, Animated, FlatList, Alert } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import { getUser, getUserSets, getAllSongs, defaultUser } from '@/api';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/userContext';
import { INPUT_RANGE, MAX_FONT_SIZE, MIN_FONT_SIZE, OUTPUT_RANGE } from '.';
import { responsiveStyleSheet } from '@/components/ui/responsive';

export default function ProfileScreen() {
  const [sets, setSets] = useState<Array<SETCLIENT>>([]);
  const [userId, setUserId] = useState<number>(0);

  const { user } = useUser()

  useEffect(() => {
    async function getData() {
      const res = await getUserSets(userId)
      if (!res) {

      } else {
        setSets(res)
      }
    }
  }, [])

  const scrollY = useRef(new Animated.Value(0)).current;

  const fontSize = scrollY.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: [MAX_FONT_SIZE, MIN_FONT_SIZE],
    extrapolate: 'clamp',
  })

  const opacity = scrollY.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: OUTPUT_RANGE,
    extrapolate: 'clamp'
  })

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <View style={styles.titleWrapper}>
        <Animated.Text style={[styles.pageTitle, { fontSize, opacity }]}>
          {user?.username}
        </Animated.Text>
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
      <Text style={setCompStyles.header}>내 콘티</Text>
      <FlatList
        data={sets}
        renderItem={({ item }) => (
          <View style={setCompStyles.view}>
            <Text style={setCompStyles.title}>{item.name}</Text>
          </View>
        )}
      />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
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
    paddingHorizontal: 55,
  },
  roleLabel: {
    fontSize: 30,
    fontWeight: "100",
    color: primaryColor
  }
})

const setCompStyles = responsiveStyleSheet({
  header: {
    color: tertiaryColor,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8
  },
  view: {
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 10,
    padding: 10,
    width: 100,
    height: 100
  },
  title: {

  }
})