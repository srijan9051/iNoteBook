const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connection established successfully");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit the process with a failure code
    });
}

module.exports = connectToMongo;