const mongoose = require('./mongoose');
const User = require('../managers/userManager');
const History = require('../managers/historyManager');
const Channel = require('../managers/channelManager');

var sockets = {};

sockets.init = function (server) {
    
    var io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('** SOCKETS READY **');

        socket.on('message', (message) => {
            console.log(message)
            io.emit('message', message);
        });

// USER MANAGER

        socket.on('login', (data) => {
            User.login({
                username: data.username,
                password: data.password
            }, function(user) {
                io.emit('login', user);
            });
        });

        socket.on('logout', (data) => {
            User.logout(data,
            function(logoutUser) {
                io.emit('logout', logoutUser);
            });
        });

        socket.on('newUser', (data) => {
            User.createUser({
                username: data.username,
                password: data.password
            }, function(newUser) {
                io.emit('newUser', newUser);
            });
        });

        socket.on('editUser', (data) => {
            User.editUser(data,
            function(user) {
                io.emit('editUser', user);
            });
        });

        socket.on('deleteUser', (data) => {
            User.deleteUser(data,
            function(deleteUser) {
                io.emit('deleteUser', deleteUser);
            });
        });

// CHANNEL MANAGER

        socket.on('newChannel', (data) => {
            Channel.createChannel({
                name: data.name
            },
            function(newChannel) {
                io.emit('newChannel', newChannel);
            });
        });

        socket.on('editChannel', (data) => {
            Channel.editChannel(data,
            function(channel) {
                io.emit('editChannel', channel);
            });
        });

        socket.on('deleteChannel', (data) => {
            Channel.deleteChannel(data,
            function(deleteChannel) {
                io.emit('deleteChannel', deleteChannel);
            });
        });

// HISTORY MANAGER

        socket.on('newHistory', (data) => {
            History.createHistory(data,
            function(newHistory) {
                io.emit('newHistory', newHistory);
            });
        });

    });
}

module.exports = sockets;
