const { design_collection } = require('../Model/design_collection_model')

const create_design_collection = async (req, res) => {
    const {
        design
    } = req.body
    const obj = new design_collection({
        design
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'design_collection Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await design_collection.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_design_collection = async (req, res) => {
    const { id } = req.params
    try {
        const existing = design_collection.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Design Not Found' })
        }
        const data = await design_collection.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Design Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_design_collection = async (req, res) => {
    const { id } = req.params
    try {
        const existing = design_collection.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Design Not Found' })
        }
        let data = await design_collection.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Design Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_design_collection, view_all, update_design_collection, delete_design_collection }