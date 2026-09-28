import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { loginUser } from '../utils/utils';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      const { token } = response;
      if (token) {
        await AsyncStorage.setItem('token', token); // Simpan token
        const storedToken = await AsyncStorage.getItem('token'); // Ambil token dari AsyncStorage
        console.log('Token stored in AsyncStorage:', storedToken); // Log token untuk debugging
        alert('Login successful!');
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Error', 'Token not found in response.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>MUG LIFE</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Masukkan Username:"
        placeholderTextColor="#ffffff"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan Kata Sandi:"
        placeholderTextColor="#ffffff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>MASUK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A97148', // Warna latar belakang seperti gambar
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#D19A66',
    color: '#ffffff',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#5C3D2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
