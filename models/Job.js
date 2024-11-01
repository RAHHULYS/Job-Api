import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,' please provide company name'],
        maxLength: 50,
    },
    position:{
        type:String,
        required:[true,' please provide position'],
        maxLength: 50,
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default: 'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    }
},
{timestamps:true})

export const Job = mongoose.model('Job',JobSchema)