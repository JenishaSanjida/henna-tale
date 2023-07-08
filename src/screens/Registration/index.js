import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Login from '../Login';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Register');

  const handleRegister = () => {
    // Add your registration logic here
  };

  const handleScreenChange = () => {
    setCurrentScreen(currentScreen === 'Register' ? 'Login' : 'Register');
  };

  return currentScreen === 'Register' ? (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={handleScreenChange}>
          <Text style={{ marginLeft: 5, color: "#2196F3", fontWeight: "bold" }}>Sign in →</Text>
        </TouchableOpacity>
      </View>

    </View>
  ) : <Login />
}

