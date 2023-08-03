const express = require('express');
const morgan = require('morgan')
const http = require("http"); 
const users = require('./modules/users/routes')
const auth = require('./modules/auth/routes')
const groups = require('./modules/groups/routes')
const wishes = require('./modules/wishes/routes')
const guests = require('./modules/guests/routes')
const mail = require('./modules/mail/routes')
const Cors = require('./utils/cors')
const app = express();
const error = require('./red/errors')
const host = 'localhost';
const port = '3001'; 
// const host = 'dev-test.h2942241.stratoserver.net';
// const port = '443'; 
const wscors = new Cors(app);
let cors = {};

let server = http.createServer(app);
//const requestListener = function (req, res) {}; 
// const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
}); 

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     next()
//   })
app.use((req, res, next) => {
    cors = wscors.corsAccessControlAllow(req, res);
    next();
});


// configuration
app.set('port', port)
// routes
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/user/group', groups)
app.use('/api/user/group/guests', guests)
app.use('/api/user/wishes', wishes)
app.use('/api/users/mail', mail)

app.use(error)

module.exports = app;