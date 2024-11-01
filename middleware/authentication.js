import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import {UnauthenticatedError} from '../errors/index.js'

export const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)        
        req.user = {userId:payLoad.userId, name:payLoad.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication error')
    }
}