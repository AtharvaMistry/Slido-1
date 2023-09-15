const Profile = require('../Model/profile_model')

const create_profile = async (req, res) => {
    const { profile1 } = req.body;
    const obj = new Profile({
        profile1
    });
    try {
        const data = await obj.save();
        res.status(201).send({ Message: 'Profile Created Successfully', data });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
    }
}

const view_all = async (req, res) => {
    try {
        const data = await Profile.find()
        res.status(201).send({ Message: 'Ok', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const update_profile = async (req, res) => {
    const { id } = req.params
    try {
        const existing = Profile.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Profile Not Found' })
        }
        const data = await Profile.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Profile Updated Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_profile = async (req, res) => {
    const { id } = req.params
    try {
        const existing = Profile.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'Profile Not Found' })
        }
        let data = await Profile.findByIdAndDelete(id)
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Profile Deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_profile, view_all, update_profile, delete_profile }