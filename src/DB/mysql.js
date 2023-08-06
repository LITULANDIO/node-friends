const mysql = require('mysql')
const config = require('../config')

const dbConfig = {
	connectionLimit: 10,
    host: '127.0.0.1',
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: '3306',
	debug: true
}
const pool = mysql.createPool(dbConfig);


const getAllItems = (table, data = null) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

const getItems = (table, data = null) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT ${data} FROM ${table}`, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}


const getItem = (table, id, column = 'id') => {
    console.log('[get =>', table, id, column)
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${column}=${id}`, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

const insertItem = (table, data) => {
    console.log('[AddUser =>', data)
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

const updateItem = (table, column, data, id) => {
    console.log('[Update =>', table, column, data, id)
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${table} SET ${column} = ? WHERE id = ?`, [data, id], (error, result) =>  {
            error ? reject(error) : resolve(result)
        })
    })
}

const deleteItem = (table, data) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${table} WHERE id = ?`, data, (error, result) => {
            error ? reject(error) : resolve(result)
        })
    })
}

function query(table, consult) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ?`, consult, (error, result) => {
            error ? reject(error) : resolve(result[0])
        })
    })
}


module.exports = {
    getAllItems,
    getItem,
    insertItem,
    deleteItem,
    getAllItems,
    getItems,
    query,
    updateItem
}
