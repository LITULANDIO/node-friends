const app = require('./app')


app.listen(app.get('port'), 'app-node.quisqui.com', () => {
    console.log('servidor escoltant al port', app.get('port'))
})