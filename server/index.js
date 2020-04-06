var app = require('express')();
var server = require('http').Server(app);
var sockets = require('./utils/sockets');

server.listen(3000, () => {
    console.log(`** LISTENING ON PORT: 3000 **`);
});

sockets.init(server);

// module.exports = {
//     User: require("./models/user"),
//     Channel: require("./models/channel"),
//     History: require("./models/history")
// };

// //Enable bodyParser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
//
// //Enable CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
//
// app.get('/', function (req, res) {
//     res.send('toto');
//     // res.sendFile(__dirname + '/index.html');
// });
