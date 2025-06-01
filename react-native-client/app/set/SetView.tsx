import { bgColor, primaryColor, secondaryColor, tertiaryColor } from '@/components/ui/PrefStyles';
import { responsiveStyleSheet } from '@/components/ui/responsive';
import { useSetStore } from '@/lib/setStore';
import React, { useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, Text, NativeSyntheticEvent, NativeScrollEvent, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { postSet } from '@/api';
import { router } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function SetView() {
  const songs: Array<SONGCLIENT> | null = useSetStore((state) => state.selectedSongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [setName, setSetName] = useState("");

  if (!songs) return null;

  const [images, setImages] = useState(songs.map((song) => (song)))
  const flatListRef = useRef<FlatList<any>>(null);

  function handleImagePress(index: number) {
    setCurrentIndex(index)
    flatListRef.current?.scrollToIndex({ index, animated: true });
  }
  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offsetY = event.nativeEvent.contentOffset.y;

    // 4번째일때 3번째로 인식하는 문제 있음
    const index = Math.round(offsetY / 1000);
    setCurrentIndex(index);
  }

  function moveUp(index: number) {
    const updated = [...images];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(index - 1, 0, movedItem);
    setImages(updated);
    setCurrentIndex(index-1)
    handleImagePress(index-1)
  }
  function moveDown(index: number) {
    const updated = [...images];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(index + 1, 0, movedItem);
    setImages(updated);
    setCurrentIndex(index+1)
    handleImagePress(index+1)
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
                  <IconSymbol name="chevron.up" color={primaryColor} />
                </TouchableOpacity>}
              <View style={styles.thumbnailView}>
                <Text style={styles.thumbnailText}>{index + 1}</Text>
                <Text style={styles.thumbnailSongTitle}>{item.name}</Text>
              </View>
              {index === currentIndex &&
                <TouchableOpacity style={styles.buttonIcon} onPress={() => moveDown(index)}>
                  <IconSymbol name="chevron.down" color={primaryColor} />
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
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item.url }} style={styles.image} />
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
  },
  image: {
    width: screenWidth,
    height: 500,
    resizeMode: 'contain',
    paddingVertical: 10,
    flex: 1,
    paddingRight: 400
  },
  thumbnailBar: {
    marginTop: 10,
    backgroundColor: bgColor,
    paddingHorizontal: 5
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
    paddingTop: 20
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
    marginBottom: 10,
    borderRadius: 10
  },
  makeButtonText: {
    color: "#fff",
    fontSize: 11,
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
