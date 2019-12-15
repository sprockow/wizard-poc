import { configureStore } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Reducer/Actions
import databaseSlice from './database';

const initialState = {
  database: {
    databases: [
      {
        db_instance_type: 'startup',
        location: 'europe-west-1',
        read_units: 5,
        write_units: 5,
        name: 'foo',
        keyspace: 'foo',
        username: 'foo',
        password: 'pass',
        password_confirm: 'pass',
        draft: true,
        clientId: 'b2f8326f-6e4d-4fc2-b850-1f3f3ca08f96',
      },
    ],
  },
};

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

  return store;
}
