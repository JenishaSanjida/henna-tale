import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { BASE_URL } from '../../constants/apiConfig';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createDynamicAsyncThunk } from '../../store/reducers/apiSlice';
import { setSelectedDistrict, setSelectedDivision, setSelectedThana } from '../../store/reducers/placeSlice';

const PlaceDropdowns = () => {


    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector(state => state.api);

    /**
     * All actions for handling division, district and thana selection
     */

    const [division, setDivision] = useState('');
    const [dropdown2Value, setDropdown2Value] = useState('');
    const [dropdown3Value, setDropdown3Value] = useState('');

    const [dropdown1Options, setDropdown1Options] = useState([]);
    const [dropdown2Options, setDropdown2Options] = useState([]);
    const [dropdown3Options, setDropdown3Options] = useState([]);

    useEffect(() => {
        fetchDropdown1Options();
    }, []);

    useEffect(() => {
        console.log("division");
        console.log(division);
        if (division !== '') {
            // store selected division into the redux store
            dispatch(setSelectedDivision(division));
            dispatch(setSelectedDistrict('')); // reset selected district
            dispatch(setSelectedThana('')); // reset selected thana

            fetchDropdown2Options();
            setDropdown3Options([]);
        }
    }, [division]);

    useEffect(() => {
        if (dropdown2Value !== '') {
            // store selected district into the redux store
            dispatch(setSelectedDistrict(dropdown2Value)); // reset selected district
            dispatch(setSelectedThana('')); // reset selected thana

            fetchDropdown3Options();
        }
    }, [dropdown2Value]);

    useEffect(() => {
        if (dropdown3Value !== '') {
            // store selected thana into the redux store
            dispatch(setSelectedThana(dropdown3Value));
        }
    }, [dropdown3Value]);

    useEffect(() => {
        console.log("API Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(data);


        if (data?.data?.length > 0 && data?.endpoint == 'by-district') {
            setDropdown3Options(data?.data);
        }

        else if (data?.data?.length > 0 && data?.endpoint == 'by-division') {
            setDropdown2Options(data?.data);
        }

        else if (data?.data?.length > 0 && data?.endpoint == 'all-places') {
            setDropdown1Options(data?.data);
        }
    }, [data]);

    const fetchDropdown1Options = async () => {
        try {
            dispatch(createDynamicAsyncThunk(`${BASE_URL}/place/divisions`));

        } catch (error) {
            console.error('Error fetching dropdown 1 options:', error);
        }
    };

    const fetchDropdown2Options = async () => {
        try {
            dispatch(createDynamicAsyncThunk(`${BASE_URL}/place/${division}`));

            // const response = await fetch(
            //     `${BASE_URL_PLACE + division}`
            // );
            // const data = await response.json();
            // setDropdown2Options(data?.data);
        } catch (error) {
            console.error('Error fetching dropdown 2 options:', error);
        }
    };

    const fetchDropdown3Options = async () => {
        try {

            dispatch(createDynamicAsyncThunk(`${BASE_URL}/place/${division}/${dropdown2Value}`));

            // const response = await fetch(
            //     `${BASE_URL_PLACE + division + "/" + dropdown2Value}`
            // );
            // const data = await response.json();
            // setDropdown3Options(data?.data);
        } catch (error) {
            console.error('Error fetching dropdown 3 options:', error);
        }
    };



    return (
        <View
            style={{
                // flex: 1,
                // backgroundColor: '#d0e0e3',
            }}>

            {/* Dropdown for location based search i.e division, district, thana */}
            <View>
                <Picker
                    selectedValue={division}
                    onValueChange={(value) => setDivision(value)}
                    mode='dropdown'
                >
                    <Picker.Item label="Select Division" value="" />
                    {dropdown1Options.map((option) => (
                        <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>

                <Picker
                    selectedValue={dropdown2Value}
                    onValueChange={(value) => setDropdown2Value(value)}
                    mode='dropdown'
                >
                    <Picker.Item label="Select District" value="" />
                    {dropdown2Options.map((option) => (
                        <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>

                <Picker
                    selectedValue={dropdown3Value}
                    onValueChange={(value) => setDropdown3Value(value)}
                    mode='dropdown'
                >
                    <Picker.Item label="Select Thana" value="" />
                    {dropdown3Options.map((option) => (
                        <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    )
}

export default PlaceDropdowns;