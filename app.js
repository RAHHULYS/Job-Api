import dot from 'dotenv'
dot.config();
import 'express-async-errors';
import express, { json } from 'express';
// extra security packages

import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

const app = express();

import { auth } from './middleware/authentication.js';
import {connectDB} from './db/connect.js'
//routers
import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js'
// error handler
import notFoundMiddleware from './middleware/not-found.js';
import {errorHandlerMiddleware} from './middleware/error-handler.js';

app.use(rateLimit({
    windowMs : 15 * 60 * 1000, // 15 minutes
    max : 100,
}
));
app.use(json());
app.use(helmet());
app.use(cors());
app.use(xss());


// extra packages


app.get('/',(req, res) => {
  res.send('jobs api !')
})
// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs', auth, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
