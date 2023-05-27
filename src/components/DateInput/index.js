import React, { useMemo } from 'react';
// import { DatePickerAndroid } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { enUS, enCA, ro, it, ptBR } from "date-fns/locale";


import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, ...props }) {

    const dateFormatted = useMemo(
        () => format(date, "dd MMMM yyyy", { locale: enUS }),
        [date],
    );

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        const newSelectedDate = new Date(year, month, day);
        // console.log(year, month, day);
        props.onChange(newSelectedDate);
        // console.log(newSelectedDate);
    };


    function handleOpenPicker() {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
        });
    }

    return (
        <Container>
            <DateButton onPress={handleOpenPicker}>
                <Icon name="event" color="#fff" size={20} />
                <DateText>{dateFormatted}</DateText>
            </DateButton>
        </Container>
    );
}