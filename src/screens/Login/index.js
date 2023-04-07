import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './styles';
import MyDrawer from '../../components/DrawerNavigator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const showToast = () => {
  //   ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
  // };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Invalid email or password',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  }

  const handleLogin = () => {
    console.log("login button clicked...");
    if (email == 'admin@gmail.com' && password == '12345') {
      setIsLoggedIn(true);
    }
    else {
      showToastWithGravity();
    }

    // Add your login logic here
  };

  // const handleRegister = () => {
  //   // Handle registration functionality here
  // };

  // const toggleRegistration = () => {
  //   setShowRegistration(!showRegistration);
  // };


  return (
    <>

      {isLoggedIn ? (<MyDrawer />) : (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

    </>
  );
}
