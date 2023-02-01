import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Diagnosis, Entry, Patient } from '../types';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Entrys from '../components/Entrys';
import AddEntryToPatientModal from '../AddEntryToPatientModal';
import { PatientEntryFormValues } from '../AddEntryToPatientModal/AddEntryToPatientForm';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const diagnCodes: Array<Diagnosis> = [];

  //Get id from object params in router
  const { id: urlPatientId } = useParams<{ id: string }>();

  //Get Patients from state
  const [{ patients }] = useStateValue();

  const [{ diagnoses }] = useStateValue();

  //state values for patient entry modal opening
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  //state value for errors in form of patient entry modal
  const [error, setError] = React.useState<string>();

  //Function when open patient entry modal
  const openModal = (): void => setModalOpen(true);

  //Function when closing patient entry modal
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  //When submiting patient entry form
  const submitNewEntry = async (values: PatientEntryFormValues) => {
    if (patient) {
      const patientId = patient.id;
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        //Update patient in component state
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        //Close the modal
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(
            String(e?.response?.data?.error) || 'Unrecognized axios error'
          );
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
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
        //Set patient in state
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
            <AddEntryToPatientModal
              modalOpen={modalOpen}
              error={error}
              onClose={closeModal}
              onSubmit={submitNewEntry}
            />
            <Button variant='contained' onClick={() => openModal()}>
              Add New Entry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PatientInfoPage;
