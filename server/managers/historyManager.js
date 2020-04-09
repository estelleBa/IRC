const db = require('../utils/models');

const createHistory = function(data, callback) {
    var date = new Date();
    var h = (date.getHours()<10?'0':'') + date.getHours();
    var m = (date.getMinutes()<10?'0':'') + date.getMinutes();
    var hist = {
        content: data.content,
        user: data.user,
        type: data.type,
        datetime: h + ':' + m
    }
    db.History.create(hist, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        db.History.findById(doc._id).exec((err, docHist) => {
            db.Channel.findById(data.channel._id, function(err, docChan) {
                if (err) {
                    console.log(err);
                    callback(false)
                }
                docChan.histories.push(docHist);
                docChan.save();
                console.log("\n>> Created History:\n", docHist);
                console.log("\n>> Chan:\n", docChan);
                callback({ channel: docChan , history: docHist});
            });
        });
    });
};

module.exports = {
    createHistory: createHistory
}
