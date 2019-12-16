import { createSlice } from 'redux-starter-kit';
import { put, take, delay, spawn } from 'redux-saga/effects';
import { v4 as createId } from 'uuid';

const slice = createSlice({
  name: 'database',
  initialState: {
    databases: [],
  },
  reducers: {
    createDatabaseDraft: (state, action) => {
      const { clientId, databaseInfo } = action.payload;

      const newDatabase = {
        ...databaseInfo,
        draft: true,
        clientId,
      };

      // redux start kit allows us to "mutate" state objects using immer, a library that uses proxy's to stage changes.
      state.databases.push(newDatabase);
    },
    updateDatabaseDraft: (state, action) => {
      const { clientId, databaseInfo } = action.payload;

      const newDatabase = state.databases.find(
        database => database.clientId === clientId,
      );

      if (newDatabase) {
        Object.assign(newDatabase, databaseInfo);
      }
    },
    requestDatabaseProvisioning: (state, action) => {
      const { clientId } = action.payload;

      const newDatabase = state.databases.find(
        database => database.clientId === clientId,
      );

      if (newDatabase) {
        newDatabase.draft = false;
        newDatabase.provisioningInProcess = true;
        newDatabase.provisioningLogs = [];
      }
    },
    updateProvisioningLogs: (state, action) => {
      const { clientId, log } = action.payload;

      const newDatabase = state.databases.find(
        database => database.clientId === clientId,
      );

      if (newDatabase) {
        newDatabase.provisioningLogs.push(log);
      }
    },
    markDatabaseAsProvisioned: (state, action) => {
      const { clientId, id } = action.payload;

      const newDatabase = state.databases.find(
        database => database.clientId === clientId,
      );

      if (newDatabase) {
        newDatabase.draft = false;
        newDatabase.id = id;
        newDatabase.provisioningInProcess = false;
      }
    },
    loadExistingDatabasesFromAccount: (state, action) => {
      const { databases } = action.payload;
      state.databases = databases.map(database => ({
        ...database,
        id: database.clientId,
      }));
    },
  },
});

export function* waitForDatabaseProvisioningRequests() {
  while (true) {
    const {
      payload: { clientId },
    } = yield take(slice.actions.requestDatabaseProvisioning.type);

    yield delay(1000);

    yield put(
      slice.actions.updateProvisioningLogs({
        clientId,
        log: 'Provisioning started...',
      }),
    );

    yield delay(2000);

    yield put(
      slice.actions.updateProvisioningLogs({
        clientId,
        log: '1st cluster online',
      }),
    );

    yield delay(2000);

    yield put(
      slice.actions.updateProvisioningLogs({
        clientId,
        log: '2nd cluster online',
      }),
    );

    yield delay(2000);

    yield put(
      slice.actions.updateProvisioningLogs({
        clientId,
        log: 'User provisioned',
      }),
    );

    yield delay(2000);

    yield put(
      slice.actions.updateProvisioningLogs({
        clientId,
        log: 'Assigning network capacity',
      }),
    );

    yield delay(4000);

    yield put(
      slice.actions.markDatabaseAsProvisioned({
        clientId,
        id: createId(),
      }),
    );
  }
}

export default slice;
