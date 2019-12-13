import React from 'react';

import { Form } from 'informed';
import { withStyles } from '@material-ui/styles';

import TextField from '../common/form/TextField';
import Select from '../common/form/Select';
import RadioGroup from '../common/form/RadioGroup';
import { Button, FormControlLabel, Radio } from '@material-ui/core';

function DBInfoForm({ classes = {} }) {
  return (
    <Form
      noValidate
      autoComplete="off"
      className={classes.form}
      onSubmit={data => {}}
    >
      <Select
        field="location"
        label="Location"
        inputId="component-select"
        isClearable={true}
        required
        className={classes.selectField}
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

      <div>
        <RadioGroup field="db_instance_type" required>
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
      </div>

      <Button type="submit">Launch Database</Button>
    </Form>
  );
}

export default withStyles(theme => ({}))(props => <DBInfoForm {...props} />);
