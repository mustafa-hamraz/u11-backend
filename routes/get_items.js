const express = require('express');
const router = express.Router();
const fs = require('fs');

// Handling get list requests for user
router.get('/', (req, res, next)=>{
    const userId = req.body.userId;

    const list = findList(userId);

    res.status(200).json({
        userId: userId,
        list: list
    });
});

module.exports = router;

//Finds user's list by userId
const findList = function (userId) {
    const DB__array = DB_loadList();

    for (i = 0; i < DB__array.length; i++) {
        if(DB__array[i].userId === userId){
            return DB__array[i].list;
        }
    }
}


//DB_loadList imports all lists from json file and returns as an array
const DB_loadList = function (){
    try {
        const DB__load = fs.readFileSync('./database/lists.json')
        const DB__json = JSON.parse(DB__load)
        return DB__json; 
    } catch (e) {
        return []
    }
}