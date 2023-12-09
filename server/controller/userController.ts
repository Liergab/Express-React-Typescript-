import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import userModel from '../model/userModel';
import bcrypt from 'bcrypt'
import generateToken from '../middleware/generateToken';

type createUser = {
    username:string;
    email:string;
    password:string
}

export const createUser = asyncHandler(async(req:Request,res:Response) => {
    const{username, email, password} = req.body as createUser
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields required!");
        
    }

    const validation = await userModel.find({email})
    if(validation){
        res.status(409)
        throw new Error("email aready used");
        
    }

        try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const user = await userModel.create({
                username,
                email,
                password:hashPassword
            })
        
            res.status(201).json(user)
            } catch (error) {
                console.log(`tryCatchError: ${error}`)
                res.status(500).json({ error: "Server error" });
            }
});

type loginUser = {
    email:string;
    password:string
}
export const login = asyncHandler(async(req:Request,res:Response) => {
    const{email, password} = req.body as loginUser;

    const user = await userModel.findOne({email})

    if(user &&(await bcrypt.compare(password, user.password))){
        generateToken(res, user.id)
        res.status(200).json({

            _id:user.id,
            username: user.username,
            email: user.email,
            password:user.password
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials");  
    }
});

export const logout = asyncHandler(async(req:Request, res:Response) => {
    res.cookie('BryanTOKEN','',{
        httpOnly:true,
        expires: new Date(0)
    });

    res.status(200).json('logout')
})