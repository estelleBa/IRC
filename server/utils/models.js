const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: String,
});
var User = mongoose.model('User', UserSchema);

var HistorySchema = new mongoose.Schema({
    content: {
        type: String
    },
    datetime: {
        type: String
    },
    user: {
        type: String
    },
    type: {
        type: String
    }

});
var History = mongoose.model('History', HistorySchema);

var ChannelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    histories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ]
});
var Channel = mongoose.model('Channel', ChannelSchema);

module.exports = {
    User: User,
    History: History,
    Channel: Channel
}
