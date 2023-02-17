import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Spacer from '../../screenComponents/Spacer';

const MoreOptions = (props) => {
    return (
        <View style= {styles.container} >
        <ScrollView>
            <TouchableOpacity style={styles.ListItem}>
                <View style={styles.listItemInnerContentView}>
                <Text style={styles.TextStyles}>My Profile</Text>
                </View>
            </TouchableOpacity>
            <Spacer height={10}/>
            <TouchableOpacity style={styles.ListItem}>
                <View style={styles.listItemInnerContentView}>
                <Text style={styles.TextStyles}>Payment Receive Status</Text>
                </View>
            </TouchableOpacity>
            <Spacer height={10}/>
            <TouchableOpacity style={styles.ListItem}>
                <View style={styles.listItemInnerContentView}>
                <Text style={styles.TextStyles}>My Orders</Text>
                </View>
            </TouchableOpacity>
            <Spacer height={10}/>
            <TouchableOpacity style={styles.ListItem}>
                <View style={styles.listItemInnerContentView}>
                <Text style={styles.TextStyles}>Settings</Text>
                </View>
            </TouchableOpacity>
            <Spacer height={10}/>
            <TouchableOpacity style={styles.ListItem}>
                <View style={styles.listItemInnerContentView}>
                <Text style={styles.TextStyles}>Log out</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
        </View>

    )
}
export default MoreOptions;
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        },
    ListItem: {
        backgroundColor: '#f6f6f6ff',
        width: '100%',
        height: 50,
        paddingHorizontal: 15,
    },
    listItemInnerContentView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TextStyles: {
        fontSize: 15,
        color: '#676767ff',
        fontWeight: '400',
    },
});