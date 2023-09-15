const {material} = require('../Model/material_model');

const create_material = async (req, res) => {
    const { Material } = req.body;
    const obj = new material({
        Material
    });
    try {
        const data = await obj.save();
        res.status(201).send({ Message: 'Material Created Successfully', data });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
    }
}

const view_material = async (req, res) => {
    try {
        const data = await material.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_material = async (req, res) => {
    const { id } = req.params
    try {
        const existing = material.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'material Not Found' })
        }
        const data = await material.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'material Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_material = async (req, res) => {
    const { id } = req.params
    try {
        const existing = material.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'material Not Found' })
        }
        let data = await material.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'material Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_material, view_material, update_material, delete_material }
