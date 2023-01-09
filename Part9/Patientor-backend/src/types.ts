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

//Type that ommits the comment field fro DiaryEntry interface type
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
