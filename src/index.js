const app = require('./app');

app.listen(app.get('port'));
console.log('Server running at localhost', app.get('port'));

