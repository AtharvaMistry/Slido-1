const { lock_type } = require('../Model/lock_type_model')

const create_lock_type = async (req, res) => {
    const {
        lockType
    } = req.body
    const obj = new lock_type({
        lockType
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'lock_type Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await lock_type.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_lock_type = async (req, res) => {
    const { id } = req.params
    try {
        const existing = lock_type.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'lock type Not Found' })
        }
        const data = await lock_type.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'lock type Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_lock_type = async (req, res) => {
    const { id } = req.params
    try {
        const existing = lock_type.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'lock type Not Found' })
        }
        let data = await lock_type.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'lock type Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_lock_type, view_all, update_lock_type, delete_lock_type }