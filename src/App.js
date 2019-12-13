import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import theme from './theme';
import { Match, Router, Link as ReachLink } from '@reach/router';
import ActiveLink from './components/common/ActiveLink';
import CreateNewDBWizard from './components/CreateNewDBWizard';

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <ActiveLink component={ReachLink} to="/new">
        Create New Dashboard
      </ActiveLink>
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
      <Router>
        <BreadCrumbs path="/">
          <Dashboard path="/" />
          <CreateNewDBWizard path="/new/*" />
        </BreadCrumbs>
      </Router>
    </ThemeProvider>
  );
}

export default App;
