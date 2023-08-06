require('dotenv').config()

module.exports = {
    app: {
        port: process.env.PORT || 3001
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notaSecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'Litulandio2627',
        database: process.env.MYSQL_DB || 'bbdd_friends',
        port: '3306'

    }
}
