import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  NewEntry,
  Entry,
} from '../types';

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const getPatient = (patientId: string): Patient | undefined => {
  const patient: Patient | undefined = patientData.find(
    (patient) => patient.id === patientId
  );
  return patient;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...patient,
  };

  //Add to array patientData
  patientData.push(newPatientEntry);
  //Put the id
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };
  const patient = patientData.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error('Could not find patient for this new entry');
  } else {
    patient.entries.push(newEntry as Entry);

    return newEntry as Entry;
  }
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatients,
  getPatient,
  addEntry,
};
