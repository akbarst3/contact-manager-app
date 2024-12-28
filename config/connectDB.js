const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB)
        console.log('connected to mongodb', connect.connection.host)
    } catch (err) { 
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB
