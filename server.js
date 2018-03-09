var config = require('./config/index');

var express = require('express'),
  app = express(),
  port = config.port || 5000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.configuration = config;

var routes = require('./api/routes/employeeRoutes'); //importing route
routes(app); //register the route

app.server = app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

module.exports = app;