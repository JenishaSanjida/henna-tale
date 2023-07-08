import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedDivision: '',
    selectedDistrict: '',
    selectedThana: ''
};

const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        setSelectedDivision: (state, action) => {
            state.selectedDivision = action.payload;
        },
        setSelectedDistrict: (state, action) => {
            state.selectedDistrict = action.payload;
        },
        setSelectedThana: (state, action) => {
            state.selectedThana = action.payload;
        }
    },
});

export const {
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedThana
} = placeSlice.actions;

export default placeSlice.reducer;
