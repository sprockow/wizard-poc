import React from 'react';
import { withStyles } from '@material-ui/styles';
import DBInfoForm from './DBInfoForm';
import DBSampleData from './DBSampleData';

import { Wizard, WizardStep } from '../common/Wizard';

function CreateNewDBWizard({ path, children }) {
  return (
    <>
      <Wizard>
        <WizardStep path="first">
          {wizardProps => <DBInfoForm {...wizardProps} />}
        </WizardStep>
        <WizardStep path="second">
          {wizardProps => <DBSampleData {...wizardProps} />}
        </WizardStep>
        <WizardStep path="third">
          {({ previousStepPath, nextStepPath }) => <h1>3rd Step</h1>}
        </WizardStep>
      </Wizard>
    </>
  );
}

export default withStyles(theme => {})(props => (
  <CreateNewDBWizard {...props} />
));
