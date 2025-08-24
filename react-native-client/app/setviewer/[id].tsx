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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SetViewer() {
  const set: SETCLIENT | null = useSetViewStore((state) => state.selectedSet);
  const [showToolbar, setShowToolbar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)

  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const autoHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide toolbar after 3 seconds of inactivity
  const startAutoHideTimer = () => {
    if (autoHideTimeout.current) {
      clearTimeout(autoHideTimeout.current);
    }
    
    autoHideTimeout.current = setTimeout(() => {
      setShowToolbar(false);
    }, 3000);
  };

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (autoHideTimeout.current) {
        clearTimeout(autoHideTimeout.current);
      }
    };
  }, []);

  // Start auto-hide timer whenever toolbar is shown
  useEffect(() => {
    if (showToolbar) {
      startAutoHideTimer();
    }
  }, [showToolbar]);

  function goBack() {
    router.back();
  }

  function goToNextSong() {
    if (set && currentIndex < set.songs.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setDirection('left');
    }
  }

  function goToPreviousSong() {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setDirection('right');
    }
  }

  function handleTap() {
    setShowToolbar(!showToolbar);
  }

  // Enhanced swipe gesture handlers with visible animation
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Show real-time swipe animation
      translateX.setValue(event.translationX);
    })
    .onEnd((event) => {
      const { translationX, velocityX } = event;
      const swipeThreshold = 80; // Minimum distance for swipe
      const velocityThreshold = 400; // Minimum velocity for swipe
      
      if (Math.abs(translationX) > swipeThreshold || Math.abs(velocityX) > velocityThreshold) {
        if (translationX > 0 || velocityX > 0) {
          // Swipe right (left to right) - go to previous song
          runOnJS(goToPreviousSong)();
        } else {
          // Swipe left (right to left) - go to next song
          runOnJS(goToNextSong)();
        }
      }
      
      // Animate back to center
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    });

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
    <GestureDetector gesture={swipeGesture}>
      <View
        style={{ flex: 1, backgroundColor: bgColor }}
      >
        {showToolbar && (
          <View style={[toolbarStyles.toolbar, { width: screenWidth, zIndex: 900 }]}>
            <TouchableOpacity style={toolbarStyles.backButton} onPress={goBack}>
              <MaterialIcons name="chevron-left" color={bgColor} size={24} />
            </TouchableOpacity>
            <Text style={toolbarStyles.setTitle}>{set?.name}</Text>
            <View style={toolbarStyles.spacer} />
          </View>
        )}
        <TouchableOpacity 
          style={{ flex: 1 }} 
          onPress={handleTap}
          activeOpacity={1}
        >
          <Animated.Image 
            source={{ uri: set?.songs[currentIndex].url }} 
            style={[
              imageD.image,
              {
                transform: [{ translateX: translateX }]
              }
            ]} 
          />
        </TouchableOpacity>
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
    </GestureDetector>
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
  },
  setTitle: {
    color: bgColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  spacer: {
    width: 40, // Adjust as needed for spacing
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