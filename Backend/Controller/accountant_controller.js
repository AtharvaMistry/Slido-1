const { Accountant } = require('../Model/accountant_model')
const Auth = require('./Auth.controller')

const create_Accountant = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    const obj = new Accountant({
        name,
        email,
        password: Auth.hashpassword(password)
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'Accountant Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await Accountant.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_Accountant = async (req, res) => {
    const { id } = req.params
    try {
        const existing = Accountant.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'lock type Not Found' })
        }
        const data = await Accountant.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'lock type Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_Accountant = async (req, res) => {
    const { id } = req.params
    try {
        const existing = Accountant.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'lock type Not Found' })
        }
        let data = await Accountant.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'lock type Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_Accountant, view_all, update_Accountant, delete_Accountant }