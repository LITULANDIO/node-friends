const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')
const controllerUsers = require('../users/index')

router.post('/login', login)
router.get('/logout', logout)
router.get('/allUsers', getUsers)
router.post('/updatePassword', updatePassword)


async function login(req, res, next) {
    console.log('login =>', req.body)
    try {
        const token = await controller.login(req.body.user, req.body.password)
        console.log('token es', token)
        requests.success(req, res, token, 200)
    } catch(error) {
        next('eeror login', error)
    }
}

async function getUsers (req, res, next) {
    try{
     const auth = await controller.getUsers()
     const users = await controllerUsers.getAllUsers()
     let joinObjData = {}
     let joinListData = []
     auth.map(data => {
        users.map(user => {
            if (data.id === user.id) {
                joinObjData = {
                    id: data.id,
                    user: data.user,
                    email: user.email,
                    photo: user.photo,
                    groups: user.groups
                }
            }
        })
        return joinListData.push(joinObjData)
     })
        //console.log('join =>',  joinListData)
        requests.success(req, res, joinListData, 200)
    } catch(error) {
        next(error)
    }
}

async function logout (req, res, next) {
    try{
        await controller.logout(req.body)
        requests.success(req, res, 'User inactiu', 200)
    } catch(error) {
        next(error)
    }
}

async function updatePassword (req, res, next) {
    try{
        await controller.updatePasswordUser(req.body)
        requests.success(req, res, 'Password updated', 200)
    }catch(error) {
        next(error)
    }
}
            
module.exports = router