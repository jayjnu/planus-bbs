import express from 'express';
import rxify from './middlewares/rxify';
import usersRouter from './routes/user';
import { ErrorRequestHandler } from 'express';
import httpLogger from 'morgan';

const app = express();

// register middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rxify());
app.use(httpLogger('combined'));

// map routes
app.use('/user', usersRouter());

app.get('/', (req, res) => {
  res.json({ type: 'hello' });
});

app.use(((err, req, res, next) => {
  if (err.error) {
    res.status(err.status);
    res.json({
      status: err.status,
      error: err.error.message
    });
  } else {
    res.json(err);
  }
}) as ErrorRequestHandler);

export default app;
