const express = require('express');
const morgan = require('morgan')
const http = require("http"); 
const users = require('./modules/users/routes')
const auth = require('./modules/auth/routes')
const groups = require('./modules/groups/routes')
const wishes = require('./modules/wishes/routes')
const guests = require('./modules/guests/routes')
const mail = require('./modules/mail/routes')
const error = require('./red/errors')
const kill = require('kill-port');
const app = express();
const host = 'localhost';
const port = '4000'; 
const server = http.createServer(app);

const cors = require('cors');
//setupWebSocket();

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})
  server.once('error', function(err) {
    //console.log(err.code);
    if (err.code === 'EADDRINUSE') {
      // port is currently in use
      kill(port, 'tcp')
        .then(console.log)
        .catch(console.log);
    }
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

