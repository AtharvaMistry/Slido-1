import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import axios from 'axios';


function Payment({ Payment, onInputChange, onOk, userId }) {
    // todo message
    const [messageApi, contextHolder] = message.useMessage();

    // todo modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/viewQuote')
            .then((response) => {
                setUsers(response.data.data);
                console.log(response.data.data, "users");
                console.log(users);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);


    const showModal = (users, condition) => {
        setIsModalOpen(true);

        // const selectedUserData = users.find((user) => user.Customer_name === condition);
        // if (selectedUserData) {
        //     setSelectedUser(selectedUserData);
        //     setPayment((prevData) => ({
        //         ...prevData,
        //         total_amount: selectedUserData.total_cost,
        //     }));
        //     console.log('Selected User ID:', selectedUser._id);
        // } else {
        //     console.error('User not found');
        // }
    };

    const handleSubmit = () => {
        onOk();
        messageApi.info('Payment submitted successfully !');
        console.log(Payment, "PaymentSubmit");
        setIsModalOpen(false);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // todo state
    console.log(Payment, "Payment");


    return (
        <>
            <>
                {contextHolder}
                <Button type="primary" onClick={showModal}>
                    Payment Methods
                </Button>
                <Modal title="Paymen Options" open={isModalOpen} onOk={handleSubmit} width={1000} onCancel={handleCancel}>
                    <div className='text-lg mb-5'>
                        <label htmlFor="">Customer Name</label><br />
                        <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="text" name='Customer_name' value={Payment.Customer_name} onChange={onInputChange} />
                    </div>
                    <div className='text-lg mb-5'>
                        <label htmlFor="">Location</label><br />
                        <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="text" name='Location' value={Payment.Location} onChange={onInputChange} />
                    </div>
                    <div>
                        <select  id="payment_option" className='text-lg border px-2 py-1 border-black rounded-md' value={Payment.payment_option} name='payment_option' onChange={onInputChange}>
                            <optgroup label='Online'>
                                <option value="NEFT">NEFT</option>
                                <option value="Imps">Imps</option>
                                <option value="RTGS">RTGS</option>
                            </optgroup>
                            <option value="Card_swipe">Card Swipe</option>
                            <option value="PayU">PayU</option>
                            <option value="QR_scan">QR Scan</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className='grid grid-cols-2 mt-5'>

                        <div className='text-lg mb-5'>
                            <label htmlFor="">Date</label><br />
                            <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="date" name='date' value={Payment.date} onChange={onInputChange} />
                        </div>
                        <div className='text-lg mb-5'>
                            <label htmlFor="">Transaction No/Cheque No</label><br />
                            <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="text" name='transaction_No' value={Payment.transaction_No} onChange={onInputChange} />
                        </div>
                        <div className='text-lg mb-5'>
                            <label htmlFor="">Amount Recieved from</label><br />
                            <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="text" name='amount_recived_from' id='amount_recived_from' value={Payment.amount_recived_from} onChange={onInputChange} />
                        </div>
                        <div className='text-lg mb-5'>
                            <label htmlFor="">Recieved Amount</label><br />
                            <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="number" name='recived_amount' value={Payment.recived_amount} onChange={onInputChange} />
                        </div>
                        <div className='text-lg mb-5'>
                            <label htmlFor="">Remarks</label><br />
                            <textarea className='border border-black px-2 py-1 rounded-md w-[70%]' type="text" name='remarks' value={Payment.remarks} onChange={onInputChange} />
                        </div>
                        <div className='text-lg mb-5'>
                            <label htmlFor="">Total amount</label><br />
                            <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="number" name='total_amount' value={Payment.total_amount} onChange={onInputChange} />
                        </div>

                    </div>

                </Modal>
            </>
        </>
    )
}

export default Payment