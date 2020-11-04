/* eslint-disable no-console */
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongo = require('./config/mongo');

const { HOST, PORT } = process.env;

const port = PORT || 4000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

mongo.connect();

app.listen(port, () => {
  console.log('\x1b[32m', `[API] Server is running on Url: ${HOST}:${PORT}`);
});
