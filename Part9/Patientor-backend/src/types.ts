export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

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

//Type for body fiels in post request for Patients(can be any type so we setup as unkown and  we will parse it later )
export type PatientPostReqBody = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};
