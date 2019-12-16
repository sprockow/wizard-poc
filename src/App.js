import React from 'react';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import { Provider } from 'react-redux';
import theme from './theme';
import { Match, Router, Link as ReachLink } from '@reach/router';
import ActiveLink from './components/common/ActiveLink';
import CreateNewDBWizard from './components/CreateNewDBWizard';

import initializeStore from './redux-store';
import DataStaxLogo from './datastax_logo.js';

import Dashboard from './Dashboard';

const Main = withStyles(theme => ({
  header: {
    padding: theme.spacing(3),
    borderBottomColor: theme.palette.primary.light,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
  },
  logo: {
    width: '15rem',
    height: '4rem',
  },
  nav: {
    paddingLeft: theme.spacing(3),
  },
  content: {
    paddingLeft: theme.spacing(6),
    maxWidth: '90rem',
  },
}))(({ classes, children }) => (
  <>
    <header className={classes.header}>
      <DataStaxLogo className={classes.logo} />
    </header>
    <nav className={classes.nav}>
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
    </nav>
    <div className={classes.content}> {children}</div>
  </>
));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={initializeStore()}>
        <Router>
          <Main path="/">
            <Dashboard path="/" />
            <CreateNewDBWizard path="/new/:clientId/*" />
          </Main>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
