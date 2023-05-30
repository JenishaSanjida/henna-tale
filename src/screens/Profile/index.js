import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Background from '../../components/Background';
import { Container, Hour, HourList } from './styles';
import DateInput from '../../components/DateInput';
import { Title, Button } from 'react-native-paper';
import { format, parseISO, parse } from 'date-fns';
import Confirm from '../NewAppointment/Confirm';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();

export const Profile = () => {

    return (
        <View>
            <Text>Profile Screen</Text>
        </View>

    )
}

const ProfileScreenStack = () => {

    const navigation = useNavigation();

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    // fontFamily: 'Ubuntu-Bold',
                    color: '#000',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={handleOpenDrawer} style={{ marginLeft: 10 }}>
                        <FontAwesome name="navicon" style={{ fontSize: 24 }} />
                    </TouchableOpacity>
                ),
                headerLeftContainerStyle: { marginLeft: 10 },
            }}>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ title: 'HennaTales' }}
            />
            <Stack.Screen
                name="Confirm"
                component={Confirm}
            // options={{
            //     headerStyle: {
            //         backgroundColor: '#fff',
            //     },
            //     headerTitleStyle: {
            //         // fontFamily: 'Ubuntu-Bold',
            //         color: '#000',
            //     },
            //     headerTitleAlign: 'left',
            //     headerLeft: () => (
            //         <TouchableOpacity onPress={() => navigation.pop()}>
            //             <Icon name="chevron-left" size={22} color="#000" />
            //         </TouchableOpacity>

            //     ),
            //     headerLeftContainerStyle: { marginLeft: 10 },
            // }}
            />
        </Stack.Navigator>
    );
};

export default ProfileScreenStack