import React, { useState } from 'react';
// import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from './styles';
import { Title } from 'react-native-paper';
import { format, parseISO, parse } from 'date-fns';
import Confirm from '../NewAppointment/Confirm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';


const Stack = createNativeStackNavigator();

export const Profile = () => {

    const [schedule, setSchedule] = useState({
        dayOfWeek: 'Tuesday',
        timeSlots: [
            {
                time: '12:00 PM',
                isBooked: false,
                _id: '6476410a10f76bc6cdc7a1e7',
            },
        ],
        _id: '6476410a10f76bc6cdc7a1e6',
    });

    const [newTimeSlot, setNewTimeSlot] = useState('');
    const [portfolioImages, setPortfolioImages] = useState([
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random',
        'https://picsum.photos/200/300?random'
    ]);

    const addTimeSlot = () => {
        if (newTimeSlot.trim() !== '') {
            const updatedSchedule = { ...schedule };
            updatedSchedule.timeSlots.push({
                time: newTimeSlot,
                isBooked: false,
                _id: generateUniqueId(),
            });
            setSchedule(updatedSchedule);
            setNewTimeSlot('');
        }
    };

    const updateBookingStatus = (timeSlotId) => {
        const updatedSchedule = { ...schedule };
        const timeSlotIndex = updatedSchedule.timeSlots.findIndex(
            (slot) => slot._id === timeSlotId
        );
        if (timeSlotIndex !== -1) {
            updatedSchedule.timeSlots[timeSlotIndex].isBooked = !updatedSchedule.timeSlots[
                timeSlotIndex
            ].isBooked;
            setSchedule(updatedSchedule);
        }
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleImageUpload = () => {
        console.log("image upload")
    };

    return (
        // <View>
        //     <Text>Profile Screen</Text>
        // </View>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Avatar
                    rounded
                    source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                    size="large"
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileAddress}>123 Main St, New York, NY</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Schedule</Text>
                {schedule.timeSlots.map((slot) => (
                    <TouchableOpacity
                        key={slot._id}
                        onPress={() => updateBookingStatus(slot._id)}
                        style={[styles.timeSlot, slot.isBooked && styles.bookedTimeSlot]}
                    >
                        <Text style={styles.timeSlotText}>{slot.time}</Text>
                        <Text style={styles.timeSlotStatus}>
                            {slot.isBooked ? 'Booked' : 'Available'}
                        </Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.addTimeSlotContainer}>
                    <Input
                        value={newTimeSlot}
                        onChangeText={setNewTimeSlot}
                        placeholder="Add new time slot"
                        containerStyle={styles.inputContainer}
                    />
                    <Button
                        title="Add"
                        onPress={addTimeSlot}
                        buttonStyle={styles.addButton}
                    />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Portfolio</Text>
                <View style={styles.imageUploadContainer}>
                    {portfolioImages.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.portfolioImageContainer}
                            onPress={() => handleImagePress(image)}
                        >
                            <Image
                                source={{ uri: image }}
                                style={styles.portfolioImage}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handleImageUpload}
                    >
                        <Icon name="file" size={20} color="#fff" />
                        <Text style={styles.uploadButtonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>


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