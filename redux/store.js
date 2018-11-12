import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

function timeconv() {

}

const store = createStore(persistedReducer)
const persistor = persistStore(store, null, timeconv())
export { store, persistor }
