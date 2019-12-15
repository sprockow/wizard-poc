import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';
import databaseSlice from '../../redux-store/database';
import { connect } from 'react-redux';

function SampleDataCard({ dataSample, classes = {}, onSelection, isSelected }) {
  return (
    <Card
      className={`${classes.card} ${isSelected ? classes.selectedCard : ''}`}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Size: {dataSample.size}
        </Typography>
        <Typography variant="h5" component="h2">
          {dataSample.title}
        </Typography>
        <Typography variant="body2" component="p">
          {dataSample.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardButtonContainer}>
        <Button size="small" onClick={onSelection}>
          Select
        </Button>
      </CardActions>
    </Card>
  );
}

const dataSampleList = [
  {
    id: 'us_census_data',
    title: 'US Census Data',
    size: '500gb',
    description:
      'The Bureau of the Census has released Census 2000 Summary File 1 (SF1) 100-Percent data.',
  },
  {
    id: 'ahs',
    title: 'American Housing Survey (AHS) ',
    size: '100gb',
    description:
      'The AHS is the largest, regular national housing sample survey in the United States. The U.S. Census Bureau conducts the AHS to obtain up-to-date housing statistics',
  },
  {
    id: 'synth_user_db',
    title: 'Synthetic User DB',
    size: '2gb',
    description:
      'A set of randomly generated user data, including simulated usage analytics.',
  },
  {
    id: 'fruit_veg_prices',
    title: 'Fruit and Vegetable Prices',
    size: '35gb',
    description:
      'How much do fruits and vegetables cost? Department of Agriculture estimated average prices for 153 commonly consumed fresh and processed fruits and vegetables.',
  },
  {
    id: 'ncdc_storm',
    title: 'NCDC Storm Events Database',
    size: '500gb',
    description:
      'Storm Data is provided by the National Weather Service (NWS) and contain statistics on personal injuries and damage estimates. ',
  },
  {
    id: 'pop_baby_names',
    title: 'Popular Baby Names',
    size: '900mb',
    description:
      ' Popular Baby Names by Sex and Ethnic Group Data were collected through civil birth registration. Each record represents the ranking of a baby name in the order of popularity',
  },
  {
    id: 'consumer_complaints',
    title: 'Consumer Complaint Database',
    size: '1.2tb',
    description:
      'These are complaints the Consumer Financial Protection Bureau has received about financial products and services.',
  },
];

function DBSampleData({
  classes = {},
  navigateToNextStep,
  navigateToPreviousStep,
  onSubmit,
}) {
  const [selectedDataSample, setSelectedDataSample] = useState(null);

  return (
    <>
      <div>
        <h2>Pre-populate Sample Data</h2>
        <p>
          Pick a data set below, or skip and populate your database with your
          own data.
        </p>
        <div className={classes.pageButtons}>
          <Button onClick={() => navigateToPreviousStep()}>Go Back</Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            disabled={!selectedDataSample}
            onClick={() => {
              onSubmit({
                sampleData: selectedDataSample,
              });

              navigateToNextStep();
            }}
          >
            Use Selected Data
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigateToNextStep()}
          >
            Continue with empty database
          </Button>
        </div>
      </div>
      <div className={classes.dataSampleList}>
        {dataSampleList.map(dataSample => (
          <SampleDataCard
            key={dataSample.id}
            dataSample={dataSample}
            classes={classes}
            onSelection={() => setSelectedDataSample(dataSample)}
            isSelected={selectedDataSample === dataSample}
          />
        ))}
      </div>
    </>
  );
}

const DBSampleDataWithStyles = withStyles(theme => ({
  dataSampleList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: theme.spacing(3),
  },
  card: {
    flexBasis: '20rem',
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[50],
    boxShadow: theme.shadows[7],

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 300ms ease-in-out',
  },
  selectedCard: {
    backgroundColor: theme.palette.grey[200],

    boxShadow: theme.shadows[20],
    transform: `translate(.1rem, .1rem)`,
  },
  cardButtonContainer: {
    alignSelf: 'flex-end',
  },
  pageButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: theme.spacing(3),
    },
    marginBottom: theme.spacing(3),
  },
}))(props => <DBSampleData {...props} />);

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
  function onSubmit(sampleData) {
    return dispatch(
      databaseSlice.actions.updateDatabaseDraft({
        databaseInfo: {
          sampleData,
        },
        clientId: ownProps.clientId,
      }),
    );
  }

  return { onSubmit };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => <DBSampleDataWithStyles {...props} />);
