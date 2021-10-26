/////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////
require("dotenv").config() // Loading .env variables
const mongoose = require("mongoose")

/////////////////////////////////////
// Establish Database Connection
/////////////////////////////////////
// setup the inputs for mongoose connect
const DATABASE_URL = process.env.DATABASE_URL // url from .env
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to Mongo
mongoose.connect(DATABASE_URL, CONFIG)

//our connection messages
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("disconnected from mongo"))
.on("error", (error) => console.log(error))

//////////////////////////////
// Export the Connection
//////////////////////////////
module.exports = mongoose