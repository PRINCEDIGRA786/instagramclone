const mongoose = require('mongoose')
// const mongoURI = "mongodb://127.0.0.1:27017/Instagram"
const mongoURI = "mongodb+srv://digraprince7:5Mcrq0Ema6LdUCrN@users.xmkbait.mongodb.net/?retryWrites=true&w=majority&appName=users"
const connectToMongo = async () => {
    // mongoose.set('strictQuery', true)
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI)
        console.log('Mongo connected successfully')
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectToMongo;