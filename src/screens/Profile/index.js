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
import { View, Text, StyleSheet, ScrollView, Image, ToastAndroid, FlatList } from 'react-native';
import { Input, Avatar, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { dummyAvatar } from '../../constants/others';
import { BASE_URL, FILE_BASE_URL } from '../../constants/apiConfig';
import { setLoggedInUserDetail } from '../../store/reducers/userSlice';
import { Hour, HourList } from '../NewAppointment/SelectDateTime/styles';
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const Stack = createNativeStackNavigator();

export const Profile = () => {

    const dispatch = useDispatch();
    const { loggedInUserDetail, accessToken } = useSelector(state => state.user);

    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const maxVisiblePhotos = 6;
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleImageUpload = async () => {
        // Implement your image upload logic here
        // dispatch(uploadImage(imageUri));
        // Configure image picker options
        const options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
        };

        // You can also use as a promise without 'callback':
        const response = await launchImageLibrary(options);

        // Launch image picker
        // ImagePicker.showImagePicker(options, async (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorMessage) {
            console.log('Image picker error: ', response.errorMessage);
        } else if (response.assets) {
            // Dispatch the upload image action with the selected file
            // dispatch(uploadImage(response));
            console.log(response.assets)
            setSelectedImage(response.assets[0]?.uri);
            try {
                const formData = new FormData();
                formData.append('image', {
                    uri: response.assets[0]?.uri,
                    type: response.assets[0]?.type,
                    name: response.assets[0].fileName,
                });

                const apiResponse = await fetch(`${BASE_URL}/users/${loggedInUserDetail._id}/portfolio/images`, {
                    method: 'POST',
                    body: formData,
                });

                apiResponse.json().then(data => {

                    if (data?.portfolio) {
                        showToastWithGravity(data?.message);
                        dispatch(setLoggedInUserDetail({
                            ...loggedInUserDetail,
                            portfolio: data?.portfolio,
                        }))
                    } else {
                        showToastWithGravity(data.message)
                    }

                })

            } catch (error) {
                console.error('Image upload error:', error);
                showToastWithGravity(error);
            }
        }
        // });
    };

    const handleImageDelete = (imageId) => {
        // Implement your image deletion logic here
        console.log(imageId);
        // dispatch(deleteImage(imageId));
    };

    const handleToggleShowAllPhotos = () => {
        setShowAllPhotos(!showAllPhotos);
    };

    // const renderPhotoItem = ({ item }) => (
    //     <Image source={{ uri: `${FILE_BASE_URL}/${item}` }} style={styles.photoItem} />
    // );

    const renderPhotoItem = ({ item }) => {
        const handleDeletePhoto = async () => {
            try {
                // Make an API call to delete the photo using item.id or any appropriate identifier
                const response = await fetch(`${BASE_URL}/user/${loggedInUserDetail._id}/portfolio/images/${item}`, {
                    method: 'DELETE'
                });

                response.json().then(data => {

                    if (data?.portfolio) {
                        showToastWithGravity(data?.message);
                        dispatch(setLoggedInUserDetail({
                            ...loggedInUserDetail,
                            portfolio: data?.portfolio,
                        }))
                    } else {
                        showToastWithGravity(data.message)
                    }

                })
                // Update the portfolio in your state after the photo is successfully deleted
            } catch (error) {
                console.error('Error deleting photo:', error);
                showToastWithGravity(error)
            }
        };

        return (
            <View style={styles.portfolioImageContainer}>
                <Image source={{ uri: `${FILE_BASE_URL}/${item}` }} style={styles.portfolioImage} />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeletePhoto}
                >
                    <FontAwesome name="trash" style={{ fontSize: 24, color: 'white' }} />
                </TouchableOpacity>
            </View>
        );
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
                        placeholder="Add time slot, e.g. 13:00"
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
                                    disabled={item.isBooked}
                                // onPress={() => handleSelectHour(item)}
                                >
                                    <Title>{item.time}</Title>
                                </Hour>
                            )}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Portfolio</Text>
                <View style={styles.imageUploadContainer}>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handleImageUpload}
                    >
                        <FontAwesome name="file" style={{ fontSize: 24, color: 'white' }} />
                        <Text style={styles.uploadButtonText}>Upload Image</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={showAllPhotos ? loggedInUserDetail?.portfolio?.designs : loggedInUserDetail?.portfolio?.designs.slice(0, maxVisiblePhotos)}
                        renderItem={renderPhotoItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={styles.photoGrid}
                        ListFooterComponent={() =>
                            loggedInUserDetail?.portfolio?.designs.length > maxVisiblePhotos && (
                                <TouchableOpacity
                                    style={styles.morePhotosButton}
                                    onPress={handleToggleShowAllPhotos}
                                >
                                    <Text style={styles.morePhotosButtonText}>
                                        {showAllPhotos ? 'Show Less' : 'Show More'}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    />
                </View>
            </View>
        </ScrollView>
    );
};

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