import { bgColor, primaryColor, secondaryColor, tertiaryColor } from '@/components/ui/PrefStyles';
import { responsiveStyleSheet } from '@/components/ui/responsive';
import { useSetStore } from '@/lib/setStore';
import React, { useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, Text, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist'
import { postSet } from '@/api';
import { router } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get('window').width;

export default function SetView() {
  const songs: Array<SONGCLIENT> | null = useSetStore((state) => state.selectedSongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [setName, setSetName] = useState("");

  if (!songs) return null;

  const [images, setImages] = useState(songs.map((song) => (song)))
  const flatListRef = useRef<FlatList<any>>(null);
  const isProgrammaticScroll = useRef(false); // Flag to prevent scroll conflicts

  function handleImagePress(index: number) {
    setCurrentIndex(index)
    isProgrammaticScroll.current = true; // Set flag to prevent handleScroll override
    
    // Add a delay to ensure the FlatList is properly rendered
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ 
          index, 
          animated: true,
          viewPosition: 0.5 // Center the item in the viewport
        });
        
        // Clear the flag after scroll animation completes
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500); // Wait for scroll animation to complete
      }
    }, 20);
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    // Skip index updates during programmatic scrolling
    if (isProgrammaticScroll.current) return;
    
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 500; // Height of each image item
    
    // Calculate index based on scroll position
    const index = Math.floor(offsetY / itemHeight);
    
    // Ensure index is within bounds
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }

  function moveUp(index: number) {
    if (index <= 0) return; // Can't move up if already at top
    
    const updated = [...images];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(index - 1, 0, movedItem);
    setImages(updated);
    setCurrentIndex(index - 1);
    
    isProgrammaticScroll.current = true; // Set flag to prevent handleScroll override
    
    // Scroll to the new position after state update
    setTimeout(() => {
      if (flatListRef.current) {
        const offset = (index - 1) * 500;
        flatListRef.current.scrollToOffset({ offset, animated: true });
        
        // Clear the flag after scroll animation completes
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500); // Wait for scroll animation to complete
      }
    }, 150);
  }

  function moveDown(index: number) {
    if (index >= images.length - 1) return; // Can't move down if already at bottom
    
    const updated = [...images];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(index + 1, 0, movedItem);
    setImages(updated);
    setCurrentIndex(index + 1);
    
    isProgrammaticScroll.current = true; // Set flag to prevent handleScroll override
    
    // Scroll to the new position after state update
    setTimeout(() => {
      if (flatListRef.current) {
        const offset = (index + 1) * 500;
        flatListRef.current.scrollToOffset({ offset, animated: true });
        
        // Clear the flag after scroll animation completes
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500); // Wait for scroll animation to complete
      }
    }, 150);
  }

  async function submitSet() {
    const res = await postSet(images)
    if(!res) {
      Alert.alert("콘티 만들기 실패", "콘티 만들기를 실패하였습니다. 운영자에게 문의하여 주세요")
    } else {
      router.replace(`/setviewer/${res}`)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailBar}>
        <Text style={styles.setNameInputText}>콘티 이름:</Text>
        <TextInput
          value={setName}
          style={styles.setNameInput}
          onChangeText={(text) => setSetName(text)}
          multiline={false}
          numberOfLines={1}
        />
        <FlatList
          style={styles.thumbnailList}
          data={images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleImagePress(index)}
              style={[
                styles.thumbnail,
                index === currentIndex && styles.selectedThumbnail,
              ]}>
              {index === currentIndex &&
                <TouchableOpacity style={styles.buttonIcon} onPress={() => moveUp(index)}>
                  <MaterialIcons name="keyboard-arrow-up" color={primaryColor} size={24} />
                </TouchableOpacity>}
              <View style={styles.thumbnailView}>
                <Text style={styles.thumbnailText}>{index + 1}</Text>
                <Text style={styles.thumbnailSongTitle}>{item.name}</Text>
              </View>
              {index === currentIndex &&
                <TouchableOpacity style={styles.buttonIcon} onPress={() => moveDown(index)}>
                  <MaterialIcons name="keyboard-arrow-down" color={primaryColor} size={24} />
                </TouchableOpacity>}
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.makeButton} onPress={submitSet}>
          <Text style={styles.makeButtonText}>콘티 만들기</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => `${item.id}${index}`}
        onMomentumScrollEnd={handleScroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item.url }} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = responsiveStyleSheet({
  container: {
    flexDirection: "row",
    backgroundColor: bgColor,
    height: '100%', // Ensure container doesn't stretch beyond screen
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: screenWidth,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 400,
  },
  thumbnailBar: {
    marginTop: 10,
    backgroundColor: bgColor,
    paddingHorizontal: 5,
    paddingBottom: 20,
    width: 100, // Reduced width to prevent pushing images off-screen
    height: 'auto', // Let content determine height naturally
    maxHeight: '90vh', // Prevent stretching beyond screen bounds
    justifyContent: 'space-between', // Distribute space between content and button
  },
  setNameInputText: {
    fontSize: 12,
    marginVertical: 5,
    color: primaryColor,
    fontWeight: "700"
  },
  setNameInput: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: primaryColor,
    borderWidth: 2,
    borderRadius: 10,
    maxWidth: 80,
  },
  thumbnailList: {
    paddingTop: 20,
    marginBottom: 20, // Add space before the button
    maxHeight: 300, // Reduced height to leave space for button
    overflow: 'visible', // Ensure content is not clipped
  },
  thumbnailView: {
    maxWidth: 80,
    padding: 5,
    alignItems: "center"
  },
  thumbnail: {
    marginVertical: 5,
  },
  thumbnailText: {
    color: primaryColor,
    fontWeight: "700",
    fontSize: 18
  },
  thumbnailSongTitle: {
    color: "#000",
    fontWeight: "400",
    fontSize: 10
  },
  selectedThumbnail: {
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 10,
    backgroundColor: secondaryColor,
  },
  makeButton: {
    padding: 10,
    backgroundColor: primaryColor,
    marginTop: 'auto', // Push button to bottom
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'stretch', // Make button stretch across the sidebar
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10, // Ensure button is above other elements
    position: 'relative', // Ensure proper positioning
  },
  makeButtonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center"
  },
  buttonIcon: {
    alignItems: "center",
  },
  plusButtonIcon: {
    alignItems: "center",
    marginTop: 15
  }
});
