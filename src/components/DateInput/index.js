import React, { useEffect, useMemo } from 'react';
// import { DatePickerAndroid } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { enUS, enCA, ro, it, ptBR } from "date-fns/locale";


import { Container, DateButton, DateText } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../constants/apiConfig';
import { setDesignerSchedules } from '../../store/reducers/userSlice';

export default function DateInput({ date, ...props }) {

    const dispatch = useDispatch();

    const { accessToken, selectedDesigner } = useSelector((state) => state.user);

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 5); // Set maximum date as today + 5 days
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);


    const dateFormatted = useMemo(
        () => format(date, "dd MMMM yyyy", { locale: enUS }),
        [date],
    );

    useEffect(() => {
        getSchedules(dateFormatted);
    }, [dateFormatted]);

    const getSchedules = (selectedDate) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        // Make an API call to store the userlist data
        fetch(`${BASE_URL}/user/get/schedules?userId=${selectedDesigner?._id}&date=${selectedDate}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // Handle the API response here
                console.log('Schedules successful', data);
                // Perform any necessary actions after getting user list
                if (data?.error) {
                    dispatch(setDesignerSchedules(null));
                }
                else {
                    dispatch(setDesignerSchedules(data?.schedule));
                }

            })
            .catch(error => {
                console.error('Schedules failed', error);
                // Handle the error case
            });
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();
        const newSelectedDate = new Date(year, month, day);
        // console.log(year, month, day);
        props.onChange(newSelectedDate);
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        getSchedules(formattedDate);
        // console.log(newSelectedDate);
    };


    function handleOpenPicker() {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            minimumDate: tomorrow, // Set minimum date as tomorrow
            maximumDate: maxDate // Set maximum date as today + 5 days
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