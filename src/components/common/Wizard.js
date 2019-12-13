import React from 'react';
import { Router, Match, Redirect } from '@reach/router';
import { Button } from '@material-ui/core';

/* This is a utility function that will ignore react fragments (ie <></>) in order to get the "real" children */
function recursivelyGetChildren(children) {
  let steps = [];

  const immmediateChildren = React.Children.toArray(children);
  for (const immediateChild of immmediateChildren) {
    if (immediateChild.type === React.Fragment) {
      steps = [
        ...steps,
        ...recursivelyGetChildren(immediateChild.props.children),
      ];
      continue;
    }

    steps = [...steps, immediateChild];
  }

  return steps;
}

function WizardContainer({ children, classes = {} }) {
  return <>{children}</>;
}

function WizardStepContainer({ step, steps, classes = {} }) {
  return <>{step.props.children}</>;
}

export const WizardStep = ({ children }) => children;

export function Wizard({ children }) {
  const steps = recursivelyGetChildren(children);

  return (
    <Match path="./*">
      {({ match }) => (
        <Router>
          <WizardContainer path="/">
            {steps.map(step => (
              <WizardStepContainer
                path={step.props.path}
                key={step.props.path}
                step={step}
              />
            ))}
            <Redirect
              default
              from="/"
              to={`${match.uri}/${steps[0].props.path}`}
              noThrow
            />
          </WizardContainer>
        </Router>
      )}
    </Match>
  );
}
