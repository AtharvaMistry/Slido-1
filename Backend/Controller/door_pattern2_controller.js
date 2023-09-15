const { door_pattern2 } = require('../Model/door_pattern2_model')

const create_door_pattern2 = async (req, res) => {
    const {
        door_patter2
    } = req.body
    const obj = new door_pattern2({
        door_patter2
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'door_pattern2 Created Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const view_all = async (req, res) => {
    try {
        const data = await door_pattern2.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_door_pattern2 = async (req, res) => {
    const { id } = req.params
    try {
        const existing = door_pattern2.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Door Pattern2 Not Found' })
        }
        const data = await door_pattern2.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Door Pattern2 Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_door_pattern2 = async (req, res) => {
    const { id } = req.params
    try {
        const existing = door_pattern2.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Door Pattern2 Not Found' })
        }
        let data = await door_pattern2.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Door Pattern2 Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_door_pattern2, view_all, update_door_pattern2, delete_door_pattern2 }