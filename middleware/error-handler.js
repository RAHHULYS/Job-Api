// import  {CustomAPIError}  from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
export const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }
  // if (err instanceof  CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    customError.statusCode = 400
  }

  if(err.code  && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyPattern)[0]} field, please choose another value`
    customError.statusCode = 400 //bad request
    // console.log(Object.keys());
    Object.keys(err.keyPattern)[0]
    
  }
  if(err.name === 'CastError'){
    customError.msg = `No item Found with id ; ${err.value}`
    customError.statusCode = 404 

  }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}


