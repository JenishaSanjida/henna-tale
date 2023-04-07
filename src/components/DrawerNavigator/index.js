
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigator from '../BottomNavigator';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: 'Ubuntu-Bold',
    },
    iconLabel: {
        fontFamily: 'Ubuntu-Bold',
    },
    lottie: {
        height: 35,
        width: 35,
    },
});

const MyDrawer = () => {

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="MyDrawer"
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#fff',
                    },
                }}>
                <Drawer.Screen name="MyDrawer" component={BottomNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MyDrawer;