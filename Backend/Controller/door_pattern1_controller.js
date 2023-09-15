const { door_pattern1 } = require('../Model/door_pattern1_model')

const create_door_pattern1 = async (req, res) => {
    const {
        door_patter1
    } = req.body
    const obj = new door_pattern1({
        door_patter1
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'door_pattern1 Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await door_pattern1.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_door_pattern1 = async (req, res) => {
    const { id } = req.params
    try {
        const existing = door_pattern1.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Door Pattern1 Not Found' })
        }
        const data = await door_pattern1.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Door Pattern1 Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_door_pattern1 = async (req, res) => {
    const { id } = req.params
    try {
        const existing = door_pattern1.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Door Pattern1 Not Found' })
        }
        let data = await door_pattern1.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Door Pattern1 Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_door_pattern1, view_all, update_door_pattern1, delete_door_pattern1 }