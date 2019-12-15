import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import theme from './theme';
import { Match, Router, Link as ReachLink } from '@reach/router';
import ActiveLink from './components/common/ActiveLink';
import CreateNewDBWizard from './components/CreateNewDBWizard';
import { Button } from '@material-ui/core';
import { v4 as createId } from 'uuid';
import initializeStore from './redux-store';

function Dashboard() {
  return (
    <>
      <Match path="./*">
        {({ match, navigate }) => (
          <>
            <h1>Dashboard</h1>
            <Button
              onClick={() => {
                // Create a unique id for the new draft database
                navigate(`/new/${createId()}`);
              }}
            >
              Create New Database
            </Button>
          </>
        )}
      </Match>
    </>
  );
}

function BreadCrumbs({ children }) {
  return (
    <>
      <div>
        <h2>
          <ActiveLink component={ReachLink} to="/">
            Dashboard
          </ActiveLink>{' '}
          <Match path="new/*">
            {({ match }) => {
              return match ? '> Create new Dashboard' : null;
            }}
          </Match>
        </h2>
      </div>
      {children}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={initializeStore()}>
        <Router>
          <BreadCrumbs path="/">
            <Dashboard path="/" />
            <CreateNewDBWizard path="/new/:clientId/*" />
          </BreadCrumbs>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
