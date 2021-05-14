const express = require('express');
const router = express.Router();
const fs = require('fs');

// Handling get list requests for user
router.get('/:id', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    let id = Number(req.params.id);
    let userListData = findList(id);

    if(userListData) {
        res.status(200).json({
            userId: id,
            findList: true,
            items: userListData
        });
    }
    else {
        res.status(200).json({
            userId: id,
            findList: false,
            items: []
        });
    }

});

module.exports = router;

//Finds user's list by userId
const findList = function (id) {
    let DB__array = DB_loadList();

    for (i = 0; i < DB__array.length; i++) {
        if(DB__array[i].userId == id){
            return DB__array[i].list;
        }
    }
}


//DB_loadList imports all lists from json file and returns as an array
const DB_loadList = function (){
    try {
        let DB__load = fs.readFileSync('./database/lists.json')
        let DB__json = JSON.parse(DB__load)
        return DB__json; 
    } catch (e) {
        return []
    }
}