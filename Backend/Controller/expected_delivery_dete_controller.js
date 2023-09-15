const { expected_delivery_date } = require('../Model/expected_delivery_dete_model')

const create_expected_delivery_date = async (req, res) => {
    const {
        name
    } = req.body
    const obj = new expected_delivery_date({
        name
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'expected_delivery_date Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await expected_delivery_date.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_expected_delivery_date = async (req, res) => {
    const { id } = req.params
    try {
        const existing = expected_delivery_date.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'delivery date Not Found' })
        }
        const data = await expected_delivery_date.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'delivery date Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_expected_delivery_date = async (req, res) => {
    const { id } = req.params
    try {
        const existing = expected_delivery_date.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'delivery date Not Found' })
        }
        let data = await expected_delivery_date.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'delivery date Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_expected_delivery_date, view_all, update_expected_delivery_date, delete_expected_delivery_date }