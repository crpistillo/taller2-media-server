const express = require('express');
const express_handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const app = express();

// General settings
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', express_handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//TODO: cambiar este bool para que me deje trabajar con imagenes/videos

// Routes
//app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;