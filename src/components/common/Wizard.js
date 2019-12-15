import React from 'react';
import { Router, Match, Redirect, Link as ReachLink } from '@reach/router';

/* This is a utility function that will ignore react fragments (ie <></>) in order to get the "real" children */
function _recursivelyGetChildren(children) {
  let steps = [];

  const immmediateChildren = React.Children.toArray(children);
  for (const immediateChild of immmediateChildren) {
    if (immediateChild.type === React.Fragment) {
      steps = [
        ...steps,
        ..._recursivelyGetChildren(immediateChild.props.children),
      ];
      continue;
    }

    steps = [...steps, immediateChild];
  }

  return steps;
}

function WizardContainer({ children, classes = {} }) {
  return <div>{children}</div>;
}

function WizardStepContainer({
  step,
  steps,
  basePath,
  navigate,
  classes = {},
}) {
  const currentIndex = steps.indexOf(step);

  let navigateToNextStep;
  let NextStepLink;
  if (currentIndex < steps.length - 1) {
    navigateToNextStep = () =>
      navigate(`${basePath}/${steps[currentIndex + 1].props.path}/`);
  }

  let navigateToPreviousStep;
  if (currentIndex > 0) {
    navigateToPreviousStep = () => {
      navigate(`${basePath}/${steps[currentIndex - 1].props.path}/`);
    };
  }

  return (
    <>
      {step.props.children({
        navigateToPreviousStep,
        navigateToNextStep,
        NextStepLink,
      })}
    </>
  );
}

export const WizardStep = ({ children }) => children;

export function Wizard({ children }) {
  const steps = _recursivelyGetChildren(children);

  return (
    <Match path="./*">
      {({ match, navigate }) => (
        <Router>
          <WizardContainer path="/">
            {steps.map(step => (
              <WizardStepContainer
                path={step.props.path}
                key={step.props.path}
                step={step}
                steps={steps}
                basePath={match.uri}
                navigate={navigate}
              />
            ))}
            <Redirect
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
