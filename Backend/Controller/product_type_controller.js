const { product_type } = require('../Model/product_type_model')

const create_product_type = async (req, res) => {
    const {
        name
    } = req.body
    const obj = new product_type({
        name
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'product_type Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await product_type.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_product_type = async (req, res) => {
    const { id } = req.params
    try {
        const existing = product_type.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Product Type Not Found' })
        }
        const data = await product_type.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Product Type Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_product_type = async (req, res) => {
    const { id } = req.params
    try {
        const existing = product_type.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Product Type Not Found' })
        }
        let data = await product_type.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Product Type Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_product_type, view_all, update_product_type, delete_product_type }