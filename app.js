const express = require('express');
const appConfig = require('./config');

const authRouter = require('./routes/auth');

appConfig();
const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('Listen on the port 3000');
});
