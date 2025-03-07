import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { fontfamily, primaryColor, secondaryColor, tertiaryColor, bgColor, mainScreenStyles } from '@/components/ui/PrefStyles';
import React, { useEffect, useMemo } from 'react';
import { getRecentSongList, getRecentSearchHistory } from '@/assets/api';
import { IconSymbol } from '@/components/ui/IconSymbol';
import SongsListViewComp from '@/components/songcomps/SongsListViewComp';

var data : Array<string>;
var recentSongList : Array<SONGOBJ>

export default function HomeScreen() {
  const [showSuggestions, setShowSuggestions] = React.useState({})

  function searchTextHandler(word: any) {
    console.log("change text to ")
  }
  function showSuggestionsHandler() {
    setShowSuggestions(!showSuggestions)
  }

  function Suggestions() {
    if (!showSuggestions) {
      return (
        <ScrollView style={localStyles.suggestionBox}>
          <SuggestionItems />
        </ScrollView>
      )
    }
  }
  function SuggestionItems() {
    return data.map(item => {
      return (  
        // how to pass item value to searchTextHandler??? 
        // (when recent item is pressed, the search text must be changed to it, and a query sent to DB)
        <TouchableOpacity onPress={searchTextHandler}>
          <Text style={localStyles.suggestionText}>{item}</Text>
        </TouchableOpacity>
      )
    })
  }

  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
        <Image style={mainScreenStyles.titleIconImage} source={require('../../assets/icons/searchPageIcon.png')} />
        <Text style={mainScreenStyles.titleText}>Search</Text>
        <View style={localStyles.searchBar}>
          <IconSymbol style={{paddingInline: 30}} size={28} name="text.magnifyingglass.rtl" color={primaryColor} />
          <TextInput onEndEditing={showSuggestionsHandler} onFocus={showSuggestionsHandler} style={localStyles.searchTextInput} placeholder='Search by Title'/>
        </View>
        <Suggestions />
        <ScrollView>
          {/* recent songs */}
          <View style={{marginBlockStart: 50}}>
            <SongsListViewComp viewTitle={"Recent Songs"} songList={recentSongList} />
          </View>
          {/* recent songs */}
          <View style={{marginBlockStart: 50}}>
            <SongsListViewComp viewTitle={"Recent Songs"} songList={recentSongList} />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

useEffect(() => {
  data = getRecentSearchHistory();
  recentSongList = getRecentSongList();
})


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
    fontSize: 20,
    flex: 1
  },
  suggestionBox: {
    marginInline: 50,
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 10,
    borderCurve: 'circular',
    padding: 10,
    marginBlockStart: 20,
    maxHeight: 180
  },
  suggestionText: {
    color: primaryColor,
    fontSize: 18,
    marginBlock: 5
  }
})
