const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const cors = require('cors');

const app = new express();

const PORT = 5000;
app.use(express.bodyParser());
app.use('/api', router);
app.use(cors());
app.options('*', cors());

app.listen(PORT, (err) => {
  if (err != null) {
    console.log(err);
  } else {
    console.log(`Server started on ${PORT}`);
  }
});

mongoose.connect('mongodb://localhost:27017/stack-mean').then(() => {
  console.log('Database is connected successfully...');
});
