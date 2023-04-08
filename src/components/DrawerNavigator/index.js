
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigator from '../BottomNavigator';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

// const MyDrawer = (props) => {
//     return (
//         <View style= {styles.container} >
//         <ScrollView>
//             <TouchableOpacity style={styles.ListItem}>
//                 <View style={styles.listItemInnerContentView}>
//                 <Text style={styles.TextStyles}>My Profile</Text>
//                 </View>
//             </TouchableOpacity>
//             <Spacer height={10}/>
//             <TouchableOpacity style={styles.ListItem}>
//                 <View style={styles.listItemInnerContentView}>
//                 <Text style={styles.TextStyles}>Payment Receive Status</Text>
//                 </View>
//             </TouchableOpacity>
//             <Spacer height={10}/>
//             <TouchableOpacity style={styles.ListItem}>
//                 <View style={styles.listItemInnerContentView}>
//                 <Text style={styles.TextStyles}>My Orders</Text>
//                 </View>
//             </TouchableOpacity>
//             <Spacer height={10}/>
//             <TouchableOpacity style={styles.ListItem}>
//                 <View style={styles.listItemInnerContentView}>
//                 <Text style={styles.TextStyles}>Settings</Text>
//                 </View>
//             </TouchableOpacity>
//             <Spacer height={10}/>
//             <TouchableOpacity style={styles.ListItem}>
//                 <View style={styles.listItemInnerContentView}>
//                 <Text style={styles.TextStyles}>Log out</Text>
//                 </View>
//             </TouchableOpacity>
//         </ScrollView>
//         </View>

//     )
// }

// const styles = StyleSheet.create ({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         padding: 10,
//         },
//     ListItem: {
//         backgroundColor: '#f6f6f6ff',
//         width: '100%',
//         height: 50,
//         paddingHorizontal: 15,
//     },
//     listItemInnerContentView: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     TextStyles: {
//         fontSize: 15,
//         color: '#676767ff',
//         fontWeight: '400',
//     },
// });

// const styles = StyleSheet.create({
//     text: {
//         fontSize: 30,
//         fontFamily: 'Ubuntu-Bold',
//     },
//     iconLabel: {
//         fontFamily: 'Ubuntu-Bold',
//     },
//     lottie: {
//         height: 35,
//         width: 35,
//     },
// });

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