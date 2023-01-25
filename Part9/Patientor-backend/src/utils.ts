import {
  PatientPostReqBody,
  NewPatientEntry,
  Gender,
  Entry,
  Diagnose,
  NewEntry,
  EntryPostReqBody,
  Discharge,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  SickLeave,
  HealthCheckRating,
} from './types';

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: PatientPostReqBody): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };

  return newPatient;
};

export const toNewEntry = (entry: EntryPostReqBody): NewEntry => {
  console.log('OLA1');

  if (isHospitalEntry(entry)) {
    console.log('IS HOSPITAL LETS PARSE IT');
    return {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      diagnosisCodes: entry.diagnosisCodes
        ? parseDiagnoses(entry.diagnosisCodes)
        : null,
      type: parseType(entry.type),
      discharge: parseDischarge(entry.discharge),
      sickLeave: entry.sickLeave ? parseSickLeave(entry.sickLeave) : null,
    } as HospitalEntry;
  } else if (isOccupationalHealthcareEntry(entry)) {
    console.log('OLA OCCUPATIONAL');
    return {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      diagnosisCodes: entry.diagnosisCodes
        ? parseDiagnoses(entry.diagnosisCodes)
        : null,
      type: parseType(entry.type),
      employerName: parseEmployerName(entry.employerName),
    } as OccupationalHealthcareEntry;
  } else if (isHealthCheckEntry(entry)) {
    console.log('OLA HEALTHCHECK');

    return {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      diagnosisCodes: entry.diagnosisCodes
        ? parseDiagnoses(entry.diagnosisCodes)
        : null,
      type: parseType(entry.type),
      healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      employerName: entry.employerName
        ? parseEmployerName(entry.employerName)
        : null,
    } as HealthCheckEntry;
  } else {
    throw new Error('No valid entry type');
  }
};

const isHospitalEntry = (entry: unknown): entry is HospitalEntry => {
  console.log('Hospital Entry: ', entry);
  return (entry as HospitalEntry).discharge !== undefined;
};

const isOccupationalHealthcareEntry = (
  entry: unknown
): entry is OccupationalHealthcareEntry => {
  return (entry as OccupationalHealthcareEntry).employerName !== undefined;
};

const isHealthCheckEntry = (entry: unknown): entry is HealthCheckEntry => {
  return (entry as HealthCheckEntry).healthCheckRating !== undefined;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  console.log(healthCheckRating);
  if (
    !isValidHealthCheckRating(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error('Incorrrect or missing health check rating');
  }
  return healthCheckRating;
};
const isHealthCheckRating = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isValidHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseType = (
  type: unknown
): 'OccupationalHealthcare' | 'Hospital' | 'HealthCheck' => {
  if (!type || !isString(type) || !isValidType(type)) {
    throw new Error('Invalid or missing type');
  }
  if (type === 'Hospital') {
    return 'Hospital';
  } else if (type === 'HealthCheck') {
    return 'HealthCheck';
  } else {
    return 'OccupationalHealthcare';
  }
};

const isValidType = (type: string): boolean => {
  return (
    type === 'Hospital' ||
    type === 'HealthCheck' ||
    type === 'OccupationalHealthcare'
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return (
    (discharge as Discharge).criteria !== undefined &&
    (discharge as Discharge).date !== undefined
  );
};
const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave && !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return sickLeave as SickLeave;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return (
    (sickLeave as SickLeave).startDate !== undefined &&
    (sickLeave as SickLeave).endDate !== undefined
  );
};

const parseDiagnoses = (diagnoses: unknown): Array<Diagnose['code']> => {
  if (!Array.isArray(diagnoses)) {
    throw new Error('Invalid diagnoses');
  }
  return diagnoses.map((diagnose) => diagnose as Diagnose['code']);
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
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
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return date;
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
