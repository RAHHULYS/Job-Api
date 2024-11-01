import {Job} from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, NotFoundError} from '../errors/index.js'

export const getAllJobs = async (req, res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count:jobs.length,name:req.user.name})
}

export const getJob = async (req, res)=>{
    const {user:{userId},params:{id:jobId}} = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobId} found`)
    }
    res.status(StatusCodes.OK).json({job})
}

export const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job,name:[req.user.name]})
}

export const updateJob = async (req, res)=>{
    const {
        body:{company, position},
        user:{userId},
        params:{id:jobId}
    } = req
    if(company==='' || position===''){
        throw new BadRequestError('company or position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId},req.body, {new:true, runValidators:true})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId} found`)
    }
    res.status(StatusCodes.OK).json({job})
}

export const deleteJob = async (req, res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    } = req

    const job = await Job.findByIdAndDelete({
        _id: jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobId} found`)
    }
    res.status(StatusCodes.OK).send('job deleted successfully')
}
