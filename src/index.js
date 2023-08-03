const app = require('./app');
const port = process.env.PORT || 4000;
app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});
server.listen(4000, () => {
	  console.log(`Servidor escuchando en el puerto ${port}`);
});
