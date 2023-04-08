import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Divider } from 'react-native-paper';

import { styles } from './styles';


const CustomDrawerContent = ({ navigation }) => {

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
                            uri: 'https://randomuser.me/api/portraits/men/75.jpg',
                        }}
                    />
                </View>
                <View style={styles.avatarContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: '#000' }]}>
                            Karim
                        </Text>
                        <Text style={[styles.caption, { color: '#000' }]}>
                            Change the description here
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
                    <DrawerItem
                        label="My Profile"
                        labelStyle={{ fontFamily: 'Ubuntu-Bold', color: '#000' }}
                        onPress={() => navigation.navigate('ProfileScreenStack')}
                        icon={({ color, size }) => (
                            <Icon name="map" color={'#000'} size={24} />
                        )}
                    />
                    <DrawerItem
                        label="My Orders"
                        labelStyle={{ fontFamily: 'Ubuntu-Bold', color: '#000' }}
                        onPress={() => navigation.navigate('SearchScreenStack')}
                        icon={({ color, size }) => (
                            <Icon name="globe" color={'#000'} size={24} />
                        )}
                    />
                    <DrawerItem
                        label="Settings"
                        labelStyle={{ fontFamily: 'Ubuntu-Bold', color: '#000' }}
                        onPress={() => navigation.navigate('HomeScreenStack')}
                        icon={({ color, size }) => (
                            <Icon name="medkit" color={'#000'} size={24} />
                        )}
                    />
                </View>
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: '#fff' }]}>
                </Text>
                <TouchableOpacity style={styles.ListItem} onPress={() => {
                    console.log("Logout clicked...");
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
