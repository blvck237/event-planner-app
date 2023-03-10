const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
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
app.set('view engine', 'hbs');

// Start server
app.listen(8000, () => {
  console.log('Express server started at port', 8000);
});
