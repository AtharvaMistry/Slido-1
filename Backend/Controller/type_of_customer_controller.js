const { customer_type } = require('../Model/type_of_customer_model')

const create_customer_type = async (req, res) => {
    const {
        name
    } = req.body
    const obj = new customer_type({
        name
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'customer_type Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await customer_type.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_customer_type = async (req, res) => {
    const { id } = req.params
    try {
        const existing = customer_type.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Customer Type Not Found' })
        }
        const data = await customer_type.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Customer Type Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_customer_type = async (req, res) => {
    const { id } = req.params
    try {
        const existing = customer_type.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Customer Type Not Found' })
        }
        let data = await customer_type.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Customer Type Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_customer_type, view_all, update_customer_type, delete_customer_type }