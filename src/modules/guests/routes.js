const express = require('express')
const router = express.Router();
const requests = require('../../red/requests')
const controller = require('./index')
const security = require('./security')

router.get('/:id', getGuestsOfGroup)
router.post('/addGuest', /*security(),*/ addGuestOfGroup)
router.put('/deleteGuest', deleteGuestOfGroup)
router.put('/updateGuest', addFriendAndActiveGuest)
router.post('/getGroupsGuest', getAllGroupsOfUser)


async function getGuestsOfGroup(req, res, next){
    try {
        const data = await controller.getGuestsOfGroup(req.params.id)
        console.log('data =>', data)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}

async function addGuestOfGroup(req, res, next){
    console.log('req addGuest=>', req.body)
    try {
        await controller.addGuestOfGroup(req.body)
        req.body.id === 0 ? message = 'Guest guardat correctament' : message = 'Guest actualitzat correctament'
        requests.success(req, res, message, 204)
    } catch(error) {
        next(error)
    }
}

async function deleteGuestOfGroup(req, res, next){
    console.log('req', Object.keys(req.body)[0])
    const id = parseInt(Object.keys(req.body)[0])
    try {
        await controller.deleteGuestOfGroup(id)
        requests.success(req, res, 'Guest eliminat correctament', 200)
    } catch(error) {
        next(error)
    }
}

async function addFriendAndActiveGuest(req, res, next){
    console.log('res friend acrive', req)
    try {
        const data = await controller.addFriendAndActiveGuest(req.body)
        console.log('friend and active =>', data)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}

async function getAllGroupsOfUser(req, res, next){
    console.log('RE.BODY', req.body)
    try {
        const data = await controller.getAllGroupsOfUser(req.body.id)
        console.log('groups user =>', data)
        requests.success(req, res, data, 200)
    } catch(error) {
        next(error)
    }
}
            
module.exports = router