// adding depenencies
const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
const cool = require('cool-ascii-faces');
const PORT = process.env.PORT || 3001;

//data parsing and activating port

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/apiRoutes')(app);

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
 