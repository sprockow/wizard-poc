import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

function Provisioning({
  navigateToNextStep,
  navigateToPreviousStep,
  launchDatabase,
  existingDB,
  onCancel,
  create,
  update,
  classes = {},
}) {
  if (!existingDB) {
    onCancel();
    return null;
  }

  if (existingDB && !existingDB.provisioningInProcess) {
    setTimeout(() => navigateToPreviousStep());
    return null;
  }

  return (
    <>
      <div className={classes.provisioningInfo}>
        <h2>'{existingDB.name}' is being provisioned...</h2>
        <p>
          This will take a few minutes depending on the size of the cluster and
          the pre-populated data
        </p>
        <div className={classes.logs}>
          <p>...</p>
          {existingDB.provisioningLogs &&
            existingDB.provisioningLogs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={() => {
              navigateToNextStep();
            }}
          >
            Go back to dashboard
          </Button>
        </div>
      </div>
    </>
  );
}

const ProvisioningWithStyles = withStyles(theme => ({
  provisioningInfo: {
    maxWidth: '50rem',
    backgroundColor: theme.palette.grey[50],
    boxShadow: theme.shadows[7],
    padding: theme.spacing(3),
    margin: 'auto',
    marginTop: theme.spacing(6),
  },
  logs: {
    fontFamily: 'monospaced',
    height: '15rem',
    marginLeft: theme.spacing(3),
    overflow: 'scroll',
  },
  buttonContainer: {
    '& > button': {
      marginRight: theme.spacing(3),
    },
  },
}))(props => <Provisioning {...props} />);

/* Redux Logic */

function mapStateToProps(state, ownProps) {
  const existingDB = state.database.databases.find(
    database => database.clientId === ownProps.clientId,
  );

  return {
    existingDB,
  };
}

export default connect(mapStateToProps)(props => (
  <ProvisioningWithStyles {...props} />
));
