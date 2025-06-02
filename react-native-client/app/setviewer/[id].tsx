import { IconSymbol } from "@/components/ui/IconSymbol";
import { bgColor, primaryColor, secondaryColor, tertiaryColor } from "@/components/ui/PrefStyles";
import { responsiveStyleSheet } from "@/components/ui/responsive";
import { useSetViewStore } from "@/lib/setStore";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SetViewer() {
  const set: SETCLIENT | null = useSetViewStore((state) => state.selectedSet);
  const [showToolbar, setShowToolbar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)

  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const slideAnim = useRef(new Animated.Value(0)).current;

  function goBack() {
    router.back();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const { dx, dy, } = gestureState;
        const isTap = Math.abs(dx) < 5 && Math.abs(dy) < 5;

        if (!set) return;

        if (isTap) {
          setShowToolbar((prev) => !prev);
          return
        }
        const swipeThreshold = 30;
        if (dx > swipeThreshold) {
          setDirection("right")
          setCurrentIndex((prev) => Math.max(0, prev - 1))
        } else if (dx < -swipeThreshold) {
          setDirection("left")
          setCurrentIndex((prev) => Math.min(prev + 1, set?.songs.length - 1))
        }
      },
    })
  ).current;

  function Thumbnail() {
    function changeIndex(index: number) {
      setCurrentIndex(index)
    }
    return (
      <FlatList
        horizontal
        data={set?.songs}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={toolbarStyles.imageTouchable} onPress={() => changeIndex(index)}>
            <Image
              source={{ uri: item.url }}
              style={[toolbarStyles.image, index === currentIndex && toolbarStyles.selectedImage]} />
          </TouchableOpacity>
        )}
      />
    )
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: bgColor }}
      {...panResponder.panHandlers}
    >
      {showToolbar && (
        <View style={[toolbarStyles.toolbar, { width: screenWidth, zIndex: 900 }]}>
          <TouchableOpacity style={toolbarStyles.backButton} onPress={goBack}>
            <IconSymbol name="chevron.left" color={bgColor} />
          </TouchableOpacity>
        </View>
      )}
        <Image source={{ uri: set?.songs[currentIndex].url }} style={imageD.image} />
      {showToolbar && (
        <View
          style={[toolbarStyles.bottomToolbar, { width: screenWidth, zIndex: 900 }]}
          pointerEvents="box-none"
        >
          <Thumbnail />
          <View style={toolbarStyles.thumbnailTextView}>
            <Text style={toolbarStyles.title}>{set?.songs[currentIndex].name}</Text>
            <Text style={toolbarStyles.artist}>{set?.songs[currentIndex].artist}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const toolbarStyles = responsiveStyleSheet({
  toolbar: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    alignItems: "space-around",
    justifyContent: "space-between",
    position: "absolute",
    flexDirection: "row",
    opacity: 0.5,
  },
  bottomToolbar: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    flexDirection: "column",
    bottom: 0,
    opacity: 0.5,
  },
  backButton: {
    color: bgColor,
  },
  title: {
    color: bgColor,
    fontSize: 15,
    alignItems: "center",
  },
  artist: {
    color: secondaryColor,
    fontSize: 10,
    alignItems: "center",
    marginLeft: 30
  },
  image: {
    width: 60,
    height: 60,
    margin: 3,
    borderRadius: 8,
    borderWidth: 1,
    opacity: 0.4
  },
  selectedImage: {
    borderColor: primaryColor,
    opacity: 1
  },
  imageTouchable: {
    marginBottom: 5
  },
  thumbnailTextView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  }
});

const imageD = StyleSheet.create({
  image: {
    height: screenHeight,
    width: screenWidth,
    resizeMode: 'contain',
    borderWidth: 1,
  }
})