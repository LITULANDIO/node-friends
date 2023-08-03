const app = require('./app');
const http = require("http"); 

const port = process.env.PORT || 4000;
let server = http.createServer(app);

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});
server.listen(4000, () => {
	  console.log(`Servidor escuchando en el puerto ${port}`);
});