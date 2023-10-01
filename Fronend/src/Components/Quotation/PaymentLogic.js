import React, { useState } from 'react'
import Payment1 from './Payment'
import axios from 'axios'
function PaymentLogic({ userId }) {
    const [Payment, setPayment] = useState({
        payment_option: "",
        date: "",
        transaction_No: "",
        amount_recived_from: "",
        recived_amount: 0,
        remarks: "",
        total_amount: 0,
        Customer_name: "",
        Location: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayment((prevData) => ({
            ...prevData,
            [name]: value,
        })
        )
    }

    console.log(Payment, "Payment");

    const submitPayment = () => {
        axios.post("http://localhost:8000/api/payment", Payment)
            .then((res) => {
                console.log('Payment submitted successfully!', res.data);
            }
            )
            .catch(
                (err) => {
                    console.error('error', err)
                }
            )
    }


    return (
        <>
            <Payment1
                Payment={Payment}
                onInputChange={handleInputChange}
                onOk={submitPayment}
            />

        </>
    )
}

export default PaymentLogic