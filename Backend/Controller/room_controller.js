const { room } = require('../Model/room_model');

const create_room = async (req, res) => {
    const { room: roomName } = req.body;
    const obj = new room({
        room: roomName
    });

    try {
        const data = await obj.save();
        res.status(201).send({ Message: 'Room Created Successfully', data });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
    }
}

const view_all = async (req, res) => {
    try {
        const data = await room.find();
        res.status(200).send({ Message: 'Ok', data });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
    }
}

const update_room = async (req, res) => {
    const { id } = req.params;
    try {
        const existing = await room.findById(id);
        if (!existing) {
            return res.status(404).send({ Message: 'Room Not Found' });
        }
        const data = await room.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send({ Message: 'Room Updated Successfully', data });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
    }
}

const delete_room = async (req, res) => {
    const { id } = req.params;
    try {
        const existing = await room.findById(id);
        if (!existing) {
            return res.status(404).send({ Message: 'Room Not Found' });
        }
        await room.findByIdAndDelete(id);
        res.status(200).send({ Message: 'Room Deleted Successfully' });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
    }
}

module.exports = { create_room, view_all, update_room, delete_room };
