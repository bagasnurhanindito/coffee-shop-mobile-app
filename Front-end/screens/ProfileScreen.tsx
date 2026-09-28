import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getProfile } from '../utils/utils'; // Import getProfile dari utils

export default function ProfileScreen() {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  // Mengambil data profil pengguna
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token not found. Please log in again.');
        navigation.navigate('Login' as never);
        return;
      }

      const profile = await getProfile(token);
      setFullName(profile.fullName || '');
      setPhone(profile.phone || '');
      setEmail(profile.email || '');
    } catch (error) {
      console.error('Fetch profile error:', error);
      Alert.alert('Error', 'Failed to fetch profile.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Profile Data */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{fullName}</Text>
        <View style={styles.dataRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.infoText}>{phone}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#A97148', // Background sesuai dengan gambar
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  infoContainer: {
    width: '80%', // Membatasi lebar kontainer agar tampak rapih
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: 'row', // Mengatur kolom data berjejer horizontal
    marginBottom: 10,
  },
  label: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
    width: '30%', // Menyediakan ruang untuk label
  },
  infoText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1, // Membuat kolom informasi mengambil ruang sisa
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#5C3D2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
