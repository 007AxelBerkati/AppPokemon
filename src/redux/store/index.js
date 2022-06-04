import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import { pokemonReducer, GlobalReducer } from '../reducer';

const persistConfig = {
  key: 'root',
  // blacklist: ['dataPokemon'],
  storage: AsyncStorage,
};

const rootReducer = {
  dataGlobal: GlobalReducer,
  dataPokemon: pokemonReducer,
};

const configPersist = persistReducer(persistConfig, combineReducers(rootReducer));

export const Store = createStore(
  configPersist,
  applyMiddleware(ReduxThunk, reduxLogger),
);

export const Persistore = persistStore(Store);
