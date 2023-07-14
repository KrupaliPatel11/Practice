module.exports = {

    // Add Member To Any Account
    createMember: async (req, res) => {
        const { email, accId } = req.body
        if (!email) { return res.send({ FAILED: "Email is required" }) }
        const user = await User.findOne({ email: email })
        const account = await Account.findOne({ id: accId })
        if (!user) {
            return res.send({ FAILED: "Email is invalid" })
        }
        const userId = req.userData.userId
        const memberId = user.id
        if (!account) {
            return res.send({ messsage: "Account not found" })
        }
        if (userId === memberId) {
            return res.send({ FAILED: "Member you want to add is owner of account" })
        }
        let acc = {
            accId: accId,
            memberId: memberId
        }
        const accMember = await AccountMember.findOne(acc)
        if (!accMember) {
            const memberId = user.id
            let account = {
                accId: accId,
                memberId: memberId
            }
            const accMember = await AccountMember.create(account).fetch()
            console.log(accMember);

            res.send({
                SUCCESS: "User is added",
                accMember: accMember
            })
        }
        else {
            res.send({ FAILED: "User is already added" })
        }
    },

    // Create A New Account
    createAccount: async (req, res) => {
        const acc = {
            accName: req.body.accName,
            userId: req.userData.userId
        }
        if (!acc.accName) { return res.send({ FAILED: "AccountName is required" }) }
        const Acc = await Account.find(acc)
        if (Acc.length >= 1) {
            res.send({
                FAILED: "Account is already created",
                Account: acc
            })
        } else {
            const account = await Account.create(acc)
            res.send({
                SUCCESS: "Account created",
                account: acc,
            })
        }
    },

    // Get of all account of logged in user
    list: async (req, res) => {
        const userId = req.userData.userId
        const memberId = req.userData.userId
        // console.log(userId); console.log(memberId);
        const response = await Account.find({ userId: userId })
        const accMemRes = await AccountMember.find({ memberId: memberId })
        res.send({
            SUCCESS: "All Accounts",
            totalAccount: response.length + accMemRes.length,
            account: response.length,
            Owner: response,
            member: accMemRes.length,
            AccountMember: accMemRes
        })
    },

    // Update an account
    update: async (req, res) => {
        const acc = {
            accName: req.body.accName,
            userId: req.userData.userId
        }
        if (!acc.accName) { return res.send({ FAILED: "AccountName is required" }) }
        const response = await Account.find({ accName: acc.accName, userId: acc.userId })
        console.log(response);
        if (response.length < 1) {
            return res.send({ FAILED: "Account is not found" })
        }
        if (req.body.accName == req.body.newAccName) {
            return res.send({ FAILED: "Try with another account name" })
        }
        else {
            const account = await Account.find({ accName: req.body.newAccName, userId: acc.userId })
            if (account.length >= 1) {
                return res.send({ FAILED: "Account Name is already exist." })
            }
            const updatedAccount = await Account.updateOne({ accName: req.body.accName, userId: acc.userId })
                .set({ accName: req.body.newAccName })
            return res.send({
                SUCCESS: "Account name updated successfully",
                updatedAccount: updatedAccount
            })
        }
    },

    // Delete an Account
    delete: async (req, res) => {
        const userId = req.userData.userId;
        const acc = {
            accName: req.body.accName,
        }
        if (!acc.accName) { return res.send({ FAILED: "AccountName is required" }) }
        const Acc = await Account.findOne(acc)
        if (!Acc) {
            res.send({ FAILED: "Account Not Found" })
        } else if (Acc.isDeleted == true) {
            res.send({ FAILED: "Account is not found or may be already deleted" })
        } if (Acc && Acc.isDeleted == false) {
            const delAccount = await Account.updateOne({ isDeleted: false, accName: acc.accName })
                .set({
                    isDeleted: true,
                    deletedBy: userId,
                    deletedAt: new Date()
                })
            res.send({
                SUCCESS: "Account deleted",
                deletedAccount: delAccount,

            })
            const accMem = await AccountMember.update({ isDeleted: false, accId: Acc.id })
                .set({
                    isDeleted: true,
                    deletedAt: new Date(),
                    deletedBy: userId
                })
            const trans = await Transaction.update({ isDeleted: false, accId: Acc.id })
                .set({
                    isDeleted: true,
                    deletedAt: new Date(),
                    deletedBy: userId
                })
        }
    }
}
