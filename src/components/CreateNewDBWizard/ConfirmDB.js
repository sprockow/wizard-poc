import React, { useState } from 'react';

import { Form } from 'informed';
import { withStyles } from '@material-ui/styles';

import TextField from '../common/form/TextField';
import Select from '../common/form/Select';
import RadioGroup from '../common/form/RadioGroup';
import Slider from '../common/form/Slider';
import { Button, FormControlLabel, Radio } from '@material-ui/core';

import { connect } from 'react-redux';

import databaseSlice from '../../redux-store/database';

function ConfirmDB({
  navigateToNextStep,
  navigateToPreviousStep,
  launchDatabase,
  existingDB,
  onCancel,
  classes = {},
}) {
  if (!existingDB) {
    setTimeout(navigateToPreviousStep, 1);
    return null;
  }

  if (existingDB && !existingDB.draft) {
    onCancel();
    return null;
  }

  if (existingDB && existingDB.provisioningInProcess) {
    onCancel();
    return null;
  }

  return (
    <>
      <div className={classes.databaseInfo}>
        <h2>Confirm '{existingDB.name}' Configuration</h2>
        <dl>
          <>
            <dt>Type</dt>
            <dd>
              {existingDB.selectedTier.title} -{' '}
              {existingDB.selectedTier.description}
            </dd>
          </>
          <>
            <dt>Size</dt>
            <dd>{existingDB.selectedTier.size}gb</dd>
          </>
          <>
            <dt>Read Capacity</dt>
            <dd>{existingDB.read_units} units</dd>
          </>
          <>
            <dt>Write Capacity</dt>
            <dd>{existingDB.write_units} units</dd>
          </>
          <>
            <dt>Keyspace</dt>
            <dd>{existingDB.keyspace}</dd>
          </>
          {existingDB.sampleData ? (
            <>
              <dt>Sample Dataset</dt>
              <dd>{existingDB.sampleData.title}</dd>
            </>
          ) : null}
          <>
            <dt>Username</dt>
            <dd>{existingDB.username}</dd>
          </>
        </dl>
        <div className={classes.buttonContainer}>
          <Button onClick={() => navigateToPreviousStep()}>Go Back</Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              launchDatabase();

              // redux action must first update state before we proceed to next step
              setTimeout(navigateToNextStep, 30);
            }}
          >
            Launch Database
          </Button>
        </div>
      </div>
    </>
  );
}

const ConfirmDBWithStyles = withStyles(theme => ({
  databaseInfo: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),

    '& h2': {
      gridColumnStart: 'first',
      gridColumnEnd: 'end',
      gridRowStart: 'header',
    },
    '& dl': {
      display: 'grid',
      gridTemplateColumns: '10rem auto',
      '& dt': {
        ...theme.typography.h6,
        fontWeight: 'bold',
      },
      '& dd': {
        ...theme.typography.h6,
      },
    },
    '& $buttonContainer': {
      gridColumnStart: 'first',
      gridColumnEnd: 'end',
      gridRowStart: 'buttons',
    },
  },
  buttonContainer: {
    '& > button': {
      marginRight: theme.spacing(3),
    },
  },
}))(props => <ConfirmDB {...props} />);

/* Redux Logic */

function mapStateToProps(state, ownProps) {
  const existingDB = state.database.databases.find(
    database => database.clientId === ownProps.clientId,
  );

  return {
    existingDB,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  function launchDatabase(databaseInfo) {
    return dispatch(
      databaseSlice.actions.requestDatabaseProvisioning({
        clientId: ownProps.clientId,
      }),
    );
  }

  return { launchDatabase };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => <ConfirmDBWithStyles {...props} />);
