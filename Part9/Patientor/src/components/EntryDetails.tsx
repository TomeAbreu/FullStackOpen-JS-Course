import React from 'react';
import { Diagnosis, Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

interface EntryDetails {
  entry: Entry;
  diagnoses?: Array<Diagnosis>;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = (props: EntryDetails) => {
  console.log('ENTRY DETAILS: ', props.entry);
  switch (props.entry.type) {
    case 'Hospital':
      return (
        <HospitalEntry
          key={props.entry.id}
          id={props.entry.id}
          description={props.entry.description}
          date={props.entry.date}
          specialist={props.entry.specialist}
          diagnoses={props.diagnoses ? props.diagnoses : []}
          discharge={props.entry.discharge}
          sickLeave={props.entry.sickLeave}
        ></HospitalEntry>
      );

    case 'HealthCheck':
      return (
        <HealthCheckEntry
          key={props.entry.id}
          id={props.entry.id}
          description={props.entry.description}
          date={props.entry.date}
          specialist={props.entry.specialist}
          diagnoses={props.diagnoses ? props.diagnoses : []}
          healthCheckRating={props.entry.healthCheckRating}
        ></HealthCheckEntry>
      );

    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry
          key={props.entry.id}
          id={props.entry.id}
          description={props.entry.description}
          date={props.entry.date}
          specialist={props.entry.specialist}
          diagnoses={props.diagnoses ? props.diagnoses : []}
          employerName={props.entry.employerName}
        ></OccupationalHealthcareEntry>
      );

    default:
      return assertNever(props.entry);
  }
};

export default EntryDetails;
