import React from 'react'
import { View, Text, StatusBar, ScrollView } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Post from '../../components/ScreenComponents/post';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyOrder from '../MyOrders';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" animated={true} />
            <View

                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>

                {/* 
                <TouchableOpacity onPress={() => {
                    // navigation.openDrawer();
                }}>

                    <FontAwesome name="navicon" style={{ fontSize: 24 }} />
                </TouchableOpacity> */}
                <Text style={{ fontFamily: "Lobster-Regular", fontSize: 25, fontWeight: '500' }}>

                </Text>
                <Feather name="navigation" style={{ fontSize: 24 }} />
            </View>

            <ScrollView>
                <Post />
            </ScrollView>

        </View>
    );
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
        </Stack.Navigator>
    );
};

export default HomeScreenStack