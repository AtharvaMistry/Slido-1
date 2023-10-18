import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function SalesOrder() {
    // const ApprovedCustomer = useSelector((state) => state.approvedCustomers);
    // console.log(ApprovedCustomer,"ApprovedCustomer");
    const approvedCustomers = useSelector((state) => state.value);
    const handleList = () => {
        console.log(approvedCustomers, 'approvedCustomers');
    }
    return (
        <>
            <Link to="/" >
                <div className='flex justify-start items-center w-fit hover:text-[#1b98f5] mb-5'>
                    <i class="fa fa-arrow-left me-2" aria-hidden="true"></i>
                    <p className='text-sm font-medium md:text-lg xl:text-xl'>Sales Order</p>
                </div>
            </Link>
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
                    {/* 
                    {approvedCustomers.map((customer, index) => (
                        <tr key={index} className='border-b'>
                            <td className='text-sm py-4 lg:text-lg'>{customer.Customer_name}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.Location_Name}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.date}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.payment_option}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.transaction_No}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.amount_recived_from}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.recived_amount}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.remarks}</td>
                            <td className='text-sm py-4 lg:text-lg'>{customer.total_amount}</td>
                            <td className='text-sm py-4 lg:text-lg'>
                            </td>
                        </tr>
                    ))} */}
                </table>
            </div>
            <button onClick={handleList}>Button</button>
        </>
    )
}

export default SalesOrder