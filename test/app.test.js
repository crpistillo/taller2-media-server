const app = require('../src/app')
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const express = require('express');

describe('App', function () {

    it('app', function () {
        app.set('port', process.env.PORT || 3000);
        app.use(morgan('dev'));
        app.use(express.urlencoded({extended: true}));
        app.use(bodyParser.json({ type: 'application/json', limit: '50mb' , keepExtensions: true, uploadDir: "uploads"}));
        app.use(require('../src/routes/index'));
    })
})