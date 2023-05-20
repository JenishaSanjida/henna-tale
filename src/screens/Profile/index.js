import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Background from '../../components/Background';
import { Container, Hour, HourList } from './styles';
import DateInput from '../../components/DateInput';
import { Title } from 'react-native-paper';
import { format, parseISO, parse } from 'date-fns';

const Stack = createNativeStackNavigator();

const Profile = () => {

    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([
        {
            time: "9:00",
            available: true,
            value: "9:00"
        },
        {
            time: "11:00",
            available: false,
            value: "11:00"
        }
    ]);

    async function handleSelectHour({ value }) {
        console.log(value);
    }

    const formatDate = stringDate => {
        return format(parseISO(stringDate), 'HH:mm');
    };

    return (
        // <View>
        //     <Text>Profile Screen</Text>
        // </View>

        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList
                    data={hours}
                    keyExtractor={item => String(item.time)}
                    renderItem={({ item }) => (
                        <Hour
                            enabled={item.available}
                            onPress={() => handleSelectHour(item)}>
                            <Title>{item.value}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>

    )
}

const ProfileScreenStack = () => {

    const navigation = useNavigation();

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    // fontFamily: 'Ubuntu-Bold',
                    color: '#000',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={handleOpenDrawer} style={{ marginLeft: 10 }}>
                        <FontAwesome name="navicon" style={{ fontSize: 24 }} />
                    </TouchableOpacity>
                ),
                headerLeftContainerStyle: { marginLeft: 10 },
            }}>
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ title: 'HennaTales' }}
            />
        </Stack.Navigator>
    );
};

export default ProfileScreenStack