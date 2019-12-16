import React from 'react';
import { withStyles } from '@material-ui/styles';
import DBInfoForm from './DBInfoForm';
import DBSampleData from './DBSampleData';
import { Match } from '@reach/router';

import { Wizard, WizardStep } from '../common/Wizard';
import ConfirmDB from './ConfirmDB';
import Provisioning from './Provisioning';

function CreateNewDBWizard({ path, children, clientId, ...otherProps }) {
  return (
    <Match path="./*">
      {({ match, navigate }) => (
        <Wizard basePath={`${match.uri}/../..`}>
          <WizardStep path="info">
            {wizardProps => <DBInfoForm clientId={clientId} {...wizardProps} />}
          </WizardStep>
          <WizardStep path="sample_data">
            {wizardProps => (
              <DBSampleData clientId={clientId} {...wizardProps} />
            )}
          </WizardStep>
          <WizardStep path="confirm">
            {wizardProps => <ConfirmDB clientId={clientId} {...wizardProps} />}
          </WizardStep>
          <WizardStep path="provisioning">
            {wizardProps => (
              <Provisioning clientId={clientId} {...wizardProps} />
            )}
          </WizardStep>
        </Wizard>
      )}
    </Match>
  );
}

export default withStyles(theme => {})(props => (
  <CreateNewDBWizard {...props} />
));
