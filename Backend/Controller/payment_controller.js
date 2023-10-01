const { Payment } = require('../Model/payment_model')

const create_Payment = async (req, res) => {
    const {
        payment_option,
        date,
        transaction_No,
        amount_recived_from,
        recived_amount,
        remarks,
        total_amount
    } = req.body
    const obj = new Payment({
        payment_option,
        date,
        transaction_No,
        amount_recived_from,
        recived_amount,
        remarks,
        total_amount
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'Payment Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await Payment.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_Payment = async (req, res) => {
    const { id } = req.params
    try {
        const existing = Payment.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'lock type Not Found' })
        }
        const data = await Payment.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'lock type Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_Payment = async (req, res) => {
    const { id } = req.params
    try {
        const existing = Payment.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'lock type Not Found' })
        }
        let data = await Payment.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'lock type Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_Payment, view_all, update_Payment, delete_Payment }