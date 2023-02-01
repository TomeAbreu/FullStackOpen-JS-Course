import { Typography } from '@material-ui/core';
import React from 'react';
import { Diagnosis, Discharge, SickLeave } from '../types';
import HospitalIcon from '@material-ui/icons/LocalHospital';

interface HEntryType {
  id: string;
  diagnoses?: Array<Diagnosis>;
  description: string;
  date: string;
  specialist: string;
  discharge: Discharge;
  sickLeave?: SickLeave;
}

const HospitalEntry = (props: HEntryType) => {
  return (
    <div>
      <HospitalIcon></HospitalIcon>
      <Typography>{props.description}</Typography>
      <Typography>{props.specialist}</Typography>
      <Typography>{props.date}</Typography>
      <Typography>
        {props.discharge.date} {props.discharge.criteria}
      </Typography>
      {props.sickLeave ? (
        <Typography>
          {props.sickLeave.startDate} {props.sickLeave.endDate}
        </Typography>
      ) : null}

      <ul>
        {props.diagnoses
          ? props.diagnoses.map((diagn) => (
              <li key={diagn.code}>
                {diagn.code} {diagn.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default HospitalEntry;
