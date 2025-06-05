import { bgColor, primaryColor, secondaryColor } from "@/components/ui/PrefStyles";
import { responsiveStyleSheet } from "@/components/ui/responsive";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState('')

  const { user } = useUser()

  function createTeam() {
    // check if team name is usable (unique)
    
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>새로운 팀 만들기</Text>

      <View style={styles.inputView}>
        <Text style={styles.managerText}>팀 매니저: {user?.username}</Text>
        <Text style={styles.inputText}>팀명:</Text>
        <TextInput
          value={teamName}
          placeholder="팀명"
          style={styles.teamNameInput}
          onChangeText={(newText) => setTeamName(newText)}
          placeholderTextColor={"#888"}
        />
      </View>

      <View style={styles.submitButtonView}>
        <TouchableOpacity style={styles.submitButton} onPress={createTeam}>
          <Text style={styles.submitButtonText}>팀 만들기</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = responsiveStyleSheet({
  view: {
    flex: 1,
    backgroundColor: bgColor,
    padding: 30
  },
  text: {
    fontSize: 20,
    color: primaryColor,
    marginTop: 20
  },
  managerText: {
    fontSize: 15,
    fontWeight: "700",
    marginVertical: 20,
  },
  inputText: {
    fontSize: 11,
    paddingBottom: 3
  },
  teamNameInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    fontSize: 11,
    width: 200
  },
  submitButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  }, 
  submitButton: {
    borderColor: primaryColor,
    backgroundColor: secondaryColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 70,
    marginTop: 80,
    alignItems: "center",

  },
  submitButtonText: {

  }
})