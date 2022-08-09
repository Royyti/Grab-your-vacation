import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userSettingsReducer } from './user.reducers';
import { vacationsListReducer } from "./vacations.reducers";
import { apiSlice } from "./apiMiddlewere";


const rootReducer = combineReducers({
    userSettings: userSettingsReducer,
    vacationsList: vacationsListReducer
});



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
