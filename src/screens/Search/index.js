import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from '../../constants/userList';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL, BASE_URL_PLACE } from '../../constants/apiConfig';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createDynamicAsyncThunk } from '../../store/reducers/apiSlice';


// import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const Search = () => {


    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector(state => state.api);

    const [users, setUsers] = useState(UserList);
    const [userData, setUserData] = useState(UserList);
    const [search, setSearch] = useState('');

    const handleSearch = text => {

        setSearch(text);
        const filteredList = userData.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase()),
        );
        setUsers(filteredList);
    };

    /**
     * All actions for handling division, district and thana selection
     */

    const [division, setDivision] = useState('');
    const [dropdown2Value, setDropdown2Value] = useState('');
    const [dropdown3Value, setDropdown3Value] = useState('');

    const [dropdown1Options, setDropdown1Options] = useState([]);
    const [dropdown2Options, setDropdown2Options] = useState([]);
    const [dropdown3Options, setDropdown3Options] = useState([]);

    useEffect(() => {
        fetchDropdown1Options();
    }, []);

    useEffect(() => {
        console.log("division");
        console.log(division);
        if (division !== '') {
            fetchDropdown2Options();
            setDropdown3Options([]);
        }
    }, [division]);

    useEffect(() => {
        if (dropdown2Value !== '') {
            fetchDropdown3Options();
        }
    }, [dropdown2Value]);

    useEffect(() => {
        console.log("API Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(data);


        if (data?.data?.length > 0 && data?.endpoint == 'by-district') {
            setDropdown3Options(data?.data);
        }

        else if (data?.data?.length > 0 && data?.endpoint == 'by-division') {
            setDropdown2Options(data?.data);
        }

        else if (data?.data?.length > 0 && data?.endpoint == 'all-places') {
            setDropdown1Options(data?.data);
        }
    }, [data]);

    const fetchDropdown1Options = async () => {
        try {
            dispatch(createDynamicAsyncThunk(`${BASE_URL}/api/place/divisions`));

        } catch (error) {
            console.error('Error fetching dropdown 1 options:', error);
        }
    };

    const fetchDropdown2Options = async () => {
        try {
            dispatch(createDynamicAsyncThunk(`${BASE_URL}/api/place/${division}`));

            // const response = await fetch(
            //     `${BASE_URL_PLACE + division}`
            // );
            // const data = await response.json();
            // setDropdown2Options(data?.data);
        } catch (error) {
            console.error('Error fetching dropdown 2 options:', error);
        }
    };

    const fetchDropdown3Options = async () => {
        try {

            dispatch(createDynamicAsyncThunk(`${BASE_URL}/api/place/${division}/${dropdown2Value}`));

            // const response = await fetch(
            //     `${BASE_URL_PLACE + division + "/" + dropdown2Value}`
            // );
            // const data = await response.json();
            // setDropdown3Options(data?.data);
        } catch (error) {
            console.error('Error fetching dropdown 3 options:', error);
        }
    };



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

            {/* Dropdown for location based search i.e division, district, thana */}
            <View>
                <Picker
                    selectedValue={division}
                    onValueChange={(value) => setDivision(value)}
                    mode='dropdown'
                >
                    <Picker.Item label="Select Division" value="" />
                    {dropdown1Options.map((option) => (
                        <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>

                <Picker
                    selectedValue={dropdown2Value}
                    onValueChange={(value) => setDropdown2Value(value)}
                    mode='dropdown'
                >
                    <Picker.Item label="Select District" value="" />
                    {dropdown2Options.map((option) => (
                        <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>

                <Picker
                    selectedValue={dropdown3Value}
                    onValueChange={(value) => setDropdown3Value(value)}
                    mode='dropdown'
                >
                    <Picker.Item label="Select Thana" value="" />
                    {dropdown3Options.map((option) => (
                        <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>
            </View>
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
                            <Avatar rounded source={{ uri: item.profileImg }} />
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
                                    {item.address}
                                </ListItem.Subtitle>
                            </ListItem.Content>
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


