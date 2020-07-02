const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();


const app = express();

// General settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json', limit: '50mb' , keepExtensions: true, uploadDir: "uploads"}));

// Routes
app.use(require('./routes/index'));

module.exports = app;