// import React from 'react';
// import { View, Text } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// // import OptionButtons from "../../components/ToogleBtn/index";


// const Stack = createNativeStackNavigator();

// const MyOrder = (props) => {
//     return (
//         <View>
//             <Text>MyOrder Screen</Text>
//         </View>

//     )
// }


// // const ToogleBtn = (props) => {
// //     return( <div className="App">
// //     <OptionButtons/>
// //   </div>
// //   )
// // }

// export default MyOrder

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Badge } from 'react-native-elements';
import { BASE_URL, FILE_BASE_URL } from '../../constants/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { dummyAvatar } from '../../constants/others';


const MyOrder = () => {

    const [orders, setOrders] = useState([]);

    const { accessToken, userList, paginationDetails, loggedInUserDetail } = useSelector(state => state.user);

    const [pagination, setPagination] = useState(null);

    const dispatch = useDispatch();

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
            fetch(`${BASE_URL}/appointment/list-by-user/${loggedInUserDetail?._id}?role=${loggedInUserDetail?.role}&page=1&size=10`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Handle the API response here
                    console.log('Appointment list successful', data);
                    // Perform any necessary actions after getting user list
                    setOrders(data?.appointments);
                })
                .catch(error => {
                    console.error('Appointment list failed', error);
                    // Handle the error case
                });
        }

    }, []);

    // const orders = [
    //     { id: 1, title: 'Order 1', status: 'Pending', date: '2023-05-28' },
    //     { id: 2, title: 'Order 2', status: 'Processing', date: '2023-05-27' },
    //     { id: 3, title: 'Order 3', status: 'Shipped', date: '2023-05-26' },
    //     { id: 4, title: 'Order 4', status: 'Delivered', date: '2023-05-25' },
    // ];

    const handleOrderPress = (order) => {
        console.log('Order clicked:', order);
        // Implement your desired logic for handling order click here
    };

    return (
        <ScrollView>
            {orders.map((item, index) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handleOrderPress(item)}>
                    <ListItem
                        key={index}
                        bottomDivider
                        containerStyle={styles.listItemContainer}>
                        <Avatar
                            rounded
                            source={{
                                uri: loggedInUserDetail?.role == 'designer' ?
                                    (item?.customer?.avatar != "" ? `${FILE_BASE_URL}/${item?.customer?.avatar}` : dummyAvatar) :
                                    (item?.designer?.avatar != "" ? `${FILE_BASE_URL}/${item?.designer?.avatar}` : dummyAvatar)
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={styles.title}>
                                {loggedInUserDetail?.role == 'designer' ? item?.customer?.name : item?.designer?.name}
                            </ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitle}>
                                {getFormattedDate(item.date)} {', '} {item?.time}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <Badge
                            value={item.status}
                            status={getStatusBadgeStatus(item.status)}
                            badgeStyle={styles.badge}
                            textStyle={styles.badgeText}
                        />
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const getFormattedDate = (rawDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(rawDate));
}

const getStatusBadgeStatus = (status) => {
    switch (status) {
        case 'Pending':
            return 'warning';
        case 'Processing':
            return 'primary';
        case 'Shipped':
            return 'success';
        case 'Delivered':
            return 'success';
        default:
            return 'primary';
    }
};

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: '#d0e0e3',
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        color: '#000',
    },
    subtitle: {
        color: 'gray',
        fontFamily: 'Ubuntu-Medium',
    },
    badge: {
        paddingHorizontal: 5,
        paddingVertical: 0,
        borderRadius: 20,
        marginRight: -30
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default MyOrder;
