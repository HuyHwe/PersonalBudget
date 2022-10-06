const express = require('express');
const app = express();
const envelopeRouter = express.Router();
const {addEnvParser, changeParser, transferParser} = require('./parser');
const {budget, generateEnvelope, getEnvelopeById, updateEnvelopeById, updateTransactionById, deleteEnvelopeById, transferById} = require('./db');

envelopeRouter.param('id', (req, res, next, id) => {
    req.id = Number(id);
    if (req.id == NaN) {
        const err = new Error('id must be a number');
        err.status = 404;
        next(err);
    } else if (req.id > budget.envelopes.length || req.id < 1) {
        const err = new Error('id invalid');
        err.status = 404;
        next(err);
    } else {
        next();
    }
})

envelopeRouter.get('/', (req, res, next) => {
    res.status(200).send(budget.envelopes);
});

envelopeRouter.get('/:id', (req, res, next) => {
    const envelopeFound = getEnvelopeById(req.id);
    if (envelopeFound == 'no envelope'){
        const err = new Error('envelope not found')
        err.status = 404;
        next(err);
    } else {
        res.send(envelopeFound);
    }

})

envelopeRouter.post('/',addEnvParser, (req, res, next) => {
    generateEnvelope(req.name, req.balance, req.info);
    res.send(budget);
});

envelopeRouter.put('/:id', changeParser, (req, res, next) => {
    if (req.action == 'changeInfo') {
        const update = updateEnvelopeById(req.id, req.name, req.balance, req.info, req.transaction);
        res.send(update);
    } else {
        let update = updateTransactionById(req.id, req.action, req.changeNum);
        if (update == 'overspend'){
            const err = new Error('You are overspend the envelope');
            err.status = 400;
            next(err);
        } else {
            res.send(update);
        }
    }
})

envelopeRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteEnvelopeById(req.id);
    res.status(200).send(deleted);
})

envelopeRouter.post('/transfer',transferParser, (req, res, next) => {
    const transfer = transferById(req.giverId, req.receiverId, req.changeNum);
    if (transfer == 'changeNum exceeded') {
        const err = new Error("You can't transfer more money than you have");
        err.status = 400;
        next(err);
    } else {
        res.send(transfer);
    }
})


module.exports = envelopeRouter;