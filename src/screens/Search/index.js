import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native'

import UserList from '../../constants/userList';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Ionicons';

const Search = () => {

    const [users, setUsers] = useState(UserList);
    const [data, setData] = useState(UserList);
    const [search, setSearch] = useState('');

    const handleSearch = text => {

        setSearch(text);
        const filteredList = data.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase()),
        );
        setUsers(filteredList);
    };


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#d0e0e3',
            }}>
            <SearchBar
                placeholder="Search"
                onChangeText={handleSearch}
                value={search}
                containerStyle={{
                    backgroundColor: '#d0e0e3',

                }}
                inputContainerStyle={{
                    backgroundColor: '#d0e0e3',
                }}
                inputStyle={{
                    color: '#000',
                    fontFamily: 'Ubuntu-Medium',
                }}
            />
            <ScrollView>
                {users.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                            // let phoneNumber = `tel:${item.tel}`;
                            // Linking.openURL(phoneNumber);
                        }}>
                        <ListItem
                            key={index}
                            bottomDivider
                            containerStyle={{
                                backgroundColor: '#d0e0e3',
                            }}>
                            <Avatar rounded source={{ uri: item.profileImg }} />
                            <ListItem.Content>
                                <ListItem.Title
                                    style={{
                                        fontFamily: 'Ubuntu-Bold',
                                        color: '#000',
                                    }}>
                                    {item.name}
                                </ListItem.Title>
                                <ListItem.Subtitle
                                    style={{ color: 'gray', fontFamily: 'Ubuntu-Medium' }}>
                                    {item.address}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    )
}
export default Search


