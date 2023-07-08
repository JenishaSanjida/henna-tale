import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './styles';
import MyDrawer from '../../components/DrawerNavigator';
import Registration from '../Registration';
import { setAccessToken, setLoggedInUserDetail } from '../../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../constants/apiConfig';

export default function Login() {

  const dispatch = useDispatch();

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

  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  }

  const handleLogin = () => {
    console.log("login button clicked...");

    // Prepare the registration data
    const loginData = {
      email: email,
      password: password
    };

    // Make an API call to the login
    fetch(BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response here
        console.log('Login successful', data);

        if (data?.error) {
          showToastWithGravity('Invalid email or password');
        }
        else {
          // Perform any necessary actions after successful registration
          showToastWithGravity('Login successful');

          dispatch(setLoggedInUserDetail(data?.user));
          dispatch(setAccessToken(data?.token));

          setIsLoggedIn(true);
        }

      })
      .catch(error => {
        console.error('Login failed', error);
        showToastWithGravity('Something went wrong!');
        // Handle the error case
      });

    // if (email == 'admin@gmail.com' && password == '12345') {
    //   setIsLoggedIn(true);
    // }
    // else {
    //   showToastWithGravity('Invalid email or password');
    // }

    // Add your login logic here
  };


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
