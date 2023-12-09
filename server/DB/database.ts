import mongoose from 'mongoose'
import env from '../util/validateEnv'
const dbConnection = async() => {
    try {
        const connect = await mongoose.connect(env.MONGO_DB_STRING)
        console.log(`connected to database: ${connect.connection.host} ${connect.connection.name}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default dbConnection