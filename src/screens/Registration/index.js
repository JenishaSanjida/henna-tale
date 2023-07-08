import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Login from '../Login';
import { BASE_URL } from '../../constants/apiConfig';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import PlaceDropdowns from '../../components/PlaceDropdowns';
import { setSelectedDistrict, setSelectedDivision, setSelectedThana } from '../../store/reducers/placeSlice';

export default function Registration() {

  const dispatch = useDispatch();

  const { selectedDivision, selectedDistrict, selectedThana } = useSelector(state => state.place);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('designer');
  const [currentScreen, setCurrentScreen] = useState('Register');

  const handleRegister = () => {
    // Validate the form data
    if (!email || !password || !confirmPassword || !role || !selectedDivision || !selectedDistrict || !selectedThana) {
      alert('Please fill in all the fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Prepare the registration data
    const registrationData = {
      name: name, // Provide the name value here
      email: email,
      password: password,
      role: role, // Provide the role value here (customer or designer)
      division: selectedDivision, // Provide the division value here
      district: selectedDistrict, // Provide the district value here
      thana: selectedThana // Provide the thana value here
    };

    console.log("registrationData");
    console.log(registrationData);

    // Make an API call to store the registration data
    fetch(BASE_URL + '/user/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response here
        console.log('Registration successful', data);
        // Perform any necessary actions after successful registration

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('designer');
        dispatch(setSelectedDivision(''));
        dispatch(setSelectedDistrict(''));
        dispatch(setSelectedThana(''));

      })
      .catch(error => {
        console.error('Registration failed', error);
        // Handle the error case
      });
  };

  const handleScreenChange = () => {
    setCurrentScreen(currentScreen === 'Register' ? 'Login' : 'Register');
  };

  return currentScreen === 'Register' ? (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={role}
          onValueChange={(value) => setRole(value)}
          mode='dropdown'
        >
          <Picker.Item label="Designer" value="designer" />
          <Picker.Item label="Customer" value="customer" />
        </Picker>

        <PlaceDropdowns />
      </View>

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

