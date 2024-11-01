import express from 'express'

const app = express();

import {getAllJobs,getJob,createJob,updateJob,deleteJob} from '../controllers/jobs.js'


app.route('/').post(createJob).get(getAllJobs)
app.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

export default app