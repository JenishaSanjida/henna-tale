import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './styles';
import MyDrawer from '../../components/DrawerNavigator';
import Registration from '../Registration';

export default function Login() {

  Registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Login');

  const handleScreenChange = () => {
    setCurrentScreen(currentScreen === 'Login' ? 'Register' : 'Login');
  };


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

  const handleRegister = () => {
    // Handle registration functionality here
    setCurrentScreen(currentScreen === 'Login' ? 'Register' : 'Login');
  };

  // const toggleRegistration = () => {
  //   setShowRegistration(!showRegistration);
  // };


  return (
    <>

      {isLoggedIn ? (<MyDrawer />) : currentScreen === 'Register' ? <Registration /> :

        (
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


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text>New to App?</Text>
              <TouchableOpacity onPress={handleScreenChange}>
                <Text style={{ marginLeft: 5, color: "#2196F3", fontWeight: "bold" }}>Create an account</Text>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity style={styles.registerButton} onPress={handleScreenChange}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity> */}
          </View>
        )}

    </>
  );
}
