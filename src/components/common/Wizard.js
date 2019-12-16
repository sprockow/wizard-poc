import React, { useState } from 'react';
import { Router, Match, Redirect } from '@reach/router';

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
  onComplete,
  onCancel,
  classes = {},
}) {
  const currentIndex = steps.indexOf(step);

  let navigateToNextStep;
  let NextStepLink;
  if (currentIndex < steps.length - 1) {
    navigateToNextStep = () =>
      navigate(`${basePath}/${steps[currentIndex + 1].props.path}/`);
  } else {
    navigateToNextStep = onComplete;
  }

  let navigateToPreviousStep;
  if (currentIndex > 0) {
    navigateToPreviousStep = () => {
      navigate(`${basePath}/${steps[currentIndex - 1].props.path}/`, {
        replace: true,
      });
    };
  } else {
    navigateToPreviousStep = onCancel;
  }

  return (
    <>
      {step.props.children({
        navigateToPreviousStep,
        navigateToNextStep,
        NextStepLink,
        onComplete,
        onCancel,
      })}
    </>
  );
}

export const WizardStep = ({ children }) => children;

export function Wizard({ children, basePath }) {
  const steps = _recursivelyGetChildren(children);

  const [isCancelling, cancel] = useState(false);
  const [isCompleting, complete] = useState(false);

  return (
    <Match path="./*">
      {({ match, navigate }) => {
        if (isCancelling || isCompleting) {
          return <Redirect to={basePath} noThrow />;
        }

        return (
          <Router>
            <WizardContainer path="/">
              {steps.map(step => (
                <WizardStepContainer
                  path={step.props.path}
                  key={step.props.path}
                  onComplete={() => complete(true)}
                  onCancel={() => cancel(true)}
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
        );
      }}
    </Match>
  );
}
