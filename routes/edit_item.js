const express = require('express');
const router = express.Router();
const fs = require('fs');

router.put('/', (req, res, next)=>{
    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const itemName = req.body.itemName;
    const amout = req.body.amout;
    const measure = req.body.measure;
    const checked = req.body.checked;

    let editItem = edit(userId, itemId, itemName, amout, measure, checked);

    if (editItem){
        res.status(200).json({
            edited: editItem
        });
    }
    else {
        res.status(200).json({
            edited: false
        });
    }

});

module.exports = router;

const edit = function(userId, itemId, itemName, amout, measure, checked){
    let DB__array = DB_loadList();

    try {

        //loop to find the user 
        for (i = 0; i < DB__array.length; i++) {
            if(DB__array[i].userId === userId){

                //loop to find the item
                for(index = 0; index < DB__array[i].list.length; index++){
                    if(DB__array[i].list[index].itemId === itemId) {
                        DB__array[i].list[index].itemName = itemName;
                        DB__array[i].list[index].amout = amout;
                        DB__array[i].list[index].measure = measure;
                        DB__array[i].list[index].checked = checked;

                        DB_stringify = JSON.stringify(DB__array, null, 2);
                        fs.writeFile('./database/lists.json', DB_stringify, err => {
                            if (err){return err;}
                            else {return true}
                        })
                    }
                }
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