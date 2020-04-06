const db = require('../utils/models');

const createHistory = function(data, callback) {
    var hist = {
        content: data.content,
        user: data.user,
        type: data.type
    }
    db.History.create(hist, function(err, docHist) {
        if (err) {
            console.log(err);
            callback(false);
        }
        db.Channel.findById(data.channel._id, function(err, docChan) {
            if (err) {
                console.log(err);
                callback(false)
            }
            docChan.histories.push(docHist);
            docChan.save();
            console.log("\n>> Created History:\n", docHist);
            console.log("\n>> Chan:\n", docChan);
            callback({ history: docHist, channel: docChan })
        });
    });
};

module.exports = {
    createHistory: createHistory
}
