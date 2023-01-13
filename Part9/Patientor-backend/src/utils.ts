import { PatientPostReqBody, NewPatientEntry, Gender, Entry } from './types';

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: PatientPostReqBody): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newPatient;
};

//To validate name field, we need to check that it exists,
//and to ensure that it is of the type string.
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

//This function is a so-called type guard.
// That means it is a function which returns a boolean and which has a type predicate as the return type.
//In our case, the type predicate is: text is string
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

//Validate that dateOfBirth field is not empty, is a string and is a string with a valid date
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return dateOfBirth;
};

//Type guard for date, because we are already checking in parseDateOfBirth that needs to be a string
//we can declare here as type string and returns a boolean in case the strin can be parsed to a date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

//Parse ssn filed by making sure that it exists and it's a string
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing ssn');
  }
  return ssn;
};

//Parse gender by making sure is not empty and if it's there is one of the enum values
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Invalid or missing gender');
  }
  return gender;
};
//Type guard for Gender type  in this case the type is any because we need to identify not if it's a string
//but if it's one of the enum values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Invalid entries');
  }
  return entries.map((entry) => entry as Entry);
};

export default toNewPatient;
