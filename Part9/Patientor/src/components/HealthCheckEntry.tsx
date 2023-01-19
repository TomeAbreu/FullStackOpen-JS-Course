import { Typography } from '@material-ui/core';
import React from 'react';
import { Diagnosis, HealthCheckRating } from '../types';
import LuggageIcon from '@material-ui/icons/Language';

interface HealthEntryType {
  id: string;
  diagnoses: Array<Diagnosis>;
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
}

const HealthCheckEntry = (props: HealthEntryType) => {
  return (
    <div>
      <LuggageIcon></LuggageIcon>
      <Typography>{props.description}</Typography>
      <Typography>{props.specialist}</Typography>
      <Typography>{props.date}</Typography>
      <Typography>{props.healthCheckRating}</Typography>{' '}
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

export default HealthCheckEntry;
