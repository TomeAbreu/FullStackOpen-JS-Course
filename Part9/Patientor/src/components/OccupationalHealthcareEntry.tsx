import { Typography } from '@material-ui/core';
import React from 'react';
import { Diagnosis } from '../types';
import BusinessIcon from '@material-ui/icons/Business';

interface OccupEntryType {
  id: string;
  diagnoses: Array<Diagnosis>;
  description: string;
  date: string;
  specialist: string;
  employerName: string;
}

const OccupationalHealthcareEntry = (props: OccupEntryType) => {
  return (
    <div>
      <BusinessIcon></BusinessIcon>
      <Typography>{props.description}</Typography>
      <Typography>{props.specialist}</Typography>
      <Typography>{props.date}</Typography>
      <Typography>{props.employerName}</Typography>

      <ul>
        {props.diagnoses.map((diagn) => (
          <li key={diagn.code}>
            {diagn.code} {diagn.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntry;
