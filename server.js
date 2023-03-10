const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const authController = require('./controllers/authController');
const eventController = require('./controllers/eventController');
const { connect } = require('./models/db');
const app = express();

// Set public folder
app.use(express.static('public'));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
// Setting up our view engine
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
  })
);
app.set('view engine', 'hbs');

// Settign up our routes
app.use('/', authController);
// Start server
app.listen(8000, async () => {
  await connect();
  console.log('Express server started at port', 8000);
});
