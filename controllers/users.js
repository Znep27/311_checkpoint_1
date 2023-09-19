const users = require('../data/index');
const sampleUser = require('../data/sampleUser')



const listUsers = (req, res) => {
    res.json(users)
}

const showUser = (req, res) => {
    const getUsers = users.some(user => user.id == req.params.id)

    if (getUsers) {
      res.send(users.filter(user => user.id == req.params.id))
    } else {
      res.status(404).json({msg: `User id ${req.params.id} not found.`})
    }
}

const createUser = (req, res) => {
    users.push(sampleUser);
    res.json({msg: 'User Added: ', sampleUser})
}

const updateUser = (req, res) => {
    const found = users.some(user => user.id == req.params.id)
    
    if (found) {
        const updatedUser = req.body;
        console.log(updatedUser)

        users.forEach(user => {
            if(user.id == req.params.id) {
                user.name = req.body.name ? updatedUser.name : user.name;
                user.username = req.body.username ? updatedUser.username : user.username;
                user.email = req.body.email ? updatedUser.email : user.email;
                user.phone = req.body.phone ? updatedUser.phone : user.phone;
                user.website = req.body.website ? updatedUser.website : user.website;
                
                res.json({msg: "User Updated Successfully: ", user})            }
        })  
    } else {
        res.status(400).json({msg: `User id ${req.params.id} does not exist. Bad Request.`})
    }
}

const deleteUser = (req, res) => {
    const found = users.some(user => user.id == req.params.id)

    if (found){
        const deleted = users.findIndex(user => user.id == req.params.id)
        users.splice(deleted, 1);
        res.send(users)
    } else {
        res.status(400).json({msg: `User id ${req.params.id} does not exist. Bad Request.`})
    }
}

module.exports = { 
    listUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
}