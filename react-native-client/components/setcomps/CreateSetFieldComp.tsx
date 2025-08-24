import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { bgColor, primaryColor, secondaryColor, tertiaryColor } from "../ui/PrefStyles";
import ChosenSongComp from "./ChosenSongComp";
import { responsiveStyleSheet } from "../ui/responsive";
import { IconSymbol } from "../ui/IconSymbol";
import { router } from "expo-router";
import { useSetStore } from "@/lib/setStore";
import { MaterialIcons } from "@expo/vector-icons";

type createSetFieldProps = {
  songs: SONGCLIENT[];
  emptySelectedSongs: () => void
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = SCREEN_HEIGHT * 0.6;

export default function CreateSetFieldComp({ songs, emptySelectedSongs }: createSetFieldProps) {
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;
  const currentHeightRef = useRef(MIN_HEIGHT);

  const startHeightRef = useRef(MIN_HEIGHT);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        // Save the current height when gesture starts
        startHeightRef.current = currentHeightRef.current;
      },

      onPanResponderMove: (_, gesture) => {
        let newHeight = startHeightRef.current - gesture.dy;
        if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
        if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
        animatedHeight.setValue(newHeight);
      },

      onPanResponderRelease: (_, gesture) => {
        let newHeight = startHeightRef.current - gesture.dy;
        if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
        if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;

        currentHeightRef.current = newHeight;

        // Snap to nearest position (open or closed)
        // const shouldExpand = newHeight > SCREEN_HEIGHT / 2;

        // Animated.spring(animatedHeight, {
        //   toValue: shouldExpand ? MAX_HEIGHT : MIN_HEIGHT,
        //   useNativeDriver: false,
        // }).start(() => {
        //   currentHeightRef.current = shouldExpand ? MAX_HEIGHT : MIN_HEIGHT;
        // });
      },
    })
  ).current;

  function toCreatePage() {
    useSetStore.getState().setSongs(songs)
    router.push("/set/SetView")
  }

  return (
    <Animated.View style={[sheetStyles.bottomSheet, { height: animatedHeight }]}>
      <View {...panResponder.panHandlers} style={styles.sliderHandle}>
        <View style={styles.sliderBar} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>콘티 만들기:</Text>
        {/* <TouchableOpacity onPress={emptySelectedSongs}>
          <IconSymbol name="trash.fill" color={"#fff"} size={30} />
        </TouchableOpacity> */}
      </View>
      
      <View style={styles.contentContainer}>
        <FlatList
          data={songs}
          keyExtractor={(item) => `${item.id}set`}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => <ChosenSongComp song={item} numb={index + 1} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={toCreatePage}>
          <MaterialIcons name="arrow-forward" color={secondaryColor} size={24} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const sheetStyles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: primaryColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 999,
    elevation: 10,
    overflow: "hidden",
  },

})

const styles = responsiveStyleSheet({
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  sliderHandle: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderBar: {
    width: 50,
    height: 2,
    borderRadius: 3,
    backgroundColor: secondaryColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: secondaryColor,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    borderColor: bgColor,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
