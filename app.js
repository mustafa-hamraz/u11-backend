const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs')


const login = require('./routes/login');
const create_account = require('./routes/create_account');
const get_items = require('./routes/get_items');
const new_item = require('./routes/new_item');
const edit_item = require('./routes/edit_item');
const delete_item = require('./routes/delete_item');

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes that handles requests
app.use('/login', login);
app.use('/create_account', create_account);
app.use('/get_items', get_items);
app.use('/new_item', new_item);
app.use('/edit_item', edit_item);
app.use('/delete_item', delete_item);

//Error handling 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message        
        }
    });
});

module.exports = app;