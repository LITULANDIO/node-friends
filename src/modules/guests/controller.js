const { json } = require('express/lib/response');

const TABLE = 'guests'

module.exports = (dbInject) => {

    let db = dbInject
    if(!db) {
        db =  require('../../DB/mysql');
    }
    
    const getGuestsOfGroup = async (id) => {
        console.log('id group =>', id)
        const groups = await db.getAllItems('groups')
        let groupMatch = {}
        groups.map(group => {
            if (group.code.includes(id)) {
                groupMatch = group
            }
        })
        //console.log('groups =>', groups)
        const guests = await db.getAllItems(TABLE)
        const users = await db.getAllItems('users')
        const auth = await db.getAllItems('auth')
        let idsGuestsList = []
        let guestsList = []
        let guestListFull = { group: 0, guests: [] }
    
        guests.find(guest => {
            if (groupMatch.id === guest.idGroup) {
                console.log('match group', groupMatch.id, guest.idGroup )
                    idsGuestsList.push({
                         idGuest: guest.idGuest, 
                         hashGuest: guest.id, 
                         friend: guest.friend,
                         active: guest.active
                     })
            }
        })
        users.filter(user => {
            idsGuestsList.map(guest => {
                if (user.id === guest.idGuest) {
                    guestsList.push({
                        id: user.id,
                        email: user.email,
                        photo: user.photo,
                        hashGuest: guest.hashGuest,
                        friend: guest.friend,
                        active: guest.active
                    })
                }
            })
        })
        auth.map(auth => {
            guestsList.map(guest => {
                if (auth.id === guest.id) {
                    delete groupMatch.code
                    guestListFull.group = groupMatch
                    guestListFull.guests.push({
                        id: guest.id,
                        hashGuest: guest.hashGuest,
                        email: guest.email,
                        photo: guest.photo,
                        user: auth.user,
                        active: guest.active,
                        friend: guest.friend
                    })
                }
            })
        })
        return guestListFull
    }
    const addGuestOfGroup = async (body) => {
        const guestOfGroup = {
           idGroup: body.idGroup,
           idGuest: body.idGuest,
           friend:  body.friend,
           active: body.active
        }
        const requestGroup = await db.insertItem(TABLE, guestOfGroup)
        return requestGroup
    }
  
    const deleteGuestOfGroup = (body) => db.deleteItem(TABLE, body)

    const addFriendAndActiveGuest = async (body) => {
        await db.updateItem(TABLE, 'friend', body.friend, body.idFriend)
        await db.updateItem(TABLE, 'active', body.active, body.idGuest)
    }

    const getAllGroupsWithName = async () => {
        const groups = await db.getAllItems('groups')
        const guests = await db.getAllItems('guests')

        let allGroups = []
        groups.map(group => {
            guests.map(guest => {
                if (guest.idGroup === group.id) {
                    allGroups.push({
                        id: group.id,
                        name: group.name,
                        idGuest: guest.idGuest,
                        snug: group.snug,
                        friend: {
                            id: guest.friend,
                            name: '',
                            photo: '',
                            wishes: {
                                wish1: '',
                                wish2: '',
                                wish3: '',
                                wish4: '',
                                wish5: ''
                            }

                        },
                        active: guest.active
                    })
                }
            })
        })
        return allGroups
    }

    const getAllGroupsOfUser = async (idUser) => {
        const users = await db.getAllItems('users')
        const auths = await db.getAllItems('auth')
        const allGroups = await getAllGroupsWithName()
        const wishes = await db.getAllItems('wishes')
        let allGroupsUser = []
        allGroups.map(group => {
            console.log('group val =>', {group})
                if(group.idGuest === parseInt(idUser)) {
                    allGroupsUser.push({
                        me: {
                            id: idUser,
                            active: group.active,
                            wishes: {
                                wish1: '',
                                wish2: '',
                                wish3: '',
                                wish4: '',
                                wish5: ''
                            }
                        },
                        group: {
                            id: group.id,
                            name: group.name,
                            snug: group.snug
                        },
                        friend: {
                            id: group.friend.id,
                            name: '',
                            photo: '',
                            wishes: {
                                wish1: '',
                                wish2: '',
                                wish3: '',
                                wish4: '',
                                wish5: ''
                            }
                        },
                    })
                }
        })
        auths.forEach(auth => {
            users.forEach(user => {
                    allGroupsUser.forEach(groupUser => {
                        if (auth.id === user.id && groupUser.friend.id === user.id) {
                            groupUser.friend.name = auth.user
                            groupUser.friend.photo = user.photo 
                        }                   
            })  })
        })

        wishes.forEach(wish => {
            allGroupsUser.forEach(groupUser => {
                if (groupUser.friend.id === wish.idUser && groupUser.group.id === wish.idGroup) {
                    groupUser.friend.wishes.wish1 = wish.wish1
                    groupUser.friend.wishes.wish2 = wish.wish2
                    groupUser.friend.wishes.wish3 = wish.wish3
                    groupUser.friend.wishes.wish4 = wish.wish4
                    groupUser.friend.wishes.wish5 = wish.wish5
                }
                if (groupUser.me.id === wish.idUser && groupUser.group.id === wish.idGroup) {
                    groupUser.me.wishes.wish1 = wish.wish1
                    groupUser.me.wishes.wish2 = wish.wish2
                    groupUser.me.wishes.wish3 = wish.wish3
                    groupUser.me.wishes.wish4 = wish.wish4
                    groupUser.me.wishes.wish5 = wish.wish5
                }
            })
        })
        
        
        console.log('allGroupsUser =>', allGroupsUser)

        return allGroupsUser
    }



    return {
        getGuestsOfGroup,
        addGuestOfGroup,
        deleteGuestOfGroup,
        addFriendAndActiveGuest,
        getAllGroupsOfUser
    }
}