import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries()).status(200);
});

router.post('/', (req, res) => {
  //Get request body and parse it to toNewDiaryEntry type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = toNewPatient(req.body);

  //Add Patient
  const addedPatient = patientService.addPatient(newPatient);

  //return json response
  res.json(addedPatient).status(201);
});

export default router;
