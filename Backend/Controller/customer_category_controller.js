const { customer_category } = require('../Model/customer_category_model')

const create_customer_category = async (req, res) => {
    const {
        name
    } = req.body
    const obj = new customer_category({
        name
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'customer_category Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await customer_category.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_customer_category = async (req, res) => {
    const { id } = req.params
    try {
        const existing = customer_category.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Customer Category Not Found' })
        }
        const data = await customer_category.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Customer Category Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_customer_category = async (req, res) => {
    const { id } = req.params
    try {
        const existing = customer_category.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Customer Category Not Found' })
        }
        let data = await customer_category.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Customer Category Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_customer_category, view_all, update_customer_category, delete_customer_category }