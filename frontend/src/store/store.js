import {configureStore} from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import {persistReducer,persistStore} from "redux-persist";
import {combineReducers} from "redux";
import authReducer from "./Slices/authSlice"

const persistConfig={
    key:"root",
    storage:storageSession,
    
}

const rootReducer=combineReducers({
    auth:persistReducer(persistConfig,authReducer)
    
})

export const store =configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
    
})

export const persistor=persistStore(store);

export default store;