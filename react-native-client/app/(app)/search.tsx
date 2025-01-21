import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import React, { useMemo } from 'react';
import { RecentSongList } from '@/assets/exampleSongs/exampleDB';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const [selected, setSelected] = React.useState("")
  var data = []
  for (var i = 0; i<4; i++) {
    data.push(RecentSongList[i].name)
  }

  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/searchPageIcon.png')} />
        <Text style={mainScreenStyles.titleText}>Search</Text>
        <View style={localStyles.searchBar}>
          <IconSymbol style={{paddingInline: 30}} size={28} name="text.magnifyingglass.rtl" color={primaryColor} />
          <TextInput style={localStyles.searchTextInput} placeholder='Search by Title'/>
        </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  searchBar: {
    marginInline: 50,
    marginBlockStart: 50,
    borderColor: primaryColor,
    borderWidth: 1,
    paddingBlock: 20,
    borderRadius: 10,
    borderCurve: "circular",
    flexDirection: 'row'
  },
  searchTextInput: {
    color: primaryColor,
    paddingInline: 10,
    fontSize: 20
  }
})
