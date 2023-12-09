import express from 'express'
import 'dotenv/config'
import env from './util/validateEnv'
import dbConnection from './DB/database'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import {
      errorValidation,
      pageNotFound } from './middleware/errorValidation'
const app = express()
const PORT = 3001 || env.PORT 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use('/',userRoutes)
app.use(pageNotFound)
app.use(errorValidation)

dbConnection()
app.listen(PORT,() => {
    console.log(`connected to: http://localhost:${PORT}`)
})