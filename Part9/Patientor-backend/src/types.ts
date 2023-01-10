export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

//Type that ommits the comment field fro DiaryEntry interface type
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
