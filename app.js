const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api/auth', require('./routes/auth.routes'));
//app.get('/', (req, res) => res.json({ foo: 'bar' }));

const PORT = config.get('port');

async function start() {
   try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })
    app.listen(PORT, () => console.log(`App has been started on ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();

//mongoose.connect(config.get('mongoUri'));