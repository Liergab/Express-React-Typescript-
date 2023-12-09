import jwt from 'jsonwebtoken';
import env from '../util/validateEnv'
import { Response } from 'express';
const generateToken = (res:Response,id:string) => {
   const token = jwt.sign({id},env.JWT_SECRET_KEY,{
    expiresIn:'5d'
   })

   res.cookie('BryanTOKEN', token, {
    httpOnly: true,
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}

export default generateToken