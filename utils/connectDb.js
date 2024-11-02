const mongoose = require("mongoose")

const connectDb = async () =>  {
    console.log(process.env.DB_CONNECTION_STRING, "### environment variables ###")
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
     }).then(() => console.log('Connected to MongoDB'))
     .catch((error) => console.error('Connection error', error));
}

module.exports = connectDb