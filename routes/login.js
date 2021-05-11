const express = require('express');
const router = express.Router();
const fs = require('fs');

// Handling login requests
router.post('/', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    
    const username = req.body.username;
    const password = req.body.password;

    //checks if user exsist
    const auth = DB_checkUser(username, password);

    if(auth) {
        res.status(200).json(
            {
            status: '200',
            exist: true,
            userId: auth,
            username: username
        });
    } 
    else {
        res.status(200).json({
            status: '200',
            exist: false,
            userId: "",
            username: username,
            password: password

        });
    }
});
module.exports = router;


//Checks if user already exist in database and returns userId
const DB_checkUser = function (username, password) {
    const DB__array = DB_load();

    for (i = 0; i < DB__array.length; i++) {
        if(DB__array[i].username === username && DB__array[i].password === password){
            return DB__array[i].userId;
        }
    }
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