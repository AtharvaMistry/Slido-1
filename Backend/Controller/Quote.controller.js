const { quots } = require('../Model/Quote.model')
const create_quots = async (req, res) => {
    const {
        Customer_name,
        Location_Name,
        Date,
        Number_of_Door,
        Width,
        Height,
        Pattern,
        panelText,
        selectedProject,
        selectedSubOption,
        Profile,
        soft_close,
        total_cost
    } = req.body;

    const profileData = {
        selectedProject,
        selectedSubOption
    };

    const obj = new quots({
        Customer_name,
        Location_Name,
        Date,
        Number_of_Door,
        Width,
        Height,
        Pattern,
        soft_close,
        panelText,
        selectedProject,
        Profile,
        total_cost,
        profileData // Add the profileData object here
    });

    try {
        const data = await obj.save();
        res.status(201).send({ Message: 'Quots Created Successfully', data });
    } catch (error) {
        res.status(401).send({ Message: 'Something went wrong!!!' });
        console.log(error);
    }
};


const view_all = async (req, res) => {
    try {
        const data = await quots.find();
        console.log("data::",data)
        res.status(201).send({ Message: ' Get all Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const updateQuote = async (req, res) => {
    const { id } = req.params
    try {
        const existing = await quots.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'quots Not Found' })
        }
        const data = await quots.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'Quots Updatd Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

const delete_quots = async (req, res) => {
    const { id } = req.params
    try {
        const existing = await quots.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'quots Not Found' })
        }
        let data = await quots.findByIdAndDelete()
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'Quots deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}

module.exports = { create_quots, view_all, updateQuote, delete_quots }                                                