const mongoose = require('mongoose')

//create schema for contact model

const contactSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User is required'],
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    }
},
    {
        timestamps: true
    },
)

module.exports = mongoose.model('Contact', contactSchema)