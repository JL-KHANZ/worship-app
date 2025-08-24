import { getAllTeamSetLists } from "@/api";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { bgColor, primaryColor } from "@/components/ui/PrefStyles";
import { responsiveStyleSheet } from "@/components/ui/responsive";
import { useTeam } from "@/context/teamContext";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Dimensions, Platform } from "react-native";
import CalendarDay from "./CalendarDay";
import { FlatList } from "react-native-gesture-handler";

export default function TeamCalendar() {
  const [teamSets, setTeamSets] = useState<Array<SETCLIENT> | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const { team } = useTeam();
  
  // Get screen dimensions for responsive design
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // Determine device type and column count
  const getDeviceType = () => {
    if (Platform.OS === 'web') {
      if (screenWidth >= 1024) return 'desktop'; // Large screens
      if (screenWidth >= 768) return 'tablet'; // Medium screens
      return 'mobile'; // Small screens
    }
    
    // For native platforms
    if (screenWidth >= 768 || (screenWidth > screenHeight && screenWidth >= 1024)) {
      return 'tablet'; // iPad and large Android tablets
    }
    return 'mobile'; // Phones
  };
  
  const getColumnCount = () => {
    const deviceType = getDeviceType();
    switch (deviceType) {
      case 'desktop':
        return Math.max(7, Math.floor(screenWidth / 120)); // Adaptive based on screen width
      case 'tablet':
        return 7; // iPad/tablet optimal
      case 'mobile':
        return screenWidth < 400 ? 4 : 5; // 4 for very small phones, 5 for regular phones
      default:
        return 7;
    }
  };
  
  const getIconSize = () => {
    const deviceType = getDeviceType();
    switch (deviceType) {
      case 'desktop':
        return Math.min(40, Math.max(30, screenWidth / 40));
      case 'tablet':
        return 35;
      case 'mobile':
        return 25;
      default:
        return 30;
    }
  };
  
  const getSpacing = () => {
    const deviceType = getDeviceType();
    switch (deviceType) {
      case 'desktop':
        return Math.min(50, Math.max(30, screenWidth / 25));
      case 'tablet':
        return 40;
      case 'mobile':
        return 20;
      default:
        return 30;
    }
  };

  useEffect(() => {
    async function getData() {
      if (!team) return;
      const res = getAllTeamSetLists(team?.teamId)
      setTeamSets(res)
    }

    getData()
  }, [])

  function Calendar() {
    const [daysInMonth, setDaysInMonth] = useState<Array<string>>([])
    const columnCount = getColumnCount();

    useEffect(() => {
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
      const daysInMonth = lastDayOfMonth.getDate()

      const days = []
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentYear, currentMonth, i).toDateString())
      }
      setDaysInMonth(days)

    }, [currentMonth, currentYear])

    return (
      <View style={styles.calendar}>
        <View style={[styles.calendarGrid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {daysInMonth.map((item) => (
            <View key={item} style={[styles.dayContainer, { width: `${100 / columnCount}%` }]}>
              <CalendarDay day={item} setList={teamSets} />
            </View>
          ))}
        </View>
      </View>
    )
  }

  function reduceYear() {
    if (currentYear >= 2025) setCurrentYear(currentYear - 1)
  }
  function increaseYear() {
    setCurrentYear(currentYear + 1)
  }
  function reduceMonth() {
    if (currentMonth == 1) {
      reduceYear()
      setCurrentMonth(12)
      return
    }
    setCurrentMonth(currentMonth - 1)
  }
  function increaseMonth() {
    if (currentMonth == 12) {
      increaseYear()
      setCurrentMonth(1)
      return
    }
    setCurrentMonth(currentMonth + 1)
  }

  const iconSize = getIconSize();
  const spacing = getSpacing();

  return (
    <View style={[styles.view, { padding: spacing }]}>
      <View style={styles.calendarView}>
        <Text style={styles.calendarTitle}>캘린더:</Text>

        <TouchableOpacity style={styles.changeMonthButton} onPress={reduceYear}>
          <FontAwesome name="arrow-left" color={primaryColor} size={iconSize} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentYear}년</Text>
        <TouchableOpacity style={styles.changeMonthButton} onPress={increaseYear}>
          <FontAwesome name="arrow-right" color={primaryColor} size={iconSize} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.changeMonthButton, { marginLeft: spacing * 1.5 }]} onPress={reduceMonth}>
          <FontAwesome name="arrow-left" color={primaryColor} size={iconSize} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}월</Text>
        <TouchableOpacity style={styles.changeMonthButton} onPress={increaseMonth}>
          <FontAwesome name="arrow-right" color={primaryColor} size={iconSize} />
        </TouchableOpacity>
      </View>

      <Calendar />
    </View>
  )
}

const styles = responsiveStyleSheet({
  view: {
    backgroundColor: bgColor,
  },
  calendarView: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#888",
    marginRight: 30,
  },
  changeMonthButton: {
    margin: 5,
  },
  monthText: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  calendar: {
    marginTop: 30,
    width: '100%',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    flexGrow: 1,
  },
  calendarRow: {
    width: '100%',
  },
  dayContainer: {
    // Width will be set dynamically based on column count
  }
})
