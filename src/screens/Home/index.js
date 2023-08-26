import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, ScrollView, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Post from '../../components/ScreenComponents/post';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyOrder from '../MyOrders';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import Confirm from '../NewAppointment/Confirm';
import DesignerProfile from '../DesignerProfile';
import SelectDateTime from '../NewAppointment/SelectDateTime';
import { BASE_URL, FILE_BASE_URL } from '../../constants/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { createDynamicAsyncThunk } from '../../store/reducers/apiSlice';
import { setPaginationDetails, setSelectedDesigner, setUserList } from '../../store/reducers/userSlice';
import { dummyAvatar, dummyPicture } from '../../constants/others';
import Login from '../Login';

const Stack = createNativeStackNavigator();

const UserCard = ({ currentUserEmail, loggedInUserEmail, avatar, picture, name, onPressViewProfile, onPressBookAppointment, currentUserRole,
    loggedInUserRole }) => (

    <View style={styles.cardContainer}>

        <View style={styles.headerContainer}>
            {
                avatar && avatar != "" ?
                    <Image source={{ uri: `${FILE_BASE_URL}/${avatar}` }} style={styles.avatar} /> :
                    <Image source={{ uri: dummyAvatar }} style={styles.avatar} />
            }
            <Text style={styles.name}>{name}</Text>
        </View>

        <Image source={{ uri: picture }} style={styles.picture} />

        <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={onPressViewProfile}>
                <Icon name="person" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: ((currentUserEmail == loggedInUserEmail) || (currentUserRole == loggedInUserRole) || (loggedInUserRole == "designer")) ? '#56799c' : '#2c3e50' }]} onPress={onPressBookAppointment} disabled={(currentUserEmail == loggedInUserEmail) || (currentUserRole == loggedInUserRole) || (loggedInUserRole == "designer") ? true : false}>
                <Icon name="calendar" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>

        </View>

    </View>
);

const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [users, setUsers] = useState([]);

    const { accessToken, userList, paginationDetails, loggedInUserDetail } = useSelector(state => state.user);

    const dispatch = useDispatch();

    // const [users, setUsers] = useState([
    //     {
    //         id: 1,
    //         avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    //         picture: 'https://picsum.photos/200/300?random',
    //         name: 'John Doe',
    //     },
    //     {
    //         id: 2,
    //         avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
    //         picture: 'https://picsum.photos/200/300?random',
    //         name: 'Jane Smith',
    //     },
    //     // Add more users as needed
    // ]);

    // getting designer list
    useEffect(() => {

        if (accessToken) {

            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `${accessToken}`,
                    'Content-Type': 'application/json',
                },
            };
            // Make an API call to store the userlist data
            fetch(`${BASE_URL}/user/list?page=1&size=10`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the API response here
                    console.log('Userlist successful', data);
                    // Perform any necessary actions after getting user list
                    dispatch(setUserList(data?.data));
                    dispatch(setPaginationDetails(data?.meta));
                    setUsers(data?.data);
                    setPagination(data?.meta);

                })
                .catch(error => {
                    console.error('Userlist failed', error);
                    // Handle the error case
                });
        }

    }, []);

    const handleViewProfile = (user) => {
        console.log('View Profile:', user.name);
        dispatch(setSelectedDesigner(user));
        navigation.navigate('Designer');
        // Handle view profile event
    };

    const handleBookAppointment = (user) => {
        console.log('Book Appointment:', user.name);
        dispatch(setSelectedDesigner(user));
        navigation.navigate('SelectDateTIme', { name: user.name, avatar: user?.avatar ? user?.avatar : dummyAvatar, userDetail: user });
        // Handle book appointment event
    };

    const renderUserCard = ({ item }) => (
        <UserCard
            currentUserEmail={item?.email}
            loggedInUserEmail={loggedInUserDetail?.email}
            currentUserRole={item?.role}
            loggedInUserRole={loggedInUserDetail?.role}
            avatar={item?.avatar && item?.avatar != "" ? item?.avatar : ""}
            picture={item?.picture ? item?.picture : dummyPicture}
            name={item?.name}
            onPressViewProfile={() => handleViewProfile(item)}
            onPressBookAppointment={() => handleBookAppointment(item)}
        />
    );

    const renderItemSeparator = () => <View style={styles.separator} />;

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#000000" />
            </View>
        );
    };

    const loadMoreUsers = async () => {
        if (loading || !pagination || !pagination.nextPage) {
            return;
        }

        setLoading(true);

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(`${BASE_URL}/user/list?page=${pagination.nextPage}&size=10`, requestOptions);
            const data = await response.json();
            dispatch(setUserList(data?.data));
            dispatch(setPaginationDetails(data?.meta));
            setUsers((prevUsers) => [...prevUsers, ...data?.data]);
            setPagination(data?.meta);
        } catch (error) {
            console.error('Error:', error);
        }

        setLoading(false);
    };

    const handleEndReached = () => {
        loadMoreUsers();
    };


    return (
        <FlatList
            data={users}
            renderItem={renderUserCard}
            ItemSeparatorComponent={renderItemSeparator}
            ListFooterComponent={renderFooter}
            keyExtractor={(item) => item?._id.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5} // Adjust as needed
        />
    );
    // return (
    //     <View style={{ backgroundColor: 'white', height: '100%' }}>
    //         <StatusBar backgroundColor="white" barStyle="dark-content" animated={true} />
    //         <View

    //             style={{
    //                 justifyContent: 'space-between',
    //                 flexDirection: 'row',
    //                 paddingHorizontal: 15,
    //                 alignItems: 'center',
    //             }}>

    //             {/* 
    //             <TouchableOpacity onPress={() => {
    //                 // navigation.openDrawer();
    //             }}>

    //                 <FontAwesome name="navicon" style={{ fontSize: 24 }} />
    //             </TouchableOpacity> */}
    //             <Text style={{ fontFamily: "Lobster-Regular", fontSize: 25, fontWeight: '500' }}>

    //             </Text>
    //             <Feather name="navigation" style={{ fontSize: 24 }} />
    //         </View>

    //         <ScrollView>
    //             <Post />
    //         </ScrollView>

    //     </View>
    // );
};

const HomeScreenStack = () => {

    const navigation = useNavigation();

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };

    const goBack = () => {
        const popAction = StackActions.pop(1);
        navigation.dispatch(popAction);
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
                name="Home"
                component={Home}
                options={{ title: 'HennaTales' }}
            />
            <Stack.Screen
                name="SelectDateTIme"
                component={SelectDateTime}
            />
            <Stack.Screen
                name="ConfirmScreen"
                component={Confirm}
                options={{
                    title: "Confirm Appointment"
                }}
            />
            <Stack.Screen
                name="MyOrder"
                component={MyOrder}

                options={{
                    headerTitleAlign: 'left',
                    headerTintColor: '#fff',
                    headerLeft: () => (
                        <TouchableOpacity onPress={goBack} style={{ marginLeft: 0 }}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </TouchableOpacity>
                    ),
                    tabBarVisible: false, // This line hides the bottom tab bar
                }}
            />
            <Stack.Screen
                name="Designer"
                component={DesignerProfile}
                options={{
                    title: "Designer",
                    headerTitleAlign: 'left',
                    headerTintColor: '#fff',
                    headerLeft: () => (
                        <TouchableOpacity onPress={goBack} style={{ marginLeft: 0 }}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </TouchableOpacity>
                    ),
                    // headerSh
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    );
};

export default HomeScreenStack