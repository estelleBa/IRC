const db = require('../utils/models');

const createChannel = function(data, callback) {
    db.Channel.create(data, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        console.log("\n>> Created Channel:\n", doc);
        callback(doc);
    });
};

const editChannel = function(data, callback) {
    db.Channel.findById(data.channel._id, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        doc.name = data.name;
        doc.save();
        console.log("\n>> Edited Channel:\n", doc);
        callback(doc);
    });
};

const deleteChannel = function(data, callback) {
    db.Channel.findOneAndDelete({ _id: data.channel._id }, function (err) {
        if(err) {
            console.log(err);
            callback(false);
        }
        console.log("\n>> Channel Deleted:\n", data.channel.name);
        callback(true);
    });
};

module.exports = {
    createChannel: createChannel,
    editChannel: editChannel,
    deleteChannel: deleteChannel
}
