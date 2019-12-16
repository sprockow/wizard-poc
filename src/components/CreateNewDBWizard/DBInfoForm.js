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

const databaseTiers = [
  {
    id: 'developer',
    title: 'Developer',
    description: 'low-cost development option with 25 GB storage.',
    size: '25',
    minCapacity: 1,
    maxCapacity: 4,
  },
  {
    id: 'startup',
    title: 'Startup',
    description:
      'starter configuration for development and light production workloads.',
    size: '50',
    minCapacity: 2,
    maxCapacity: 8,
  },
  {
    id: 'standard',
    title: 'Standard',
    description:
      'higher throughput, lower latency, 99.9% uptime SLA, plus support',
    size: '50',
    minCapacity: 4,
    maxCapacity: 12,
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description:
      'highest throughput, lowest latency, 99.99% uptime SLA, and best support tier.',
    size: '50',
    minCapacity: 10,
    maxCapacity: 24,
  },
];

function DBInfoForm({
  navigateToNextStep,
  existingDB,
  create,
  update,
  onCancel,
  classes = {},
}) {
  const [selectedDatabaseTier, selectDatabaseTier] = useState(
    existingDB &&
      databaseTiers.find(tier => tier.id === existingDB.db_instance_type),
  );

  if (existingDB && !existingDB.draft) {
    onCancel();
    return null;
  }

  if (existingDB && existingDB.provisioningInProcess) {
    onCancel();
    return null;
  }

  return (
    <Form
      noValidate
      autoComplete="off"
      className={classes.form}
      onSubmit={formState => {
        const selectedTier = databaseTiers.find(
          tier => tier.id === formState.db_instance_type,
        );
        const dbInfo = {
          ...formState,
          selectedTier,
        };

        if (existingDB) {
          update(dbInfo);
        } else {
          create(dbInfo);
        }
        navigateToNextStep && navigateToNextStep();
      }}
      initialValues={existingDB}
    >
      {({ formState }) => {
        const validateExists = value => {
          return !value ? 'Value required' : undefined;
        };
        const validatePasswords = value => {
          if (!value) {
            return 'Value required';
          }

          return formState.values.password !== formState.values.password_confirm
            ? 'Please check that password fields match'
            : undefined;
        };

        return (
          <>
            <div className={classes.firstSection}>
              <RadioGroup
                field="db_instance_type"
                label="DB Instance Type"
                required
                className={classes.dbInstanceRadioGroup}
                onChange={e => {
                  selectDatabaseTier(
                    databaseTiers.find(tier => tier.id === e.target.value),
                  );
                }}
                validate={validateExists}
              >
                {databaseTiers.map(tier => (
                  <FormControlLabel
                    key={tier.id}
                    value={tier.id}
                    control={<Radio />}
                    label={`${tier.title} - ${tier.description}`}
                  />
                ))}
              </RadioGroup>
              {selectedDatabaseTier ? (
                <>
                  <Select
                    field="location"
                    label="Location"
                    inputId="component-select"
                    isClearable={true}
                    required
                    className={classes.location}
                    classes={classes}
                    options={[
                      {
                        label: 'us-east-1',
                        value: 'us-east-1',
                      },
                      {
                        label: 'europe-west-1',
                        value: 'europe-west-1',
                      },
                    ]}
                    helperText="Select a location for your database"
                    validate={validateExists}
                  />
                  <Slider
                    field="read_units"
                    label="Read Capacity"
                    key={`${selectedDatabaseTier.id}-rcapacity`}
                    className={classes.capacitySlider}
                    classes={classes}
                    valueLabelDisplay="auto"
                    step={1}
                    min={selectedDatabaseTier.minCapacity}
                    max={selectedDatabaseTier.maxCapacity}
                    helperText="Each read unit represents an additional allowable 1000 transactions per second. Read capacity is measured on an rolling 15 second window."
                  />
                  <Slider
                    field="write_units"
                    label="Write Capacity"
                    key={`${selectedDatabaseTier.id}-wcapacity`}
                    className={classes.capacitySlider}
                    classes={classes}
                    valueLabelDisplay="auto"
                    step={1}
                    min={selectedDatabaseTier.minCapacity}
                    max={selectedDatabaseTier.maxCapacity}
                    helperText="Each write unit represents an additional allowable 1000 transactions per second. Write capacity is measured on an rolling 15 second window."
                  />
                </>
              ) : null}
            </div>

            <div className={classes.secondSection}>
              <TextField
                required
                className={classes.textfield}
                classes={classes}
                label="Database Name"
                field="name"
                id="name"
                helperText="The database name must be unique within your account"
                validate={validateExists}
              />
              <TextField
                className={classes.textfield}
                classes={classes}
                label="Keyspace Name"
                required
                field="keyspace"
                id="keyspace"
                helperText="The keyspace holds your data"
                validate={validateExists}
              />

              <TextField
                className={classes.textfield}
                classes={classes}
                label="Database User Name"
                required
                field="username"
                id="username"
                helperText="Create a database user"
                validate={validateExists}
              />

              <TextField
                className={classes.textfield}
                classes={classes}
                label="Database User Password"
                required
                field="password"
                id="password"
                type="password"
                helperText="Create a password"
                validate={validatePasswords}
              />

              <TextField
                className={classes.textfield}
                classes={classes}
                label="Confirm Password"
                required
                field="password_confirm"
                id="password_confirm"
                type="password"
                helperText="Create a password"
                validate={validatePasswords}
              />
            </div>

            <div className={classes.buttonContainer}>
              {existingDB ? (
                <>
                  <Button
                    size="large"
                    onClick={() => {
                      navigateToNextStep();
                    }}
                  >
                    Skip
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Update and Continue
                  </Button>
                </>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Continue
                </Button>
              )}
            </div>
          </>
        );
      }}
    </Form>
  );
}

