const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const Dogs = require('./api/Dogs');
const config = require('./config');

mongoose.connect(config.dbURI.replace('<username>', config.dbUsername).replace('<password>', config.dbPassword));

const app = express();

app.use(bodyParser.json());
app.use('/api/dogs', Dogs);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});