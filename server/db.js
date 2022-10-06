let budget = {
    totalBudget: 3000,
    envelopes: [
        {
            name: 'pocket money',
            balance: 3000,
            info: 'First envelope',
            transaction: ['First envelope added'],
            id: 1,
        },
        {
            name: 'small money',
            balance: 2000,
            info: 'second envelope',
            transaction: ['second envelope added'],
            id: 2,
        },

    ],
    findTotalBudget() {
        let newBudget = 0;
        this.envelopes.forEach((env) => {
            newBudget += env.balance;
        })
        this.totalBudget = newBudget; 
    }
}

function getNewId() {
    return (budget.envelopes.length + 1);
}



function generateEnvelope(name, balance, info) {
    const newEnvelope = {
        name: name,
        balance: balance,
        info: info,
        transaction: ['Add envelope'],
        id: getNewId()
    }

    budget.envelopes.push(newEnvelope);
    budget.findTotalBudget();
}

function getEnvelopeById(id) {
    const envelopeFound = budget.envelopes.find(envelope => envelope.id == id);
    if (envelopeFound) {
        return envelopeFound;
    } else {
        return 'no envelope';
    }
}

function updateEnvelopeById(id, name, balance, info, transaction) {
    let envelopeToUpdate = getEnvelopeById(id);
    if (name) {
        envelopeToUpdate.name = name;
    }
    
    if (balance) {
        envelopeToUpdate.balance = balance;
    }

    if (info) {
        envelopeToUpdate.info = info;
    }

    if (transaction) {
        envelopeToUpdate.transaction = transaction;
    }
    return envelopeToUpdate;
}

function updateTransactionById (id, action, changeNum) {
    const envelopeToUpdate = getEnvelopeById(id);
    if (action == 'spend') {
        const newBalance = envelopeToUpdate.balance - changeNum;
        if (newBalance < 0) {
            return 'overspend';
        } else {
            envelopeToUpdate.balance = newBalance;
        }
    } else {
        envelopeToUpdate.balance += changeNum;
    }
    envelopeToUpdate.transaction.push(`${action} money: ${changeNum}`);
    return envelopeToUpdate;
}  

function deleteEnvelopeById(id) {
    budget.envelopes.splice(id-1, 1);
    return budget.envelopes;
}

function transferById(giverId, receiverId, changeNum){
    const giver = getEnvelopeById(giverId);
    const receiver = getEnvelopeById(receiverId);
    if (changeNum == undefined){
        receiver.balance += giver.balance;
        giver.balance = 0;
    } else if (changeNum > giver.balance) {
        return('changeNum exceeded')
    } else {
        receiver.balance += changeNum;
        giver.balance -= changeNum;
    }

    return [giver, receiver];
}

module.exports = {budget, generateEnvelope, getEnvelopeById, updateEnvelopeById, updateTransactionById, deleteEnvelopeById, transferById};