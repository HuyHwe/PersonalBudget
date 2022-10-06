const express = require('express');


function changeParser (req, res, next){
    const action = req.query.action;
    const changeNum = Number(req.query.changeNum);
    if (!action || (action != "spend" && action != "add" && action != 'changeInfo')) {
        const err = new Error('please input action of spend, add or change info');
        err.status = 400;
        return next(err);        
    } else if (action == "spend" || action == "add") {
        if (!changeNum) {
            const err = new Error('please input change number');
            err.status = 400;
            return next(err);
        }

        req.action = action;
        req.changeNum = changeNum;
        next();
    } else if (action == 'changeInfo') {
        req.action = action;
        req.name = req.query.name;
        req.balance = Number(req.query.balance);
        req.info = req.query.info;
        req.transaction = req.query.transaction;
        next();
    }
    
}
function addEnvParser (req, res, next){
    const name = req.query.name;
    const balance = req.query.balance;
    const info = req.query.info;
    if (!name) {
        const err = new Error('please input name');
        err.status = 400;
        return next(err);        
    }
    if (!balance || Number.isNaN(Number(balance))) {
        const err = new Error('please input balance number');
        err.status = 400;
        return next(err);        
    }
    if (!info) {
        const err = new Error('Please enter envevlope info');
        err.status = 400;
        return next (err);
    }

    req.name = name;
    req.balance = Number(balance);
    req.info = info;
    next();
}

function transferParser(req, res, next) {
    const giverId = Number(req.query.giverId);
    const receiverId = Number(req.query.receiverId);
    let changeNum;
    if (req.query.changeNum){
        changeNum = Number(req.query.changeNum);
    } else {
        changeNum = undefined;
    }

    if (typeof giverId == 'number' && typeof receiverId == 'number' && (changeNum == undefined || typeof changeNum == 'number')) {
        req.giverId = giverId;
        req.receiverId = receiverId;
        req.changeNum = changeNum;
        next();
    } else {
        const err = new Error('please input giver id, receiver id and change number');
        err.status(400);
        next(err);
    }
}

module.exports = {addEnvParser, changeParser, transferParser};