import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenStack from "../../screens/Home";
import Search from '../../screens/Search';
import Activity from '../../screens/Activity';
import Profile from '../../screens/Profile';
import Ionic from "react-native-vector-icons/Ionicons";
import MoreOptions from "../../screens/MoreOptions";

const BottomNavigator = () => {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 50
                },

                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;

                    if (route.name === "HomeScreenStack") {
                        iconName = focused ? "home-sharp" : "home-outline";
                        size = focused ? size + 8 : size + 2;
                    }
                    else if (route.name === "Search") {
                        iconName = focused ? "search" : "ios-search-outline"
                    }
                    else if (route.name === "Profile") {
                        iconName = focused ? "ios-person-circle" : "ios-person-outline"
                    }
                    else if (route.name === "Activity") {
                        iconName = focused ? "ios-heart" : "ios-heart-outline"
                    }
                    else if (route.name === "MoreOptions") {
                        iconName = focused ? "menu-outline" : "menu-outline"
                    }

                    return <Ionic name={iconName} size={size} color={'#000'} />
                }

            })}>

            <Tab.Screen name="HomeScreenStack" component={HomeScreenStack} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Activity" component={Activity} />
            <Tab.Screen name="MoreOptions" component={MoreOptions} />

        </Tab.Navigator>


        // <BottomTabScreen />
        // <NavigationContainer>
        //     <Stack.Navigator
        //         screenOptions={{
        //             headerShown: false
        //         }}>
        //         <Stack.Screen name="Bottom" component={BottomTabScreen} />
        //     </Stack.Navigator>
        // </NavigationContainer>
    )
}

export default BottomNavigator;