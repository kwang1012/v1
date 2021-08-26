import { combineReducers, configureStore, createSerializableStateInvariantMiddleware, isPlain } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import themeReducer from "./theme";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { Iterable } from 'immutable';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ theme: themeReducer }));

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);