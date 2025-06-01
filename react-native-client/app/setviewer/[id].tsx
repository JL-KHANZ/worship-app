import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function SetViewer() {
  const id = useLocalSearchParams()

  useEffect(() => {
    console.log(id)
  }, [])

  return (
    <View>
      <Text>Set Viewer</Text>
    </View>
  )
}