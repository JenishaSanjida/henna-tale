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
import { View, Text, StyleSheet, ScrollView, Image, ToastAndroid } from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { dummyAvatar } from '../../constants/others';
import { BASE_URL, FILE_BASE_URL } from '../../constants/apiConfig';
import { setLoggedInUserDetail } from '../../store/reducers/userSlice';
import { Hour, HourList } from '../NewAppointment/SelectDateTime/styles';


const Stack = createNativeStackNavigator();

export const Profile = () => {

    const dispatch = useDispatch();
    const { loggedInUserDetail, accessToken } = useSelector(state => state.user);
    // const { schedules, portfolioImages } = useSelector(state => state.profile);

    const [selectedDay, setSelectedDay] = useState('');
    const [newTimeSlot, setNewTimeSlot] = useState('');
    const [schedules, setSchedules] = useState([
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ]);

    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }

    const addTimeSlot = () => {

        if (selectedDay && newTimeSlot.trim() !== '') {

            // Prepare the registration data
            const scheduleData = {
                dayOfWeek: selectedDay,
                timeSlot: newTimeSlot
            };

            // Calling schedule save API
            fetch(`${BASE_URL}/user/${loggedInUserDetail._id}/schedule/save`, {
                method: 'POST',
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scheduleData)
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the API response here
                    console.log('Schedule save successful', data);

                    if (data?.error) {
                        showToastWithGravity(data?.error);
                    }
                    else {
                        // Perform any necessary actions after successful registration
                        showToastWithGravity(data?.message);
                        dispatch(setLoggedInUserDetail(data?.user));
                    }

                })
                .catch(error => {
                    console.error('Login failed', error);
                    showToastWithGravity('Something went wrong!');
                    // Handle the error case
                });

            // End of calling schedule save API
            setSelectedDay('');
            setNewTimeSlot('');
        }
    };

    const handleImageUpload = () => {
        // Implement your image upload logic here
        // dispatch(uploadImage(imageUri));
    };

    const handleImageDelete = (imageId) => {
        // Implement your image deletion logic here
        console.log(imageId);
        // dispatch(deleteImage(imageId));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Avatar
                    rounded
                    source={{
                        uri: loggedInUserDetail?.picture ? loggedInUserDetail?.picture : dummyAvatar,
                    }}
                    size="large"
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{loggedInUserDetail?.name}</Text>
                    <Text style={styles.profileAddress}>
                        {loggedInUserDetail?.thana}, {loggedInUserDetail?.district},{' '}
                        {loggedInUserDetail?.division}
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Schedule</Text>
                <View style={styles.addTimeSlotContainer}>
                    <Picker
                        selectedValue={selectedDay}
                        onValueChange={(itemValue) => setSelectedDay(itemValue)}
                        style={styles.pickerContainer}
                    >
                        <Picker.Item label="Select a day" value="" />
                        {schedules.map((schedule) => (
                            <Picker.Item
                                key={schedule}
                                label={schedule}
                                value={schedule}
                            />
                        ))}
                    </Picker>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <Input
                        value={newTimeSlot}
                        onChangeText={setNewTimeSlot}
                        placeholder="Add new time slot, Example: 13:00"
                        containerStyle={styles.inputContainer}
                    />
                    <Button
                        title="Add"
                        onPress={addTimeSlot}
                        buttonStyle={styles.addButton}
                        disabled={(selectedDay && newTimeSlot.trim() !== '') ? false : true}
                    />
                </View>
                {loggedInUserDetail?.schedule.map((schedule) => (
                    <View key={schedule._id} style={styles.scheduleContainer}>
                        <Text style={styles.scheduleDay}>{schedule.dayOfWeek}</Text>

                        <HourList
                            data={schedule.timeSlots}
                            keyExtractor={item => String(item.time)}
                            renderItem={({ item }) => (
                                <Hour
                                    enabled={item.isBooked}
                                // onPress={() => handleSelectHour(item)}
                                >
                                    <Title>{item.time}</Title>
                                </Hour>
                            )}
                        />
                        {/* <View style={styles.addTimeSlotContainer}>
                            <Input
                                value={newTimeSlot}
                                onChangeText={setNewTimeSlot}
                                placeholder="Add new time slot"
                                containerStyle={styles.inputContainer}
                            />
                            <Button
                                title="Add"
                                onPress={() => addTimeSlot(schedule.dayOfWeek)}
                                buttonStyle={styles.addButton}
                            />
                        </View> */}
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Portfolio</Text>
                <View style={styles.imageUploadContainer}>
                    {loggedInUserDetail?.portfolio.designs.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.portfolioImageContainer}
                            onPress={() => handleImageDelete(image)}
                        >
                            <Image
                                source={{ uri: `${FILE_BASE_URL}/${image}` }}
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
    );
};

// export const Profile = () => {

//     const { loggedInUserDetail } = useSelector(state => state.user);

//     const [schedule, setSchedule] = useState({
//         dayOfWeek: 'Tuesday',
//         timeSlots: [
//             {
//                 time: '12:00 PM',
//                 isBooked: false,
//                 _id: '6476410a10f76bc6cdc7a1e7',
//             },
//         ],
//         _id: '6476410a10f76bc6cdc7a1e6',
//     });

//     const [newTimeSlot, setNewTimeSlot] = useState('');
//     const [portfolioImages, setPortfolioImages] = useState([
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random',
//         'https://picsum.photos/200/300?random'
//     ]);

//     const addTimeSlot = () => {
//         if (newTimeSlot.trim() !== '') {
//             const updatedSchedule = { ...schedule };
//             updatedSchedule.timeSlots.push({
//                 time: newTimeSlot,
//                 isBooked: false,
//                 _id: generateUniqueId(),
//             });
//             setSchedule(updatedSchedule);
//             setNewTimeSlot('');
//         }
//     };

//     const updateBookingStatus = (timeSlotId) => {
//         const updatedSchedule = { ...schedule };
//         const timeSlotIndex = updatedSchedule.timeSlots.findIndex(
//             (slot) => slot._id === timeSlotId
//         );
//         if (timeSlotIndex !== -1) {
//             updatedSchedule.timeSlots[timeSlotIndex].isBooked = !updatedSchedule.timeSlots[
//                 timeSlotIndex
//             ].isBooked;
//             setSchedule(updatedSchedule);
//         }
//     };

//     const generateUniqueId = () => {
//         return Math.random().toString(36).substr(2, 9);
//     };

//     const handleImageUpload = () => {
//         console.log("image upload")
//     };

//     return (
//         // <View>
//         //     <Text>Profile Screen</Text>
//         // </View>
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.profileContainer}>
//                 <Avatar
//                     rounded
//                     source={{
//                         uri: loggedInUserDetail?.picture ? loggedInUserDetail?.picture : dummyAvatar,
//                     }}
//                     size="large"
//                 />
//                 <View style={styles.profileInfo}>
//                     <Text style={styles.profileName}>{loggedInUserDetail?.name}</Text>
//                     <Text style={styles.profileAddress}>{loggedInUserDetail?.thana}, {loggedInUserDetail?.district}, {loggedInUserDetail?.division}</Text>
//                 </View>
//             </View>
//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Schedule</Text>
//                 {schedule.timeSlots.map((slot) => (
//                     <TouchableOpacity
//                         key={slot._id}
//                         onPress={() => updateBookingStatus(slot._id)}
//                         style={[styles.timeSlot, slot.isBooked && styles.bookedTimeSlot]}
//                     >
//                         <Text style={styles.timeSlotText}>{slot.time}</Text>
//                         <Text style={styles.timeSlotStatus}>
//                             {slot.isBooked ? 'Booked' : 'Available'}
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//                 <View style={styles.addTimeSlotContainer}>
//                     <Input
//                         value={newTimeSlot}
//                         onChangeText={setNewTimeSlot}
//                         placeholder="Add new time slot"
//                         containerStyle={styles.inputContainer}
//                     />
//                     <Button
//                         title="Add"
//                         onPress={addTimeSlot}
//                         buttonStyle={styles.addButton}
//                     />
//                 </View>
//             </View>
//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Portfolio</Text>
//                 <View style={styles.imageUploadContainer}>
//                     {portfolioImages.map((image, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             style={styles.portfolioImageContainer}
//                             onPress={() => handleImagePress(image)}
//                         >
//                             <Image
//                                 source={{ uri: image }}
//                                 style={styles.portfolioImage}
//                                 resizeMode="cover"
//                             />
//                         </TouchableOpacity>
//                     ))}
//                     <TouchableOpacity
//                         style={styles.uploadButton}
//                         onPress={handleImageUpload}
//                     >
//                         <Icon name="file" size={20} color="#fff" />
//                         <Text style={styles.uploadButtonText}>Upload Image</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </ScrollView>


//     )
// }

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