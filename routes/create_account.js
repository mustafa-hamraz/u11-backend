const express = require('express');
const router = express.Router();
const fs = require('fs');

// Handling login requests
router.post('/', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    const newUser = add_user(username, password)

    if(newUser === false){
        res.status(200).json({
            userAdded: false,
            username: username,
            password: password
        });
    }
    else{
        res.status(200).json({
            userAdded: true,
            username: username,
            userId: newUser
        });
    }
    
});
module.exports = router;


//add new user to the database
const add_user = function(username, password) {
    let newUser = {
        "userId": Date. now(),
        "username": username,
        "password": password
    }

    const DB__array = DB_load(); 
    const available = username_available(DB__array, username);

    if(available){
        DB__array.push(newUser);
        DB_stringify = JSON.stringify(DB__array, null, 2);
        fs.writeFile('./database/users.json', DB_stringify, err => {
            if (err){
                return err;
            }
            else {
                return true;
            }
        })
        createListForNewUser(newUser.userId)
        return newUser.userId
    }
    else {
        return false
    }
}

//create a list for new user
const createListForNewUser = function (userId) {
    let newUserList = {
        "userId": userId,
        "list": []
    }

    try {
        const DB__loadLists = fs.readFileSync('./database/lists.json');
        const DB__Lists = JSON.parse(DB__loadLists);
        DB__Lists.push(newUserList);
        DB_stringify = JSON.stringify(DB__Lists, null, 2);
        fs.writeFile('./database/lists.json', DB_stringify, err => {
            if (err){
                return err;
            }
            else {
                return true;
            }
        })
    } catch (e) {
        return []
    }
}

//Checks if username is avalible
const username_available = function (array, username) {
    const DB__array = array;

    for (i = 0; i < DB__array.length; i++) {
        if(DB__array[i].username === username){
            return false;
        }
    }

    return true;
}


//DB_load imports all users from json file and returns as an array
const DB_load = function (){
    try {
        const DB__read = fs.readFileSync('./database/users.json')
        const DB__json = JSON.parse(DB__read)
        return DB__json; 
    } catch (e) {
        return []
    }
}