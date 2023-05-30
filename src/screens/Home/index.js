import React, { useState } from 'react'
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

const Stack = createNativeStackNavigator();

const UserCard = ({ avatar, picture, name, onPressViewProfile, onPressBookAppointment }) => (

    <View style={styles.cardContainer}>

        <View style={styles.headerContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
        </View>

        <Image source={{ uri: picture }} style={styles.picture} />

        <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={onPressViewProfile}>
                <Icon name="person" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onPressBookAppointment}>
                <Icon name="calendar" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>

        </View>

    </View>
);

const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([
        {
            id: 1,
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
            picture: 'https://picsum.photos/200/300?random',
            name: 'John Doe',
        },
        {
            id: 2,
            avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
            picture: 'https://picsum.photos/200/300?random',
            name: 'Jane Smith',
        },
        // Add more users as needed
    ]);

    const handleViewProfile = (user) => {
        console.log('View Profile:', user.name);
        navigation.navigate('Designer', { name: user.name, avatar: user.avatar });
        // Handle view profile event
    };

    const handleBookAppointment = (user) => {
        console.log('Book Appointment:', user.name);
        navigation.navigate('SelectDateTIme', { name: user.name, avatar: user.avatar });
        // Handle book appointment event
    };

    const renderUserCard = ({ item }) => (
        <UserCard
            avatar={item.avatar}
            picture={item.picture}
            name={item.name}
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

    return (
        <FlatList
            data={users}
            renderItem={renderUserCard}
            ItemSeparatorComponent={renderItemSeparator}
            ListFooterComponent={renderFooter}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
                // Fetch more users or handle lazy loading
                setLoading(true);
            }}
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
                    // headerShown: true,

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
        </Stack.Navigator>
    );
};

export default HomeScreenStack