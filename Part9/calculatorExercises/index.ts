import express from 'express';
import { bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const requestQuery = req.query;
  let response;

  if (requestQuery.height && requestQuery.weight) {
    response = {
      weight: requestQuery.weight,
      height: requestQuery.height,
      bmi: bmiCalculator(
        Number(requestQuery.height),
        Number(requestQuery.weight)
      ),
    };
    return res.json(response).status(200);
  } else {
    response = {
      error: 'malformatted parameters',
    };
    return res.json(response).status(408);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
