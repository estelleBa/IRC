const db = require('../utils/models');

const createUser = function(data, callback) {
    db.User.create(data, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        console.log("\n>> Created User:\n", doc);
        callback(doc);
    });
};

const editUser = function(data, callback) {
    db.User.findById(data.user._id, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        doc.username = data.username;
        doc.save();
        console.log("\n>> Edited User:\n", doc);
        callback(doc);
    });
};

const deleteUser = function(data, callback) {
    db.User.findOneAndDelete({ _id: data.user._id }, function (err) {
        if(err) {
            console.log(err);
            callback(false);
        }
        console.log("\n>> User Deleted:\n", data.user.username);
        callback(true);
    });
};

const login = function(data, callback) {
    db.User.findOne(data, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        console.log("\n>> Connection User:\n", doc);
        callback(doc);
    });
};

const logout = function(data, callback) {
    db.User.findById(data.user._id, function(err, doc) {
        if (err) {
            console.log(err);
            callback(false);
        }
        console.log("\n>> Logout User:\n", doc);
        callback(true);
    });
};

module.exports = {
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser,
    login: login,
    logout: logout
}
