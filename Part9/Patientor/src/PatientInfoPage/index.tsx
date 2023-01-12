import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';
import { Card, CardContent, Typography } from '@material-ui/core';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  //Get id from object params in router
  const { id: urlPatientId } = useParams<{ id: string }>();

  //Get Patients from state
  const [{ patients }] = useStateValue();

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
            <Typography variant='h5'>{patient.name}</Typography>
            <Typography>Occupation: {patient.occupation}</Typography>
            <Typography>Gender: {patient.gender}</Typography>
            {patient.ssn && <Typography>SSN: {patient.ssn}</Typography>}
            {patient.dateOfBirth && (
              <Typography>DOB: {patient.dateOfBirth}</Typography>
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
