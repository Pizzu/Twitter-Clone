const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

//Give us access to environment variables
require('dotenv').config();

const middlewares = require('./middlewares');
const auth = require('./auth');
const api = require('./api'); 
const app = express();

//Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useCreateIndex: true, replicaSet: 'ClusterTwitterClone-shard-0'});

//Middlewares setup
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(middlewares.checkTokenSetUser);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/auth', auth);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;