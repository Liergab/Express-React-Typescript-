import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,

    }
},{timestamps:true})

type user = InferSchemaType<typeof userSchema>;

export default model<user>('users',userSchema)