const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res, next)=>{
    const userId = req.body.userId;
    const itemName = req.body.itemName;
    const amout = req.body.amout;
    const measure = req.body.measure;
    const checked = req.body.checked;

    let newItem = createItem(userId, itemName, amout, measure, checked);

    if (newItem){
        res.status(200).json({
            added: newItem
        });
    }
    else {
        res.status(200).json({
            added: false
        });
    }

});

module.exports = router;

const createItem = function(userId, itemName, amout, measure, checked){
    let DB__array = DB_loadList();
    let newItem = {
        "itemId": userId+Date. now(),
        "itemName": itemName,
        "amout": amout,
        "measure": measure,
        "checked": checked
    }

    try {

        for (i = 0; i < DB__array.length; i++) {

            if(DB__array[i].userId === userId){
                DB__array[i].list.push(newItem);
                DB_stringify = JSON.stringify(DB__array, null, 2);
                fs.writeFile('./database/lists.json', DB_stringify, err => {
                    if (err){return err;}
                    else {return true}
                })
            }
        }
        return true

    } catch(err) {
        return false
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