import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
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

export default function Confirm({ route, navigation }) {

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


    const { date, time, name, avatar } = route.params;


    // const navigation = useNavigation();


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const provider = navigation.getParam('provider');
    // const date = navigation.getParams('date');
    // const time = navigation.getParam('time');

    const dateFormatted = useMemo(
        () => format(date, "dd MMMM yyyy", { locale: enUS }),
        [date],
    );

    // const dateFormatted = useMemo(
    //     () => format(parseISO(date), 'Pp', { locale: enUS }),
    //     [date],
    // );

    async function handleAddAppointment() {
        // setLoading(true);
        setError(null);

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
                        uri: avatar,
                    }}
                />

                <Name>{name}</Name>
                <Time>{dateFormatted}</Time>
                <Time>{time}</Time>

                <SubmitButton onPress={handleAddAppointment} loading={loading}>
                    Confirm Appointment
                </SubmitButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Container>
        </Background>
    );
}