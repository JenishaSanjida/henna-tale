import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import UserList from '../../constants/userList';
import { Avatar, Badge, ListItem, SearchBar } from 'react-native-elements';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL, BASE_URL_PLACE, FILE_BASE_URL } from '../../constants/apiConfig';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createDynamicAsyncThunk } from '../../store/reducers/apiSlice';
import PlaceDropdowns from '../../components/PlaceDropdowns';
import { setPaginationDetails, setUserList } from '../../store/reducers/userSlice';
import { dummyAvatar } from '../../constants/others';
import { styles } from './styles';

// import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const Search = () => {

    const { selectedDivision, selectedDistrict, selectedThana } = useSelector(state => state.place);
    const { userList, accessToken } = useSelector(state => state.user);

    const [users, setUsers] = useState(userList);
    const [pagination, setPagination] = useState(null);
    const [userData, setUserData] = useState(userList);
    const [search, setSearch] = useState('');

    const handleSearch = text => {

        setSearch(text);
        const filteredList = userData.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase()),
        );
        setUsers(filteredList);
    };

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        if (selectedDivision || selectedDistrict || selectedThana) {
            // Make an API call to store the userlist data
            fetch(`${BASE_URL}/user/list?page=${pagination?.nextPage ? pagination?.nextPage : 1}&size=10&division=${selectedDivision}&district=${selectedDistrict}&thana=${selectedThana}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the API response here
                    console.log('Userlist successful', data);
                    // Perform any necessary actions after getting user list
                    // dispatch(setUserList(data?.data));
                    // dispatch(setPaginationDetails(data?.meta));
                    setUsers(data?.data);
                    setPagination(data?.meta);

                })
                .catch(error => {
                    console.error('Userlist failed', error);
                    // Handle the error case
                });
        }

    }, [selectedDivision, selectedDistrict, selectedThana]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#d0e0e3',
            }}>
            {/* <SearchBar
                placeholder="Search"
                onChangeText={handleSearch}
                value={search}
                containerStyle={{
                    backgroundColor: '#d0e0e3',

                }}
                inputContainerStyle={{
                    backgroundColor: '#d0e0e3',
                }}
                inputStyle={{
                    color: '#000',
                    fontFamily: 'Ubuntu-Medium',
                }}
            /> */}

            <PlaceDropdowns />

            {/* Dropdown for location based search i.e division, district, thana */}
            <ScrollView>
                {users.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                            // let phoneNumber = `tel:${item.tel}`;
                            // Linking.openURL(phoneNumber);
                        }}>
                        <ListItem
                            key={index}
                            bottomDivider
                            containerStyle={{
                                backgroundColor: '#d0e0e3',
                            }}>
                            <Avatar rounded source={{ uri: item?.avatar ? `${FILE_BASE_URL}/${item?.avatar}` : dummyAvatar }} />
                            <ListItem.Content>
                                <ListItem.Title
                                    style={{
                                        fontFamily: 'Ubuntu-Bold',
                                        color: '#000',
                                    }}>
                                    {item.name}
                                </ListItem.Title>
                                <ListItem.Subtitle
                                    style={{ color: 'gray', fontFamily: 'Ubuntu-Medium' }}>
                                    {item?.thana}, {item?.district}, {item?.division}
                                </ListItem.Subtitle>
                            </ListItem.Content>

                            <Badge
                                value={item.role}
                                status="primary"
                                badgeStyle={styles.badge}
                                textStyle={styles.badgeText}
                            />
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    )
}

const SearchScreenStack = () => {

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
                name="Search"
                component={Search}
                options={{ title: 'HennaTales' }}
            />
        </Stack.Navigator>
    );
};

export default SearchScreenStack


