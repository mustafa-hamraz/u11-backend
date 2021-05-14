const express = require('express');
const router = express.Router();
const fs = require('fs');

router.delete('/', (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    let _userId = Number(req.body.userId);
    let _itemId = Number(req.body.itemId);

    let item = deleteItem(_userId, _itemId);

    if (item){
        res.status(200).json({
            deleted: item,
        });
    }
    else {
        res.status(200).json({
            deleted: false,
        });
    }

});

module.exports = router;

const deleteItem = function(_userId, _itemId){
    let DB__array = DB_loadList();

    try {

        //loop to find the user 
        for (i = 0; i < DB__array.length; i++) {
            if(DB__array[i].userId == _userId){
                
                //loop to find the item
                for(index = 0; index < DB__array[i].list.length; index++){
                    if(DB__array[i].list[index].itemId == _itemId) {
                        DB__array[i].list.splice(index, 1); 
                        DB_stringify = JSON.stringify(DB__array, null, 2);
                        fs.writeFile('./database/lists.json', DB_stringify, err => {
                            if (err){return err;}
                            else {return true}
                        })
                        return true
                    }
                }
            }
        }
        return false


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