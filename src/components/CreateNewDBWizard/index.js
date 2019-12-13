import React from 'react';
import { withStyles } from '@material-ui/styles';
import DBInfoForm from './DBInfoForm';
import { Wizard, WizardStep } from '../common/Wizard';

function CreateNewDBWizard({ path, children }) {
  return (
    <>
      <Wizard>
        <WizardStep path="first">
          <DBInfoForm />
        </WizardStep>
        <WizardStep path="second">
          <h1>2nd Step</h1>
        </WizardStep>
        <WizardStep path="third">
          <h1>3rd Step</h1>
        </WizardStep>
      </Wizard>
    </>
  );
}

export default withStyles(theme => {})(props => (
  <CreateNewDBWizard {...props} />
));
