import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();

//Middleware to use static build
app.use(express.static('build'));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
