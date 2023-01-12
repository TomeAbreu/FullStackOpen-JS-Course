import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';

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
  if (patient) {
    patient.entries = [];
  }
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

export default {
  getEntries,
  addPatient,
  getNonSensitivePatients,
  getPatient,
};
