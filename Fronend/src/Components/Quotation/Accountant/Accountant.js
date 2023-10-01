import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import StatusAccount from './StatusAccount';
function Accountant() {


    // const [quotation, setQuotaion] = useState([]);
    // const fetchData = () => {
    //     axios.get("http://localhost:8000/api/viewQuote")
    //         .then(res => {
    //             setQuotaion(res.data.data);
    //             console.log(res.data.data, "quotation");
    //         })
    //         .catch(err => {
    //             console.error('error fetching data:', err);
    //         });
    // }

    const [Account, setAccount] = useState([]);
    const AccountData = () => {
        axios.get("http://localhost:8000/api/payment")
            .then(res => {
                setAccount(res.data.data);
                console.log(res.data.data,"Account");
            })
            .catch(err => {
                console.error('error fetching data:', err);
            });
    }

    const handleRefreshClick = () => {
        setFilterData("");
        setFilteredData([]);
        // fetchData();
        AccountData();
        
    }

    useEffect(() => {
        // fetchData();
        AccountData();
    }, [])

    // todo filter
    // filter
    const [filteredData, setFilteredData] = useState([]);
    const [filterData, setFilterData] = useState("");


    const handleFilter = () => {
        if (filterData.trim() === "") {
            setFilteredData([]);
        } else {
            const filteredCustomers = Account.filter(
                customer =>
                    (customer.Customer_name && customer.Customer_name.toLowerCase().includes(filterData.toLowerCase()))

            );
            setFilteredData(filteredCustomers);
        }
    };

    // todo
    const [Accountant, setAccountant] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleOk = () => {
        console.log(Accountant, "Accountant3123");
        if (validateForm()) {
            setIsModalOpen(false);
            setAccountant(
                {
                    name: "",
                    email: "",
                    password: ""
                }
            )
        }
    }
    // todo
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const validateForm = () => {
        let valid = true;

        if (Accountant.name === '' || /\d/.test(Accountant.name)) {
            setNameError('Name must not be empty and should not contain numbers');
            valid = false;
        } else {
            setNameError('');
        }

        if (
            Accountant.email === '' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Accountant.email)
        ) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (Accountant.password === '' || Accountant.password.length !== 8) {
            setPasswordError('Password must be 8 characters long');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };


    const onInputChange = (e) => {
        const { name, value } = e.target;
        setAccountant((prevData) => ({
            ...prevData,
            [name]: value
        })
        )
    }

    return (
        <div className="container min-w-full">
            <div className="grid place-content-end">
                <div className="grid grid-cols-2 mb-10">
                    <div>
                        <button className='text-white text-lg px-3 shadow-md py-1 rounded-md border bg-[#1b98f5] max-w-[150px]' onClick={showModal}>Verify your account</button>

                        <Modal title="Verify Your Account" open={isModalOpen} onOk={handleOk} width={1000} onCancel={handleCancel}>
                            <div>

                                <div className='text-lg mb-5'>
                                    <label htmlFor="">Name</label><br />
                                    <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="text" name='name' value={Accountant.name} onChange={onInputChange} />
                                    <div className="text-red-500">{nameError}</div>
                                </div>

                                <div className='text-lg mb-5'>
                                    <label htmlFor="">Email</label><br />
                                    <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="email" name='email' value={Accountant.email} onChange={onInputChange} />
                                    <div className="text-red-500">{emailError}</div>
                                </div>

                                <div className='text-lg mb-5'>
                                    <label htmlFor="">Password</label><br />
                                    <input className='border border-black px-2 py-1 rounded-md w-[70%]' type="password" name='password' value={Accountant.password} onChange={onInputChange} />
                                    <div className="text-red-500">{passwordError}</div>
                                </div>

                            </div>
                        </Modal>
                    </div>

                    <div>
                        <div className='flex justify-start items-center'>
                            <input type="text" className='border-2 p-2 w-full text-sm rounded-sm focus:border-[#1b98f5] outline-none' value={filterData}
                                onChange={(e) => setFilterData(e.target.value)} name="pincode" />
                            <button className='border-2 p-2 text-sm rounded-sm focus:border-[#1b98f5] outline-none' onClick={handleFilter}>Filter</button>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>(Filter by Name)</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className='drawer bg-white p-5 rounded-md overflow-x-scroll  border hover:shadow-md'>
                <table className='w-full '>
                    <thead>
                        <tr className='bg-[#f6f6f6] text-sm font-light text-black lg:text-lg'  >
                            <th className='py-5 text-start border-e  px-1'>Customer Name</th>
                            <th className='py-2 text-start border-e  px-1'>Location Name</th>
                            <th className='py-2 text-start border-e  px-1'>Date</th>
                            <th className='py-2 text-start border-e  px-1'>Payment Option</th>
                            <th className='py-2 text-start border-e  px-1'>Transaction No.</th>
                            <th className='py-2 text-start border-e  px-1'>Amount Recieved from</th>
                            <th className='py-2 text-start border-e  px-1'>Recieved Amount</th>
                            <th className='py-2 text-start border-e  px-1'>Remark</th>
                            <th className='py-2 text-start border-e  px-1'>Total Cost</th>
                            <th className='py-2 text-start border-e  px-1'>Status</th>
                        </tr>
                    </thead>
                    {(filteredData.length > 0 ? filteredData : Account).map((Account, index) =>
                        <tr key={index} className='border-b'>
                            <td className='text-sm py-4 lg:text-lg'>{Account.Customer_name}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.Location_Name}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.date}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.payment_option}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.transaction_No}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.amount_recived_from}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.recived_amount}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.remarks}</td>
                            <td className='text-sm py-4 lg:text-lg'>{Account.total_amount}</td>
                            <td className='text-sm py-4 lg:text-lg'>
                                <StatusAccount/>
                            </td>

                        </tr>)}
                </table>


            </div>
        </div>
    )
}

export default Accountant