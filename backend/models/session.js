const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    name:String,
    speed:Number,
    rawspeed:Number,
    accuracy:Number,
    lastActiveAt:Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

sessionSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Session = new mongoose.model('Session', sessionSchema)

module.exports = Session