const userauth = require("../Model/Auth.model");
// const bcrypt = require("bcrypt");
// const bodyparser = require("body-parser");
const axios = require('axios');
const bcrypt = require('bcrypt')

exports.hashpassword = password => bcrypt.hashSync(password, salt)

exports.customerUser = async (req, res) => {
    try {
        const surname = req.body.surname;
        const name = req.body.name;
        const dealer_address = req.body.dealer_address;
        const city = req.body.city;
        const state = req.body.state;
        const pincode = req.body.pincode;
        const contact = req.body.contact;
        const email = req.body.email;
        const profession = req.body.profession;
        const at_home = req.body.at_home;
        const gst_number = req.body.gst_number;
        const customer_type = req.body.customer_type;


        const checkEmail = await userauth.findOne({ email: email });


        if (checkEmail == null) {
            const data = new userauth({
                surname: surname,
                name: name,
                dealer_address: dealer_address,
                city: city,
                state: state,
                pincode: pincode,
                contact: contact,
                email: email,
                profession: profession,
                at_home: at_home,
                gst_number: gst_number,
                customer_type: customer_type
            })
            const saveData = data.save();
            console.log(saveData);
            res.status(201).json({
                message: "data insert",
                status: 201,
                infoData: data
            })
        } else {
            res.status(409).json({
                message: "Mobile Number min-max 10 digit long, Please Try Again",
                status: 409
            })
        }
    }
    catch (error) {
        console.log("error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}
// view customer
exports.allCustomer = async (req, res) => {
    try {
        const viewall = await userauth.find();

        res.status(200).json({
            message: "View all customer",
            status: 200,
            data: viewall
        });
    } catch (error) {
        console.log("error::", error);
        res.status(500).json({
            message: "Somethin went wrong",
            status: 500
        })
    }
}

exports.CustomerByName = async (req, res) => {
    try {
        const { name } = req.params; // Get the query parameter from the request URL
        console.log("query:::", name)
        // Validate that query is a non-empty string before using it in the query
        if (typeof name !== 'string' || name.length === 0) {
            return res.status(400).json({
                message: "Invalid or empty query parameter",
                status: 400
            });
        }

        // Use Mongoose to search for customers with names containing the query
        const viewall = await userauth.find({
            name: { $regex: name, $options: 'i' } // Case-insensitive search
        });

        res.status(200).json({
            message: "View all customer",
            status: 200,
            data: viewall
        });
    } catch (error) {
        console.log("error::", error);
        res.status(500).json({
            message: "Something went wrong",
            status: 500
        });
    }
}



exports.update_cusomer = async (req, res) => {
    const { id } = req.params
    try {
        const existing = await userauth.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'customer Not Found' })
        }
        const data = await userauth.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).send({ Message: 'customer Updatd Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}



exports.delete_customer = async (req, res) => {
    const { id } = req.params
    try {
        const existing = await userauth.findById(id)
        if (!existing) {
            return res.status(404).send({ Message: 'userauth Not Found' })
        }
        let data = await userauth.findByIdAndDelete()
        data = {
            Message: 'Ok'
        }
        res.status(201).send({ Message: 'userauth deleted Successfully', data })
    } catch (error) {
        res.status(401).send({ Message: 'Something wait wrong!!!' })
    }
}







// business customer

exports.businessUser = async (req, res) => {
    const { gstin } = req.body;

    if (!gstin) {
        return res.status(400).json({ error: 'GSTIN is required' });
    }

    try {
        const response = await axios.get(
            `YOUR_API_ENDPOINT?gstin=${gstin}&apiKey=YOUR_API_KEY`
        );

        const userInfo = response.data; // Assuming the response contains user info
        res.json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user information' });
    }
}