import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenStack from "../../screens/Home";
import SearchScreenStack from '../../screens/Search';
import ActivityScreenStack from '../../screens/Activity';
import ProfileScreenStack from '../../screens/Profile';
import Ionic from "react-native-vector-icons/Ionicons";


const BottomNavigator = () => {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 50,
                    display: route.name === 'MyOrder' ? 'none' : 'flex'
                },

                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;

                    if (route.name === "HomeScreenStack") {
                        iconName = focused ? "home-sharp" : "home-outline";
                        size = focused ? size + 8 : size + 2;
                    }
                    else if (route.name === "SearchScreenStack") {
                        iconName = focused ? "search" : "ios-search-outline"
                    }
                    else if (route.name === "ProfileScreenStack") {
                        iconName = focused ? "ios-person-circle" : "ios-person-outline"
                    }
                    else if (route.name === "ActivityScreenStack") {
                        iconName = focused ? "ios-heart" : "ios-heart-outline"
                    }


                    return <Ionic name={iconName} size={size} color={'#000'} />
                }

            })}>

            <Tab.Screen name="HomeScreenStack" component={HomeScreenStack} />
            <Tab.Screen name="SearchScreenStack" component={SearchScreenStack} />
            <Tab.Screen name="ProfileScreenStack" component={ProfileScreenStack} />
            <Tab.Screen name="ActivityScreenStack" component={ActivityScreenStack} />

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