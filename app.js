const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

app.get('/');
