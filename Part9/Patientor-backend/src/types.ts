export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface SickLeave {
  startDate: string;
  endData: string;
}

interface Discharge {
  date: string;
  criteria: string;
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  employerName: 'HyPD';
  discharge: Discharge;
  sickLeave: SickLeave;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

//Type that ommits the ssn and entries field from Patient interface
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

//Type that ommits the ssn field from Patient interface type
export type NonSensitivePatient = Omit<Patient, 'ssn'>;

//Type that ommits id when adding a Patient
export type NewPatientEntry = Omit<Patient, 'id'>;

// Define special omit for unions
//type UnionOmit<T, K extends string | number | symbol> = T extends unknown
// ? Omit<T, K>
// : never;
// Define Entry without the 'id' property
//type EntryWithoutId = UnionOmit<Entry, 'id'>;

//Type for body fiels in post request for Patients(can be any type so we setup as unkown and  we will parse it later )
export type PatientPostReqBody = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};
