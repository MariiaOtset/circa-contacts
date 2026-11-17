import {configureStore} from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,PAUSE,PERSIST,PURGE,REGISTER,REHYDRATE} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {authReducer} from "./auth/slice";
import contactsReducer from "./contacts/slice";
import filtersReducer from "./filter/slice";
// Never persist the address book across user sessions: server owns contact data.
// Only the session token persists, and the app retrieves the correct user's contacts.
const persistedAuth=persistReducer({key:"auth",storage,whitelist:["token"]},authReducer);
export const store=configureStore({reducer:{auth:persistedAuth,contacts:contactsReducer,filters:filtersReducer},middleware:getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:{ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]}})});
export const persistor=persistStore(store);
