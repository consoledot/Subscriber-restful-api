const mongoose = require("mongoose")

const {Schema} = mongoose
const subscriberSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    subscribedToChannel:{
        type:String,
        require:true
    },
    subscribeDate:{
        type:Date,
        default:new Date,
        require: true
    }

})

module.exports = mongoose.model("Subscriber", subscriberSchema)