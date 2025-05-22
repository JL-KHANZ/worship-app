// import { Image, ScrollView, Text, StyleSheet, View } from "react-native";
// import SongComp from "./SongComp";

// interface Props {
//     songSources: Array<SONGOBJ>,
// }

// export default function SongListComp({ songSources }: Props) {
//     return (
//         <ScrollView>
//             <SongList songSources={songSources} />
//         </ScrollView>
//     )
// }

// function SongList({ songSources }: Props) {
//     return(
//         <View style={localStyles.songListView}>
//             {songSources.map(song => {
//                 return (
//                     <View style={localStyles.songView}>
//                         <SongComp songSource={song.route} key={song.songId} name={song.name} />
//                     </View>
//                 )
//             })}
//         </View>
//     )
// }

// const localStyles = StyleSheet.create({
//     songListView: {
//         flexDirection: 'row'
//     },
//     songView: {
//         marginRight: 30,
//     }
// })

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SongComp from './SongComp';
import { responsiveStyleSheet } from '../ui/responsive';

interface SONGOBJ {
  route: NodeRequire;
  name: string;
  songId: number;
}

interface SongScrollListProps {
  songs: Array<SONGOBJ>;
  onPressSong?: (song: SONGOBJ) => void;
}

const SongScrollList: React.FC<SongScrollListProps> = ({ songs, onPressSong }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.songId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.horizontalList} onPress={() => onPressSong?.(item)}>
            <SongComp name={item.name} songSource={item.route} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = responsiveStyleSheet({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    width: 120,
    height: 140,
    marginRight: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginInlineEnd: 55,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  horizontalList: {
    marginInlineEnd: 30,
  }
});

export default SongScrollList;
