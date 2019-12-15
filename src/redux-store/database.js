import { createSlice } from 'redux-starter-kit';

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
    markDatabaseDraftAsInProgress: (state, action) => {
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
    markDatabaseAsProvisioned: (state, action) => {
      const { clientId } = action.payload;

      const newDatabase = state.databases.find(
        database => database.clientId === clientId,
      );

      if (newDatabase) {
        newDatabase.draft = false;
        newDatabase.provisioningInProcess = false;
      }
    },
    loadExistingDatabasesFromAccount: (state, action) => {
      const { databases } = action.payload;
      state.databases = databases;
    },
  },
});

export default slice;
