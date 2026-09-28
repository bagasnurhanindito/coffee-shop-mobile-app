import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Menu {
  id: string;
  name: string;
  price: number;
  image: any;
}

type RootStackParamList = {
  History: { orders: Menu[] };
};

export default function HistoryScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'History'>>();
  const { orders } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Image source={item.image} style={styles.historyImage} />
            <Text style={styles.historyText}>{item.name} - Rp {item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    alignItems: 'center', // Center items in each history item
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
  },
  historyImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,  // Optional, to make the image corners rounded
  },
});