const { Color_collection } = require('../Model/Color.model');

const addColor = async (req, res) => {
    const {
        color
    } = req.body
    const obj = new Color_collection({
        color
    })
    try {
        const data = await obj.save()
        res.status(201).send({ Message: 'Color Added Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const viewAllColor = async (req, res) => {
    try {
        const data = await Color_collection.find()
        res.status(200).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { addColor,viewAllColor }