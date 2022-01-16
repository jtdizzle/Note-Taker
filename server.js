// adding depenencies
const express = require("express");
const fs = require("fs");
const path = require('path');


//create unique port
const app = express();
const PORT = process.env.PORT || 3001;

//data parsing and activating port

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/apiRoutes')(app);

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);
