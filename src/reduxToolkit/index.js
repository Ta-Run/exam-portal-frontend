import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import localStorage from 'redux-persist/es/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Admin Imports
import adminAuthReducer from "./slice/adminAuthSlice";
import contentManagementReducer from "./slice/contentManagementSlice";
// Clients Imports
import clientAuthReducer from "./slice/clientAuthSlice";
import userManagementReducer from "./slice/userManagementSlice";
import assessmentReducer from "./slice/assessmentSlice";
// Spoc person Imports
import spocPersonAuthReducer from "./slice/spocPersonAuthSlice";
// Child user Imports
import childUserAuthReducer from "./slice/childUserAuthSlice";
//test reducer import 
import testMoudleReducer from './slice/testModuleSlice';
//Analytics Record Reducer Import
import AnalyticsReducer from './slice/analyticsRecordSlice'


//UploadTestDocSlice
import UploadTestDocReducer from './slice/uploadTestDocSlice'

const getConfig = (key, whitelist) => {
    const persistConfig = {
        key: key,
        storage: localStorage,
        whitelist
    }
    return persistConfig;
}

const reducer = combineReducers({
    // Admin
    admin: persistReducer(getConfig("admin", ["admin"]), adminAuthReducer),
    contentManagement: contentManagementReducer,
    // Client
    client: persistReducer(getConfig("client", ["client"]), clientAuthReducer),
    userManagement: userManagementReducer,
    assessment: assessmentReducer,
    // Spoc Person
    spocPerson: persistReducer(getConfig("spocPerson", ["spocPerson"]), spocPersonAuthReducer),
    // Child User
    childUser: persistReducer(getConfig("childUser", ["childUser"]), childUserAuthReducer),
    // Test Attempt
    testModule: persistReducer(getConfig("childUser", ["childUser"]), testMoudleReducer),

    // Analytics Record Reducer
    AnalyticsMangement: persistReducer(getConfig("childUser", ["childUser"]), AnalyticsReducer),
    //UploadTestDocSlice
    UploadTestDocument: persistReducer(getConfig("childUser", ["childUser"]), UploadTestDocReducer)
})



const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store);
export default store;