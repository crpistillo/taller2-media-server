const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();

// General settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(body_parser.json({ type: 'application/json', limit: '50mb' }));

// Routes
app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;