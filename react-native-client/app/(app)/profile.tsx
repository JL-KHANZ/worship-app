import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, Animated, FlatList, Alert, TouchableOpacity } from 'react-native';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import { getUser, getUserSets, getAllSongs, defaultUser } from '@/api';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/userContext';
import { responsiveStyleSheet } from '@/components/ui/responsive';
import SetComp from '@/components/setcomps/SetComp';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 120;

export default function ProfileScreen() {
  const [sets, setSets] = useState<Array<SETCLIENT>>([]);

  const { user, saveUser } = useUser()

  useEffect(() => {
    async function getData() {
      if (!user) return;
      const res = await getUserSets(user?.uid)
      if (!res) {

      } else {
        setSets(res)
      }
    }
    getData();
  }, [])

  function logout() {
    saveUser(null)
    router.replace('/signin')
  }

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.headview}>
        <Text style={styles.username}>{user?.username}</Text>
        <TouchableOpacity onPress={logout}>
          <IconSymbol 
          name="rectangle.portrait.and.arrow.right" 
          color={primaryColor} 
          size={35}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>내 콘티</Text>
      <View style={styles.container}>
        {sets.map((item, index) => (
          <SetComp set={item} />
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = responsiveStyleSheet({
  headview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginBottom: 30,
  },
  view: {
    backgroundColor: bgColor,
    flex: 1,
  },
  username: {
    fontSize: 30,
    color: primaryColor,
    fontWeight: "700"
  },
  header: {
    color: tertiaryColor,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    marginHorizontal: 30,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  },

})
