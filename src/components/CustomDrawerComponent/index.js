import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Divider } from 'react-native-paper';

import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setIsLoggedIn, setLoggedInUserDetail, setPaginationDetails, setSelectedDesigner, setUserList } from '../../store/reducers/userSlice';
import { FILE_BASE_URL } from '../../constants/apiConfig';
import { useNavigation } from '@react-navigation/native';


const CustomDrawerContent = () => {

    const { loggedInUserDetail } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: "#fff",
                },
            ]}>
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Icon name="times" size={24} color={colors.text} />
        </TouchableOpacity> */}
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 /** For IOS only, android is 25 */ }}>
                    <Avatar.Image
                        size={50}
                        source={{
                            uri: loggedInUserDetail?.avatar ? `${FILE_BASE_URL}/${loggedInUserDetail?.avatar}` : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
                        }}
                        imageProps={{ resizeMode: 'contain' }} /*If you want your image to scale*/
                    />
                </View>
                <View style={styles.avatarContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: '#000' }]}>
                            {loggedInUserDetail?.name}
                        </Text>
                        <Text style={[styles.caption, { color: '#000' }]}>
                            {loggedInUserDetail?.email}
                        </Text>
                    </View>
                </View>
            </View>
            <Divider />
            <DrawerContentScrollView>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: '#000' }]}>
                        Main
                    </Text>
                    {/* <DrawerItem
                        label="My Profile"
                        labelStyle={{ fontFamily: 'Ubuntu-Bold', color: '#000' }}
                        onPress={() => {
                            console.log("Go to Profile")
                            // navigation.navigate('Designer');
                        }}
                        icon={({ color, size }) => (
                            <Icon name="map" color={'#000'} size={24} />
                        )}
                    /> */}
                    <DrawerItem
                        label="My Orders"
                        labelStyle={{ fontFamily: 'Ubuntu-Bold', color: '#000' }}
                        onPress={() => {
                            navigation.navigate('HomeScreenStack', { screen: 'MyOrder' });
                        }}
                        icon={({ color, size }) => (
                            <Icon name="globe" color={'#000'} size={24} />
                        )}
                    />
                    {/* <DrawerItem
                        label="Settings"
                        labelStyle={{ fontFamily: 'Ubuntu-Bold', color: '#000' }}
                        onPress={() => navigation.navigate('HomeScreenStack')}
                        icon={({ color, size }) => (
                            <Icon name="medkit" color={'#000'} size={24} />
                        )}
                    /> */}
                </View>
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: '#fff' }]}>
                </Text>
                <TouchableOpacity style={styles.ListItem} onPress={() => {
                    dispatch(setUserList(null));
                    dispatch(setAccessToken(null));
                    dispatch(setLoggedInUserDetail(null));
                    dispatch(setSelectedDesigner(null));
                    dispatch(setPaginationDetails(null));
                    dispatch(setIsLoggedIn(false));
                }}>
                    <View style={styles.listItemInnerContentView}>
                        <Text style={styles.TextStyles}>Log out {' '}</Text>
                        <Icon name="log-out" color={'#000'} size={18} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawerContent;
