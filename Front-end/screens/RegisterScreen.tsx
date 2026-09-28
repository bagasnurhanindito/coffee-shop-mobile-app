import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../utils/utils';

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {
    if (!phone || !email || !username || !fullName || !password) {
      Alert.alert('Error', 'Semua kolom wajib diisi.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid.');
      return false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Nomor telepon harus berupa angka dan terdiri dari 10-15 digit.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInput()) return;

    try {
      const response = await registerUser({ phone, email, username, fullName, password });
      Alert.alert('Sukses', 'Pendaftaran berhasil!');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        placeholderTextColor="#ffffff"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ffffff"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nomor Handphone"
        placeholderTextColor="#ffffff"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ffffff"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ffffff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="DAFTAR" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A97148',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
});