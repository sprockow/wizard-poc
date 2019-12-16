import { configureStore } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Reducer/Actions
import databaseSlice from './database';
import { waitForDatabaseProvisioningRequests } from './database';
import { spawn } from 'redux-saga/effects';

const initialState = {};

export default function initializeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const reducer = combineReducers({
    database: databaseSlice.reducer,
  });

  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(function*() {
    yield spawn(waitForDatabaseProvisioningRequests);
  });

  return store;
}
