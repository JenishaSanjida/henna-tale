import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { enUS } from "date-fns/locale";

import Background from '../../../components/Background';

import {
    Container,
    Avatar,
    Name,
    Time,
    SubmitButton,
    ErrorMessage,
} from './styles';
import { BASE_URL, FILE_BASE_URL } from '../../../constants/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { dummyAvatar } from '../../../constants/others';

export default function Confirm({ route, navigation }) {


    const dispatch = useDispatch();
    const { loggedInUserDetail, accessToken, selectedDesigner } = useSelector(state => state.user);
    const [phoneNumber, onChangePhoneNumber] = useState('');
    const [address, onChangeAddress] = useState('');


    navigation.setOptions({

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


    const { date, time, name, avatar, formattedDate } = route.params;


    // const navigation = useNavigation();

    useEffect(() => {
        console.log("date and time...");
        console.log(formattedDate);
        console.log(time);
    }, [time, formattedDate]);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const provider = navigation.getParam('provider');
    // const date = navigation.getParams('date');
    // const time = navigation.getParam('time');

    const dateFormatted = useMemo(
        () => format(date, "dd MMMM yyyy", { locale: enUS }),
        [date],
    );

    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }


    // const dateFormatted = useMemo(
    //     () => format(parseISO(date), 'Pp', { locale: enUS }),
    //     [date],
    // );

    async function handleAddAppointment() {
        // setLoading(true);
        setError(null);

        // Prepare the registration data
        const appointmentData = {
            customerId: loggedInUserDetail?._id,
            designerId: selectedDesigner?._id,
            date: formattedDate,
            time: time,
            address: address,
            phone: phoneNumber
        };


        // Calling schedule save API
        fetch(`${BASE_URL}/appointment/save`, {
            method: 'POST',
            headers: {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the API response here
                console.log('Appointment save successful', data);

                if (data?.error) {
                    showToastWithGravity(data?.error);
                }

                else {
                    // Perform any necessary actions after successful appointment
                    showToastWithGravity(data?.message);
                    // dispatch(setLoggedInUserDetail(data?.user));
                }

            })
            .catch(error => {
                console.error('Appointment save failed', error);
                showToastWithGravity('Something went wrong!');
                // Handle the error case
            });

        // try {
        //     await api.post('appointments', {
        //         provider_id: provider.id,
        //         date,
        //     });

        //     setLoading(false);
        //     navigation.navigate('Dashboard');
        // } catch (err) {
        //     setError('Erro ao marcar agendamento, tente mais tarde');
        // } finally {
        //     setLoading(false);
        // }
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: avatar ? `${FILE_BASE_URL}/${avatar}` : dummyAvatar,
                    }}
                />

                <Name>{name}</Name>
                <Time>{dateFormatted}</Time>
                <Time>{time}</Time>

                <TextInput
                    editable
                    placeholder='Write your correct phone number'
                    style={{ padding: 5, backgroundColor: 'white', width: 300, marginTop: 20, borderRadius: 5 }}
                    onChangeText={text => onChangePhoneNumber(text)}
                    value={phoneNumber}
                />
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    // maxLength={40}
                    placeholder='Write your detail address'
                    onChangeText={text => onChangeAddress(text)}
                    value={address}
                    style={{ padding: 5, backgroundColor: 'white', width: 300, marginTop: 20, borderRadius: 5 }}
                />

                {
                    address && phoneNumber && <SubmitButton onPress={handleAddAppointment} loading={loading}>
                        Confirm Appointment
                    </SubmitButton>
                }
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Container>
        </Background>
    );
}