import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { v4 as createId } from 'uuid';
import { Match } from '@reach/router';
import { connect } from 'react-redux';
import databaseSlice from './redux-store/database';

function DatabaseTableRow({
  classes = {},
  database,
  wizardPath,
  navigate,
  discardDraft,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div className={classes.databaseRow}>
      <div>
        <span>{database.name}</span>
      </div>
      <div>
        <span>{database.selectedTier.title}</span>
      </div>
      <div>
        <span>{database.selectedTier.size}gb</span>
      </div>
      <div>
        <span>{database.read_units} units</span>
      </div>
      <div>
        <span>{database.write_units} units</span>
      </div>
      <div>
        <StatusLabel database={database} />
      </div>
      <div>
        {database.draft ? (
          <>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={e => {
                setAnchorEl(e.currentTarget);
              }}
            >
              Actions
            </Button>
            <Menu
              id={`${database.clientId}-actions`}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  navigate(`${wizardPath}/${database.clientId}`);
                  setAnchorEl(null);
                }}
              >
                Continue Editing Draft
              </MenuItem>
              <MenuItem
                onClick={() => {
                  discardDraft({ database });
                  setAnchorEl(null);
                }}
              >
                Discard
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </div>
    </div>
  );
}

function Dashboard({ discardDraft, classes = {}, databases }) {
  return (
    <>
      <Match path="./*">
        {({ match, navigate }) => (
          <>
            <h1>Databases</h1>
            <div className={classes.databaseTable}>
              <div className={classes.tableHeader}>
                <div>Name</div>
                <div>Tier</div>
                <div>Size</div>
                <div>Read Capacity</div>
                <div>Write Capacity</div>
                <div>Status</div>
                <div></div>
              </div>
              {databases.map(database => (
                <DatabaseTableRow
                  database={database}
                  key={database.clientId}
                  wizardPath="new"
                  navigate={navigate}
                  discardDraft={discardDraft}
                />
              ))}
            </div>
            <Button
              variant="contained"
              size="medium"
              color="primary"
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

function StatusLabel({ database }) {
  if (database.draft) {
    return <span>Draft</span>;
  }
  if (database.provisioningInProcess) {
    return <span>Provisioning in Progress</span>;
  }

  return <span>Operational</span>;
}

const DashboardWithStyles = withStyles(theme => ({
  databaseTable: {
    '& > div': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      marginBottom: theme.spacing(3),

      '& > div': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[200],
    ...theme.typography.h6,
  },
}))(props => <Dashboard {...props} />);

function mapStateToProps(state) {
  return {
    databases: state.database.databases,
  };
}

function mapDispatchToProps(dispatch) {
  function discardDraft({ database }) {
    dispatch(
      databaseSlice.actions.discardDraft({ clientId: database.clientId }),
    );
  }

  return { discardDraft };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => <DashboardWithStyles {...props} />);
