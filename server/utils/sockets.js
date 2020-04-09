const mongoose = require('./mongoose');
// const User = require('../managers/userManager');
const History = require('../managers/historyManager');
const Channel = require('../managers/channelManager');

var sockets = {};

sockets.init = function (server) {

    var io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('** SOCKETS READY **');

// CHANNEL MANAGER

        socket.on('getChannels', () => {
            Channel.getChannels(function(channels) {
                io.emit('getChannels', channels);
            });
        });

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
