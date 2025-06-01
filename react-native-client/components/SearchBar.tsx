import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { bgColor, primaryColor, secondaryColor, tertiaryColor } from './ui/PrefStyles';
import { responsiveStyleSheet } from './ui/responsive';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  recentSearches?: string[];
  onSelectSearch?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChangeText,
  recentSearches = [],
  onSelectSearch,
}) => {
  const [focused, setFocused] = useState(false);

  const filteredSearches = recentSearches.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <View>
      <View style={styles.container}>
        <Feather name="search" size={20} color={tertiaryColor} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={tertiaryColor}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 100)}
        />
      </View>
      {focused && filteredSearches.length > 0 && (
        <View style={staticStyles.dropdown}>
          <FlatList
            data={filteredSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => onSelectSearch?.(item)}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const staticStyles = StyleSheet.create({
  dropdown: {
    backgroundColor: primaryColor,
    borderRadius: 12,
    marginTop: 0,
    marginHorizontal: 2,
    maxHeight: 150,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 1000,
  },

})

const styles = responsiveStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 0,
    marginTop: 9,
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 11,
    color: bgColor,
  },
});

export default SearchBar;