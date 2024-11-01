import express from 'express'

const app = express();

import {login, register} from '../controllers/auth.js'

app.post('/register',register)

app.post('/login',login)

export default app;