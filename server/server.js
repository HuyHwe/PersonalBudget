const express = require('express');
const {budget, generateEnvelope} = require('./db');
const PORT = process.env.PORT || 3001;
const app = express();
const envelopeRouter = require('./envelopeRouter.js');


app.use('/envelope', envelopeRouter);

app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    }
})


app.listen(PORT, () => {
    console.log('listening to port '+ PORT);
})