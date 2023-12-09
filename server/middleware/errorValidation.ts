import {Request,NextFunction,Response} from 'express'
import constants from '../constant'
export const pageNotFound  = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`not found- ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorValidation = (err:unknown, req:Request, res:Response, next:NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    if( err instanceof Error){
        switch (statusCode) {
            case constants.VALIDATION_ERROR:
                res.json({title:"Vaidation Failed",message: err.message, stackTrace: err.stack});
                break;
            case constants.NOT_FOUND:
                res.json({title:"Not found",message: err.message, stackTrace: err.stack});
                break;
            case constants.FORBIDDEN:
                res.json({title:"forbidden",message: err.message, stackTrace: err.stack});
                break;
            case constants.UNAUTHORIZED:
                res.json({title:"Unautorized",message: err.message, stackTrace: err.stack});
                break;
            case constants.SERVER_ERROR:
                res.json({title:"server error",message: err.message, stackTrace: err.stack});
                break;
            case constants.CONFLICT:
                res.json({title:"server error",message: err.message, stackTrace: err.stack});
                break;
        
            default:
                break;
    }}
}