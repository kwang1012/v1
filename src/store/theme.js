import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'light'
    },
    reducers: {
        dark: state => {
            state.value = 'dark';
        },
        light: state => {
            state.value = 'light';
        }
    }
});

export const { dark, light } = themeSlice.actions;

export default themeSlice.reducer;