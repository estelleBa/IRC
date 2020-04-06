const mongoose = require("mongoose");
const dbPath = 'mongodb://localhost/irc';

mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => {
    console.log("=> Error occurred from the database");
});
db.once("open", () => {
    console.log("=> Successfully connect to MongoDB.");
});

module.exports = mongoose;
