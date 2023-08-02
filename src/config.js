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
        user: process.env.MYSQL_USER || 'litulandio',
        password: process.env.MYSQL_PASSWORD || 'KODdgndvyzv6@95#',
        database: process.env.MYSQL_DB || 'friends'

    }
}
