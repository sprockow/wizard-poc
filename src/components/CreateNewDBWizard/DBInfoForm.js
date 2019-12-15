import React from 'react';

import { Form } from 'informed';
import { withStyles } from '@material-ui/styles';

import TextField from '../common/form/TextField';
import Select from '../common/form/Select';
import RadioGroup from '../common/form/RadioGroup';
import { Button, FormControlLabel, Radio } from '@material-ui/core';

function DBInfoForm({ navigateToNextStep, classes = {} }) {
  return (
    <Form
      noValidate
      autoComplete="off"
      className={classes.form}
      onSubmit={formState => {
        //TODO dispatch redux action

        navigateToNextStep && navigateToNextStep();
      }}
    >
      <div className={classes.firstSection}>
        <RadioGroup
          field="db_instance_type"
          label="DB Instance Type"
          required
          className={classes.dbInstanceRadioGroup}
        >
          <FormControlLabel
            value="developer"
            control={<Radio />}
            label="Developer: low-cost development option with 25 GB storage."
          />
          <FormControlLabel
            value="startup"
            control={<Radio />}
            label="Startup: starter configuration for development and light production workloads."
          />
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard: higher throughput, lower latency, 99.9% uptime SLA, plus support."
          />
          <FormControlLabel
            value="enterprise"
            control={<Radio />}
            label="Enterprise: highest throughput, lowest latency, 99.99% uptime SLA, and best support tier."
          />
        </RadioGroup>
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
        />
      </div>

      <div className={classes.secondSection}>
        <TextField
          className={classes.textfield}
          classes={classes}
          label="Database Name"
          field="name"
          id="name"
          helperText="The database name must be unique within your account"
        />
        <TextField
          className={classes.textfield}
          classes={classes}
          label="Keyspace Name"
          required
          field="keyspace"
          id="keyspace"
          helperText="The keyspace holds your data"
        />

        <TextField
          className={classes.textfield}
          classes={classes}
          label="Database User Name"
          required
          field="username"
          id="username"
          helperText="Create a database user"
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
        />
      </div>

      <div className={classes.buttonContainer}>
        <Button type="submit">Launch Database</Button>
      </div>
    </Form>
  );
}

export default withStyles(theme => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '[first] 5fr [second] 4fr [end]',
    gridTemplateRows: '[form] 5fr [buttons] 1fr',
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
  textfield: {
    marginBottom: theme.spacing(6),

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
