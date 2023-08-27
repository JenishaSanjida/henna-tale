import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from '../../../components/Background';
import { Container, Hour, HourList, Title } from './styles';
import DateInput from '../../../components/DateInput';
// import { Title, Button } from 'react-native-paper';
import { format, parseISO, parse } from 'date-fns';
// import Confirm from '../NewAppointment/Confirm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';


const SelectDateTime = ({ route, navigation }) => {

    const { designerSchedules } = useSelector((state) => state.user);

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
    const [hours, setHours] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");

    async function handleSelectHour({ time }) {
        console.log("date and time value");
        console.log(time);
        const formattedDate = format(date, 'yyyy-MM-dd');
        console.log(formattedDate); // Output: yyyy-mm-dd
        setSelectedTime(time);
        navigation.navigate('ConfirmScreen', { date: date, formattedDate: formattedDate, time: time, name: route?.params?.name, avatar: route?.params?.avatar });

    }

    const formatDate = stringDate => {
        return format(parseISO(stringDate), 'HH:mm');
    };

    useEffect(() => {
        if (designerSchedules?.timeSlots) {
            setHours(designerSchedules.timeSlots)
        }
        else {
            setHours([]);
        }
    }, [designerSchedules, date])

    return (
        // <View>
        //     <Text>Profile Screen</Text>
        // </View>

        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList
                    data={hours}
                    keyExtractor={item => String(item?.time)}
                    appointment='appointment'
                    renderItem={({ item }) => (
                        <Hour
                            disabled={item?.isBooked}
                            onPress={() => {
                                if (!item?.isBooked) {
                                    handleSelectHour(item);
                                }
                            }}>
                            <Title>{item?.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>

    )
}

export default SelectDateTime;