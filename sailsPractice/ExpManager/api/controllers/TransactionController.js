module.exports = {
    
    // Add Transaction
    add: async (req, res) => {
        const { accId, amount, status, description, transactionDate } = req.body
        const userId = req.userData.userId

        if(!amount) {return res.send({FAILED : "Amount is required"})}
        if(!description) {return res.send({FAILED : "Description is required"})}
        if(!status) {return res.send({FAILED : "Status is required"})}

        let account = await Account.findOne({ userId: userId, id: accId })
        console.log(account);
        if (!account) {
            const member = await AccountMember.findOne({ accId: accId, memberId: userId })
            console.log(member);
            if (member) {
                account = await Account.findOne({ id: accId })
            } else {
                return res.send({
                    FAILED: "Account not found"
                })
            }
        }
        // console.log(account);
        const availBalance = account.balance
        // console.log(availBalance);
        const stat = status
        // console.log(stat);
        if (stat !== 'income' && stat !== 'expense') {
            return res.send({
                FAILED: "Please enter valid status"
            })
        }
        if (stat === 'expense' && availBalance <= 0) {
            return res.send({
                FAILED: "Insufficient balance in your account"
            })
        }
        if (stat === 'expense' && availBalance < req.body.amount) {
            return res.send({
                FAILED: "Available balance is less than entered amount",
                availBalance: availBalance
            })
        }
        if (amount <= 0) {
            return res.send({
                FAILED: "Amount should be greater than zero"
            })
        }
        else {
            const newTransaction = await Transaction.create({
                accId: accId,
                amount: amount,
                status: status,
                description: description,
                transactionDate: transactionDate,
                userId: userId
            })
                .fetch()
            console.log(newTransaction.amount);
            res.send(newTransaction)

            if (stat === 'income') {
                const newBalance = await Account.updateOne({ balance: availBalance, id: accId })
                    .set({
                        balance: availBalance + newTransaction.amount
                    })
                    console.log(newBalance);
            } 
            else {
                const newBalance = await Account.updateOne({ balance: availBalance, id: accId })
                    .set({
                        balance: availBalance - newTransaction.amount
                    })
            }
        }
    },

    // Edit Transaction
    update: async (req, res) => {
        const { amount, transId, description } = req.body
        const userId = req.userData.userId
        if(!transId) {return res.send({FAILED : "Transaction ID is required"})}
        if(!amount) {return res.send({FAILED : "Amount is required"})}
        if(!description) {return res.send({FAILED : "Description is required"})}
        
        const owner = await User.findOne({ id: userId })
        const member = await AccountMember.findOne({ memberId: userId })
        console.log(owner);
        if (owner || member) {
            const trans = await Transaction.findOne({ userId: userId, id: transId })
            const account = await Account.findOne({ id: trans.accId })
            const availBalance = account.balance
            const stat = trans.status
            const am = trans.amount
            // console.log(am); console.log(availBalance); console.log(stat); console.log(am);
            if (amount <= 0) {
                return res.send({
                    FAILED: "Amount should be greater zero"
                })
            }
            if (stat === 'expense' && availBalance <= 0) {
                return res.send({
                    FAILED: "Insufficient Balance",
                    availBalance: availBalance
                })
            }
            else {
                const updatedTrans = await Transaction.updateOne({
                    amount: trans.amount,
                    description: trans.description,
                })
                    .set({
                        amount: amount,
                        description: description,
                        updatedBy: userId
                    })
                res.send({
                    SUCCESS: "Transaction updated sucessfully",
                    updatedTrans: updatedTrans
                })
                if (stat == 'expense') {
                    const upAcc = await Account.updateOne({ id: trans.accId })
                        .set({ balance: (availBalance + am) - amount })
                }
                if (stat == 'income') {
                    const upAcc = await Account.updateOne({ id: trans.accId })
                        .set({ balance: parseFloat((availBalance - am)) + parseFloat(amount) })
                }
            }
        }
    },

    // Delete Transaction
    delete: async (req, res) => {
        const userId = req.userData.userId
        const transId = req.body.transId

        if(!transId){return res.send({FAILED : "Transaction Id is required"})}

        const trans = await Transaction.findOne({ id: transId, userId: userId })
        if (!trans) {
            return res.send({
                FAILED: "Transaction ID is not found"
            })
        }
        const account = await Account.findOne({ id: trans.accId })
        const availBalance = account.balance
        const stat = trans.status
        const amount = trans.amount
        if (stat === 'income' && availBalance < amount) {
            return res.send({
                FAILED: "Transaction cannot be deleted",
                availBalance: availBalance
            })
        }
        console.log(trans.isDeleted);
        if (trans.isDeleted == true) {
            res.send({
                FAILED: "Transaction is already deleted"
            })
        }
        else {
            const delTrans = await Transaction.updateOne({ isDeleted: false, id: transId, userId: userId })
            .set({ isDeleted: true, deletedAt: new Date(), deletedBy : userId })
            res.send({
                SUCCESS: "Transaction deleted successfully",
                delTrans: delTrans
            })
            if (stat === 'expense') {
                const upAcc = await Account.updateOne({ id: trans.accId })
                    .set({ balance: availBalance + amount })
            }
            if (stat === 'income') {
                const upAcc = await Account.updateOne({ id: trans.accId })
                    .set({ balance: availBalance - amount })
            }
        }
    },

    // List All Transaction
    list: async (req, res) => {
        const accId = req.body.accId

        if(!accId) {return res.send({FAILED : "Account ID is required"})}

        const account = await Account.find({ id: accId })
        console.log(account);
        const member = await AccountMember.find({ accId: accId })
        // console.log(member);
        if (account.length > 0 || member.length > 0) {
            const trans = await Transaction.find({ id: accId, isDeleted: false })
            console.log(trans);
            return res.send({
                SUCCESS: "All transaction",
                Total_Transaction: trans.length,
                transaction: trans
            })
        } else {
            return res.send({
                FAILED: "Account Not Found"
            })
        }
    }
}
