import React, { useState } from 'react';
// import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from '../../../components/Background';
import { Container, Hour, HourList } from './styles';
import DateInput from '../../../components/DateInput';
import { Title, Button } from 'react-native-paper';
import { format, parseISO, parse } from 'date-fns';
// import Confirm from '../NewAppointment/Confirm';
import Icon from 'react-native-vector-icons/MaterialIcons';


const SelectDateTime = ({ route, navigation }) => {

    console.log("navigation");
    console.log(navigation);

    navigation.setOptions({
        title: route?.params?.name,
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTitleStyle: {
            // fontFamily: 'Ubuntu-Bold',
            color: '#000',
        },
        headerTitleAlign: 'left',
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={22} color="#000" />
            </TouchableOpacity>

        ),
        headerLeftContainerStyle: { marginLeft: 10 },
    })

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
        },
        {
            time: "14:00",
            available: true,
            value: "14:00"
        }
    ]);
    const [selectedTime, setSelectedTime] = useState("");

    async function handleSelectHour({ value }) {
        console.log("date and time value");
        console.log(value);
        console.log(date);
        setSelectedTime(value);
        navigation.navigate('ConfirmScreen', { date: date, time: value, name: route?.params?.name, avatar: route?.params?.avatar });

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

export default SelectDateTime;