import React from 'react';
import "./Style.css";
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Customer from './Customer';
import Invoice from './Invoice';
// import Quote from './Quote';
import PaymentInvoice from './PaymentInvoice';
import Employees from './Employees';
import Admin from './Admin';
import Settings from './Settings';
import AddCustomer from './Customer/AddCustomer';
import AddBusiness from './Customer/AddBusiness';
import Quote1 from './Quotation/Quote1';
import OPR from './OPR';
import AddNewQuote from './Quotation/AddNewQuote';
import MasterData from './MasterData/MasterData';
import UpdateCustomer from './Customer/UpdateCustomer';
import Profile from './MasterData/Profile';
import Pattern from './MasterData/Pattern';
import Design from './MasterData/Design';
import Room from './MasterData/Room';
import ProductType from './MasterData/ProductType';
import Quatation from './Quotation/Quatation';
import Inserts from './MasterData/Inserts';
import Color from './MasterData/Color';
import Accountant from './Quotation/Accountant';
import AccountantLogic from './Quotation/AccountantLogic';
import SalesOrder from './SalesOrder/SalesOrder';

function Layout1() {

    return (

        <>
            <div className="container min-w-full">
                <div className="grid grid-cols-12 gap-y-5">

                    {/* header */}
                    <div className="col-span-12 grid grid-cols-12 py-1 px-3 mx-auto border-b border shadow-md lg:py-2">
                        <div className='col-span-2 flex justify-center items-center border-e border-black pe-1'>
                            <img src="/Images/Slido.png" alt="" className='max-w-40 sm:w-[60%] md:w-[50%] lg:w-[60%] xl:w-[60%] 2xl:w-[50%]' />
                        </div>

                        <div className="col-span-10 min-w-full overflow-x-auto drawer">
                            <div className="px-2 h-full flex justify-around items-center min-w-max gap-5">
                                <Link to="/">
                                    <div className='flex shrink-0 justify-start items-center text-gray-600 text-sm hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-desktop me-3" aria-hidden="true"></i>
                                        <p className='font-medium '>Dashboard</p>
                                    </div>
                                </Link>

                                <Link to="/customer">

                                    <div className='flex shrink-0 justify-start  text-sm items-center text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-user  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Customer</p>
                                    </div>
                                </Link>

                                <Link to="/invoice">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-sticky-note  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Invoice</p>
                                    </div>
                                </Link>

                                <Link to="/quote1">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-sticky-note  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Quote</p>
                                    </div>
                                </Link>

                                <Link to="/payment">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-credit-card-alt  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Payment Invoice</p>
                                    </div>
                                </Link>


                                <Link to="/account">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-user  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Accountant</p>
                                    </div>
                                </Link>


                                <Link to="/employee">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-user  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Employee</p>
                                    </div>
                                </Link>

                                <Link to="/masterData">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-users  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Master Data</p>
                                    </div>
                                </Link>
                                <Link to="/sales-order">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-users  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Sales Order</p>
                                    </div>
                                </Link>
                                <Link to="/opr">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-users  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>OPR</p>
                                    </div>
                                </Link>

                                <Link to="/admin">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-users  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Admin</p>
                                    </div>
                                </Link>


                                <Link to="/setting">
                                    <div className='flex shrink-0 justify-start items-center text-sm text-gray-600 hover:text-black hover:duration-500 lg:text-xl xl:text-xl 2xl:text-2xl'>
                                        <i class="fa fa-cog  me-3" aria-hidden="true"></i>
                                        <p className='font-medium  '>Setting</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>


                    {/* section - 2 */}


                    <div className='fixed bottom-3 right-3 min-w-[200px]'>
                        <div className=' text-3xl flex justify-between items-center text-sm bg-white px-2 py-1 rounded-full border'>
                            <i class="fa fa-bell border p-2 rounded-full  hover:border-[#1b98f5]" aria-hidden="true"></i>
                            <i class="fa fa-th-large border p-2 rounded-full  hover:border-[#1b98f5]" aria-hidden="true"></i>
                            <i class="fa fa-user-circle border p-2 rounded-full  hover:border-[#1b98f5]" aria-hidden="true"></i>
                        </div>
                    </div>


                    {/* content */}
                    <div className="col-span-12 px-5 pb-20">

                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            {/* customer */}
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/addCustomer" element={<AddCustomer />} />
                            <Route path="/updateCustomer" element={<UpdateCustomer />} />

                            <Route path="/addBusiness" element={<AddBusiness />} />

                            {/* invoice */}
                            <Route path="/invoice" element={<Invoice />} />
                            <Route path="/quote1" element={<Quote1 />} />
                            {/* <Route path="/addNewQuote" element={<AddNewQuote />} /> */}
                            <Route path="/addNewQuote" element={<Quatation />} />

                            {/* <Route path="/quote" element={<Quote />} /> */}
                            <Route path="/payment" element={<PaymentInvoice />} />
                            <Route path="/opr" element={<OPR />} />

                            {/* master data */}
                            <Route path="/masterData" element={<MasterData />} />
                            <Route path="/profileMD" element={<Profile />} />
                            <Route path="/patternMD" element={<Pattern />} />
                            <Route path="/designMD" element={<Design />} />
                            <Route path="/roomMD" element={<Room />} />
                            <Route path="/insertMD" element={<Inserts />} />
                            <Route path="/color" element={<Color />} />
                            <Route path="/account" element={<AccountantLogic />} />
                            <Route path="/productTypeMD" element={<ProductType />} />


                            <Route path="/employee" element={<Employees />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/setting" element={<Settings />} />
                            <Route path="/sales-order" element={<SalesOrder />} />


                        </Routes>
                    </div>


                </div>
            </div>
        </>

    )
}

export default Layout1