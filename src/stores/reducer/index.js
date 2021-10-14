
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import project from './project';
import task from './task'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 2000
};

const reducers = combineReducers({
    project,
    task
});

const persistedReducer = persistReducer(persistConfig, reducers);
export default persistedReducer;