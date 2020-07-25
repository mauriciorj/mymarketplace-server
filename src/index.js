const dotenv = require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const myProjectRoutes = express.Router();

//Import Routes
let catalogRoutes = require('./routes/catalog');

const app = express();
const PORT = process.env.MONGOOSE_PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

//Use Routes
app.use(catalogRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});