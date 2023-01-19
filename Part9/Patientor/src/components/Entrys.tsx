import { Typography } from '@material-ui/core';
import React from 'react';
import { Diagnosis, Entry } from '../types';
import EntryDetails from './EntryDetails';

interface Entries {
  entries: Array<Entry>;
  diagnoses: Array<Diagnosis>;
}

const Entrys = (props: Entries) => {
  return (
    <div>
      <Typography variant='h6'>Entries</Typography>
      {props.entries.map((entry) => (
        <EntryDetails
          key={entry.id}
          entry={entry}
          diagnoses={props.diagnoses}
        ></EntryDetails>
      ))}
    </div>
  );
};

export default Entrys;
