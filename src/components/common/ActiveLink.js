import React from 'react';
import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Match, Link as ReachLink } from '@reach/router';

function ActiveLink({ to, children, matchPartial = false, classes = {} }) {
  let pathPattern = `./${to}`;
  if (matchPartial) {
    pathPattern = `./${to}/*`;
  }

  return (
    <Match path={pathPattern}>
      {({ match }) => {
        return (
          <Link
            className={`${match ? classes.activeLink : ''}`}
            component={match ? null : ReachLink}
            to={to}
          >
            {children}
          </Link>
        );
      }}
    </Match>
  );
}

export default withStyles(theme => ({
  activeLink: {
    color: theme.palette.text.disabled,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.text.disabled,
    },
  },
}))(props => <ActiveLink {...props} />);
