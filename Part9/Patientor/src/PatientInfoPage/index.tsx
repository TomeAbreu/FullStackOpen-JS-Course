import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Diagnosis, Patient } from '../types';
import { Card, CardContent, Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Entrys from '../components/Entrys';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const diagnCodes: Array<Diagnosis> = [];

  //Get id from object params in router
  const { id: urlPatientId } = useParams<{ id: string }>();

  //Get Patients from state
  const [{ patients }] = useStateValue();

  const [{ diagnoses }] = useStateValue();

  const buildDiagnosesDescriptions = (diagnoses: Array<Diagnosis>) => {
    if (patient) {
      const patienEntries = patient.entries;
      patienEntries.map((entry) => {
        if (entry.diagnosisCodes)
          entry.diagnosisCodes.map((code) => {
            //Filter list for this code
            const diagnosesListCodes = diagnoses.filter(
              (diagnose) => diagnose.code === code
            );
            diagnCodes.push({
              code: diagnosesListCodes[0].code,
              name: diagnosesListCodes[0].name,
            });
          });
      });
    }
  };

  void buildDiagnosesDescriptions(diagnoses);

  React.useEffect(() => {
    //Function to get Patient from the backend
    const fetchPatient = async (patientId: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        setPatient(patient);
      } catch (e) {
        console.error(e);
      }
    };

    //Get Patient from dicitionary Patients
    const patientState = Object.values(patients).find(
      (patient) => patient.id === urlPatientId
    );
    //If Patient is in state already updated component state varialble
    if (patientState) {
      setPatient(patientState);
    }
    //Make request only if patient is not in state and id exists in route url
    else {
      if (urlPatientId) void fetchPatient(urlPatientId);
    }
  }, [patient, urlPatientId]);

  if (patient) {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant='h5'>
              {patient.name}{' '}
              {patient.gender === 'male' ? (
                <MaleIcon></MaleIcon>
              ) : patient.gender === 'female' ? (
                <FemaleIcon></FemaleIcon>
              ) : (
                <TransgenderIcon></TransgenderIcon>
              )}
            </Typography>
            <Typography>Occupation: {patient.occupation}</Typography>

            {patient.ssn && <Typography>SSN: {patient.ssn}</Typography>}
            {patient.dateOfBirth && (
              <Typography>DOB: {patient.dateOfBirth}</Typography>
            )}
            <p></p>

            {patient.entries.length > 0 ? (
              <Entrys entries={patient.entries} diagnoses={diagnCodes}></Entrys>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PatientInfoPage;
