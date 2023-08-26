import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Avatar, ListItem, Badge, Button, Icon } from 'react-native-elements';
import { BASE_URL, FILE_BASE_URL } from '../../constants/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { dummyAvatar } from '../../constants/others';
import { styles } from './style';

const MyOrder = () => {

    const [orders, setOrders] = useState([]);

    const { accessToken, userList, paginationDetails, loggedInUserDetail } = useSelector(state => state.user);

    const [pagination, setPagination] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handleOrderPress = (order) => {
        console.log('Order clicked:', order);
        setSelectedOrder(order);
        setIsModalVisible(true);
        // Implement your desired logic for handling order click here
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <>
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

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(!isModalVisible);
                    }}>
                    {selectedOrder &&
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalHeaderText}>Appointment Details</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={toggleModal}
                                >
                                    <Icon name='times' type='font-awesome' size={24} />
                                </TouchableOpacity>
                                <Text style={styles.orderDetailText}>
                                    Customer: {selectedOrder?.customer?.name}
                                </Text>
                                <Text style={styles.orderDetailText}>
                                    Designer: {selectedOrder?.designer?.name}
                                </Text>
                                <Text style={styles.orderDetailText}>Date: {getFormattedDate(selectedOrder.date)}</Text>
                                <Text style={styles.orderDetailText}>Time: {selectedOrder.time}</Text>
                                <Text style={styles.orderDetailText}>Status: {selectedOrder.status}</Text>
                                <Text style={styles.orderDetailText}>Phone: {selectedOrder?.phone}</Text>
                                <Text style={styles.orderDetailText}>Address: {selectedOrder?.address}</Text>
                            </View>
                        </View>
                    }
                </Modal>
            </View>
        </>
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

export default MyOrder;
