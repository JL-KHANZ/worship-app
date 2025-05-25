import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, Animated } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import RoleTagComp from '@/components/tags/RoleTagComp';
import { getUser, getUserSets, getAllSongs, defaultUser } from '@/api';
import SetListComp from '@/components/setcomps/SetListComp';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/userContext';
import { INPUT_RANGE, MAX_FONT_SIZE, MIN_FONT_SIZE, OUTPUT_RANGE } from '.';

export default function ProfileScreen() {
  const [sets, setSets] = useState<Array<SETCLIENT>>([]);
  const [userId, setUserId] = useState<number>(0);

  const { user } = useUser()

  useEffect(() => {
    setSets(getUserSets(userId));
    console.log("t", user)
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
          Profile
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
        <Text style={styles.pageTitle}>{user?.username}유저정보</Text>
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
    paddingTop: 130
  }
})