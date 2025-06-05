import { Image, StyleSheet, Platform, ScrollView, Text, SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import {
  fontfamily,
  primaryColor,
  secondaryColor,
  bgColor,
} from '@/components/ui/PrefStyles';
import { useEffect, useState } from 'react';
import { responsiveStyleSheet } from '@/components/ui/responsive';
import { router } from 'expo-router';
import { getUserTeams } from '@/api';
import { TeamProvider, useTeam } from '@/context/teamContext';
import TeamCalendar from '../team/teamcalendar';

export default function TeamSpaceScreen() {
  const [userTeams, setUserTeams] = useState<Array<TEAMCLIENT>>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0)

  const { team, saveTeam } = useTeam();

  const [scanning, setScanning] = useState(false)
  function createTeam() {
    router.push("/team/createteam")
  }
  function joinTeam() {
    router.push("../cameraqr")
    setScanning(false)
  }

  function TeamSpaceView() {
    if (userTeams.length == 0) {
      return (
        <>
          <Text style={styles.noTeamText}>아직 소속되어 있는 팀이 없습니다</Text>
          <View style={styles.teamView}>
            <TouchableOpacity style={styles.makeTeamButton} onPress={createTeam}>
              <Text style={styles.makeTeamButtonText}>팀 만들기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.makeTeamButton} onPress={joinTeam}>
              <Text style={styles.makeTeamButtonText}>팀 들어가기</Text>
            </TouchableOpacity>
          </View>
        </>
      )
    } else {
      return (
        <View>
          <Text>{userTeams[currentTeamIndex].teamName}</Text>
          <TeamCalendar />
        </View>
      )
    }
  }

  useEffect(() => {
    async function getData() {
      const res = await getUserTeams()
      if (!res) {
        Alert.alert("팀을 불러오지 못했습니다")
      }
      setUserTeams(res)
    }

    getData()
    saveTeam(userTeams[currentTeamIndex])

  }, [])

  useEffect(() => {
    saveTeam(userTeams[currentTeamIndex])
  }, [currentTeamIndex])

  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.title}>팀스페이스</Text>
      <TeamSpaceView />
    </SafeAreaView>
  )
}

const styles = responsiveStyleSheet({
  view: {
    backgroundColor: bgColor,
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: primaryColor,
    fontWeight: "700",
    paddingLeft: 30
  },
  noTeamText: {
    color: primaryColor,
    fontSize: 15,
    padding: 30
  },
  teamView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  makeTeamButton: {
    padding: 15,
    margin: 30,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor
  },
  makeTeamButtonText: {
    fontSize: 13,
    fontColor: primaryColor
  }
})