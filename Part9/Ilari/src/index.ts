import express from 'express';
import diaryRouter from './routes/diaries';
const app = express();

//Use Middleware express.json()
app.use(express.json());

//Set port 3000
const PORT = 3000;

//Route handler for pin
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

//Route all requests to prefix /api/diaries to that specific router
app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
