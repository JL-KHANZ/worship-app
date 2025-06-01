import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveStyleSheet } from '../ui/responsive';
import { bgColor, primaryColor, secondaryColor, tertiaryColor } from '../ui/PrefStyles';
import SongComp from './SongComp';

interface SongsListViewCompProps {
  viewTitle: string;
  songList: SONGCLIENT[];
  onPressSong?: (song: SONGCLIENT) => void;
  onSelectSong?: (song: SONGCLIENT) => void;
  onDeselectSong?: (song: SONGCLIENT) => void;
  cardColor: string
}

const SongsListViewComp: React.FC<SongsListViewCompProps> = ({ viewTitle, songList, onPressSong, onSelectSong, onDeselectSong, cardColor }) => {

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{viewTitle}</Text>
      <FlatList
        data={songList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <SongComp
          song={item} 
          onPressSong={() => onPressSong?.(item)}
          onSelectSong={() => onSelectSong?.(item)}
          onDeselectSong={() => onDeselectSong?.(item)}
          cardColor={cardColor}
          />
        )}
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
  },
});

export default SongsListViewComp;
