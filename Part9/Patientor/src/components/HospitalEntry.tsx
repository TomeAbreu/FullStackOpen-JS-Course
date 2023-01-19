import { Typography } from '@material-ui/core';
import React from 'react';
import { Diagnosis, Discharge, SickLeave } from '../types';
import HospitalIcon from '@material-ui/icons/LocalHospital';

interface HEntryType {
  id: string;
  diagnoses: Array<Diagnosis>;
  description: string;
  date: string;
  specialist: string;
  employerName: string;
  discharge: Discharge;
  sickLeave: SickLeave;
}

const HospitalEntry = (props: HEntryType) => {
  return (
    <div>
      <HospitalIcon></HospitalIcon>
      <Typography>{props.description}</Typography>
      <Typography>{props.specialist}</Typography>
      <Typography>{props.date}</Typography>
      <Typography>{props.employerName}</Typography>
      <Typography>
        {props.discharge.date} {props.discharge.criteria}
      </Typography>
      <Typography>
        {props.sickLeave.startDate} {props.sickLeave.endDate}
      </Typography>
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

export default HospitalEntry;
