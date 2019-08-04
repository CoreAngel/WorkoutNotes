const express = require('express');
const appConfig = require('./config');

appConfig();
const app = express();

app.listen(3000, () => {
    console.log('Listen on the port 3000');
});
