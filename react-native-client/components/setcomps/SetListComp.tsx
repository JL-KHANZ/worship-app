import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveStyleSheet } from '../ui/responsive';
import { bgColor, primaryColor, secondaryColor, tertiaryColor } from '../ui/PrefStyles';
import { IconSymbol } from '../ui/IconSymbol';
import { router } from 'expo-router';
import { useSetViewStore } from '@/lib/setStore';

interface SetListCompProps {
  viewTitle: string;
  setList: SETCLIENT[];
}

const SetListComp: React.FC<SetListCompProps> = ({ viewTitle, setList }) => {

  const onPressSet = (set: SETCLIENT) => {
    useSetViewStore.getState().setSet(set);
    router.push(`/setviewer/${set.id}`);
  };

  const renderSetItem = ({ item }: { item: SETCLIENT }) => (
    <TouchableOpacity style={styles.setCard} onPress={() => onPressSet(item)}>
      <View style={styles.setInfo}>
        <View style={styles.nameDateRow}>
          <Text style={styles.setName}>{item.name}</Text>
          <Text style={styles.setDate}>만든날짜: {item.dateCreated.toDateString()}</Text>
        </View>
        <Text style={styles.songCount}>{item.songs.length}곡</Text>
      </View>
      <IconSymbol 
        name="chevron.right" 
        color={tertiaryColor} 
        size={20}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{viewTitle}</Text>
      <FlatList
        data={setList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderSetItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = responsiveStyleSheet({
  sectionContainer: {
    paddingVertical: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 8,
    color: tertiaryColor,
    marginLeft: 25,
  },
  listContent: {
    paddingHorizontal: 25,
  },
  setCard: {
    flexDirection: 'row',
    backgroundColor: secondaryColor,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  setInfo: {
    flex: 1,
    marginRight: 15,
  },
  nameDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  setName: {
    fontSize: 16,
    fontWeight: '700',
    color: primaryColor,
  },
  setDate: {
    fontSize: 12,
    color: tertiaryColor,
  },
  songCount: {
    fontSize: 11,
    color: tertiaryColor,
    fontWeight: '500',
  },
  chevron: {
    alignSelf: 'center',
  },
});

export default SetListComp;
