import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const recommendedMenus = [
  { id: '1', name: 'Iced Coffee', image: require('../assets/minum1.png') },
  { id: '2', name: 'Berry Juice', image: require('../assets/minum2.png') },
  { id: '3', name: 'Matcha Latte', image: require('../assets/kopi.png') },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image source={require('../assets/logo.png')} style={styles.headerImage} resizeMode="contain" />

      {/* Title */}
      <Text style={styles.title}>Rekomendasi Untukmu</Text>

      {/* Recommended Menu List */}
      <View style={styles.menuContainer}>
        <FlatList
          data={recommendedMenus}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <Text style={styles.menuText}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2b48c', // Light brown background
    alignItems: 'center',
    padding: 16,
  },
  headerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4e342e',
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  menuItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  menuText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#5d4037',
  },
});
