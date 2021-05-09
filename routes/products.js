const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Handling GET request to /products',
        db: DB
    });
});

router.post('/', (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;

    addDetails(name,email,address);
    
    res.status(201).json({
        message: 'Handling POST request to /products',
        name: name,
        email: email,
        address: address

    });


});

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if( id === 'speecial') {
        res.status(200).json({
            message:    'You discovered special ID',
            id: id
        })
    }
    else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
});

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'Updated product'
    })
});

router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'Deleted product'
    })
});

module.exports = router;




const removeDetails = function (name) {
    const Details = loadDetails();
    const GetDetails = Details.filter(function (checkName) {
        return checkName.name !== name
    })

    if (Details.length > GetDetails.length) {
        saveDetails(GetDetails)
    }
}

const addDetails = function (name, email, address) {
    const Details = loadDetails()
    const duplicateDetails = Details.filter(function (checkName) {

        return checkName.name === name
    })
    if (duplicateDetails.length === 0) {
        Details.push({
            name: name,
            email: email,
            address: address
        })
        saveDetails(Details);
    }else {
        console.log('product already existst');
    }
}

const saveDetails = function (Details) {
    const dataJSON = JSON.stringify(Details)
    fs.writeFileSync('./DB_products.json', dataJSON)
}

const loadDetails = function () {
    try {
        const dataBuffer = fs.readFileSync('./DB_products.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

