import React, { useMemo } from 'react';
import { DatePickerAndroid } from 'react-native';
import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { enUS, enCA, ro, it, ptBR } from "date-fns/locale";


import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
    const dateFormatted = useMemo(
        () => format(date, "dd MMMM yyyy", { locale: enUS }),
        [date],
    );

    async function handleOpenPicker() {
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'spinner',
            date,
        });

        if (action === DatePickerAndroid.dateSetAction) {
            const selectedDate = new Date(year, month, day);
            onChange(selectedDate);
        }
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