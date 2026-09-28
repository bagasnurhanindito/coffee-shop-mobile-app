import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Menu {
  id: string;
  name: string;
  price: number;
  image: any;
}

const menus: Menu[] = [
  { id: '1', name: 'French fries', price: 18000, image: require('../assets/kentang.png') },
  { id: '2', name: 'Nugget goreng', price: 18000, image: require('../assets/naget.png') },
  { id: '3', name: 'Nasi goreng', price: 28000, image: require('../assets/nasi.png') },
  { id: '4', name: 'Mie Goreng Telur', price: 28000, image: require('../assets/mie.png') },
  { id: '5', name: 'Americano', price: 28000, image: require('../assets/minu3.png') },
  { id: '6', name: 'Purple grape', price: 28000, image: require('../assets/minum1.png') },
];

type RootStackParamList = {
  History: { orders: Menu[] };
};

export default function MenuScreen() {
  const [orders, setOrders] = useState<Menu[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOrder = (menu: Menu) => {
    setOrders([...orders, menu]);
    alert(`Order placed for ${menu.name} - Rp ${menu.price}`);
  };

  const navigateToHistory = () => {
    navigation.navigate('History', { orders });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menus}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={item.image} style={styles.menuImage} />
            <Text style={styles.menuText}>{item.name}</Text>
            <Text style={styles.menuPrice}>Rp {item.price}</Text>
            <Button title="Pesan" onPress={() => handleOrder(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display items in 2 columns
      />
      <Button title="Lihat Histori" onPress={navigateToHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D4C08C', // Background color to match your theme
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  menuItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, // Ensure all items have the same height
  },
  menuText: {
    fontSize: 18,
    marginVertical: 5,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});