import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import themeReducer from "./theme";


export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);