import { IconSymbol } from "@/components/ui/IconSymbol";
import { bgColor, primaryColor, secondaryColor } from "@/components/ui/PrefStyles";
import { responsiveStyleSheet } from "@/components/ui/responsive";
import { useSongStore } from "@/lib/setStore";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SongViewPage() {
  const song: SONGCLIENT | null = useSongStore((state) => state.selectedSong)

  const [showToolbar, setShowToolbar] = useState(false)

  function handleTap() {
    setShowToolbar(!showToolbar)
  }
  
  function goBack() {
    router.back()
  }

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.page}>
        {showToolbar &&
        <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.toolbar, { width: screenWidth, zIndex: 900 }]}>
              <TouchableOpacity style={toolbarStyles.backButton} onPress={goBack}>
                <MaterialIcons name="chevron-left" color={bgColor} size={24} />
              </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        }
        <Image source={{ uri: song?.url }} style={imageD.image} />
        {showToolbar &&
            <View style={[styles.bottomToolbar, { width: screenWidth, zIndex: 900 }]} pointerEvents="box-none">
              <Text style={toolbarStyles.title}>{song?.name}</Text>
              <Text style={toolbarStyles.artist}>{song?.artist}</Text>
            </View>
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = responsiveStyleSheet({
  page: {
    backgroundColor: "#fff",
    flex: 1,
  },
  content: {
    color: primaryColor
  },
  toolbar: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    alignItems: 'space-around',
    justifyContent: 'space-between',
    position: 'absolute',
    flexDirection: "row",
    opacity: 0.5
  },
  bottomToolbar: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    flexDirection: "row",
    bottom: 0,
    opacity: 0.5
  },
});
const imageD = StyleSheet.create({
  image: {
    height: screenHeight,
    width: screenWidth,
    resizeMode: 'contain',
    borderWidth: 1,
  }
})

const toolbarStyles = responsiveStyleSheet({
  backButton: {
    color: bgColor
  },
  title: {
    color: bgColor,
    fontSize: 15,
    alignItems: "center"
  },
  artist: {
    color: secondaryColor,
    fontSize: 10,
    alignItems: "center"
  }
})