const DBInfoFormWithStyles = withStyles(theme => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '[first] 5fr [second] 4fr [end]',
    gridTemplateRows: '[form] 4fr [buttons] 1fr',
  },
  firstSection: {
    gridColumnStart: 'first',
    gridColumnEnd: 'first',

    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(3),

    position: 'relative',
    '&:after': {
      content: '" "',
      width: '1px',
      height: '85%',
      position: 'absolute',
      backgroundColor: theme.palette.grey[500],
      right: 0,
      transform: 'translateY(-50%)',
      top: '50%',
    },
  },
  secondSection: {
    gridColumnStart: 'second',
    gridColumnEnd: 'end',

    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(6),
  },
  buttonContainer: {
    gridColumnStart: 'first',
    gridColumnEnd: 'end',
    gridRowStart: 'buttons',

    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(6),

    '& > button': {
      marginRight: theme.spacing(3),
    },
  },
  dbInstanceRadioGroup: {
    marginBottom: theme.spacing(6),
  },
  location: {
    marginBottom: theme.spacing(6),
  },
  selectComponent: {
    marginRight: theme.spacing(6),
  },
  capacitySlider: {
    paddingRight: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  textfield: {
    marginBottom: theme.spacing(6),

    '&:last-child': {
      marginBottom: 0,
    },

    '& > label + div': {
      marginRight: theme.spacing(6),
    },
  },
  instructionText: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
  },
}))(props => <DBInfoForm {...props} />);

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
  function create(databaseInfo) {
    return dispatch(
      databaseSlice.actions.createDatabaseDraft({
        databaseInfo,
        clientId: ownProps.clientId,
      }),
    );
  }

  function update(databaseInfo) {
    return dispatch(
      databaseSlice.actions.updateDatabaseDraft({
        databaseInfo,
        clientId: ownProps.clientId,
      }),
    );
  }

  return { create, update };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => <DBInfoFormWithStyles {...props} />);
