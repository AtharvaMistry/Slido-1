import React, { useEffect, useState } from 'react'
import "../Style.css";
import { Modal } from 'antd';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfImg from './Image/pdfImage.png'
import footer from "./Image/footer.png"
import Status from './Status';

// todo: in modal, there are need to do change in input field

function Quote1() {
    //add customer
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };


    const [quotation, setQuotaion] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:8000/api/viewQuote")
            .then(res => {
                setQuotaion(res.data.data);
                console.log(res.data.data, "quotation");
            })
            .catch(err => {
                console.error('error fetching data:', err);
            });
    }
    
    const handleRefreshClick = () => {
        setFilterData("");
        setFilteredData([]);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])

// todo filter
    // filter
    const [filteredData, setFilteredData] = useState([]);
    const [filterData, setFilterData] = useState("");


    const handleFilter = () => {
        if (filterData.trim() === "") {
            setFilteredData([]);
        } else {
            const filteredCustomers = quotation.filter(
                customer =>
                    (customer.Customer_name && customer.Customer_name.toLowerCase().includes(filterData.toLowerCase()))

            );
            setFilteredData(filteredCustomers);
        }
    };

    // todo pdf

    const handlePDF = (quotationData) => {
        const pdf = new jsPDF();

        // Set the default font size and style
        pdf.setFontSize(12);
        pdf.setFont('helvetica');
        let yPos = 0;
        const imgWidth = 220; // Set the width of the image
        const imgHeight = 30; // Set the height of the image

        pdf.addImage(pdfImg, 'png', 0, yPos, imgWidth, imgHeight);
        // Add title to the PDF
        yPos += 40
        pdf.text(quotationData.Date, 195, yPos, { align: 'right' });

        // Add introductory lines
        const introText = [
            // `${quotationData.Date}`,
            `To:`,
            `${quotationData.Customer_name}`,
            `${quotationData.Location_Name}`,
            `Dear Sir / Madam,`,
            `Subject: Quotation for the Sliding Door shutters`,
            `We are very glad to offer you the quote for the Slido – Sliding Door Wardrobe Shutters`
        ];

        pdf.setFontSize(11);
        yPos += 10; // Initial Y position for intro text

        introText.forEach((line, index) => {
            if (index === 0 || index === 1 || index === 2 || index === 4) {
                pdf.setFont('helvetica', "bold");
            }
            else {
                pdf.setFont('helvetica', "normal");
            }
            pdf.text(line, 15, yPos, { align: 'left' });
            yPos += 6; // Increase Y position for the next line
        });

        // Add user data to the PDF

        const tableStyles = {
            fontSize: 10,
            fontStyle: 'normal',
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            cellPadding: 2,
            valign: 'middle',
            halign: 'left',
            fillColor: [255, 255, 255],
        };

        const headStyles = {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
        };

        const projectDetailsColumns = [
            'Sno',
            'Description',
            'Dimension',
            'MRP price(INR)',
            'Discounted Price(INR) 35%',
        ];

        const projectDetailsData = [];

        for (let i = 0; i < quotationData.panelText.length; i++) {
            projectDetailsData.push([i + 1, quotationData.panelText[i], `${quotationData.Width}(mm) Width\n${quotationData.Height}(mm) Height`, quotationData.total_cost]);
        }

        yPos += 2;
        pdf.autoTable({
            head: [projectDetailsColumns],
            body: projectDetailsData,
            startY: yPos,
            theme: 'plain',
            styles: tableStyles,
            headStyles: headStyles,
            margin: { top: -10 },
        });


        // Add Terms & Conditions
        const termsAndConditions = [
            "Terms & Conditions:",
            '1. Prices are inclusive of taxes',
            '2. Quotation valid for 7 working days.',
            '3. 50% advance payment to be made to place the order & Balance amount to be paid before delivery.',
            '4. Delivery within 15 working days from the date of advance receipt and confirmation of specifications.',
            '5. Specifications (insert materials, sizes) cannot be changed once approved since every order is custom-made.',
            '6. Outside Hyderabad city - sliding door Installation charges are extra on actuals.',
            '7. The company is not responsible for any damage of insert materials supplied by the buyer during transportation, fabrication & installation of goods.',
            '8. Dispatch of goods from the factory will be done in 24 hours after the final payment is received by us.',
        ];


        yPos = pdf.autoTable.previous.finalY + 10; // Position below the table

        termsAndConditions.forEach((line, index) => {
            if (index === 0) {
                pdf.setFont('helvetica', "bold");
            }
            else {
                pdf.setFont('helvetica', "normal");
            }
            const lines = pdf.splitTextToSize(line, pdf.internal.pageSize.width - 30);
            // Add each line to the PDF
            lines.forEach((textLine, lineIndex) => {
                pdf.text(textLine, 15, yPos + (lineIndex * 6), { align: 'left' });
            });

            // Update the Y position based on the number of lines added
            yPos += lines.length * 6;
        });
        yPos += 2
        // Manually control the positioning of Payment Details
        pdf.setFont('helvetica', "bold");
        pdf.text('Payment Details:', 15, yPos);

        const paymentDetails = [
            'Payee Name: SLIDO',
            'Current Account No: 50200037101691 | IFSC Code: HDFC0004277',
            'Bank: HDFC | Branch: Madhapur | City: Hyderabad',
        ];

        pdf.setFontSize(10);
        pdf.setFont('helvetica', "normal");
        pdf.text(paymentDetails.join('\n'), 15, yPos + 5);
        const imgW = 180;
        const imgH = 30;
        pdf.addImage(footer, 'png', 15, pdf.internal.pageSize.height - 30, imgW, imgH);
        pdf.save('quotation.pdf');
    };

    return (
        <div className="container min-w-full">
            <div className="grid ">
                <div className="grid grid-cols-1 gap-2 text-sm p-4 md:grid-cols-2 xl:grid-cols-4 xl:text-xl">
                    <Link to="/">
                        <div className='flex justify-start items-center hover:text-[#1b98f5]'>
                            <i class="fa fa-arrow-left me-2" aria-hidden="true"></i>
                            <p className=' font-medium'>Quote</p>
                        </div>
                    </Link>
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
                    <div>
                        <button className='text-black px-3 shadow-md py-1 text-sm rounded-md border hover:border-[#1b98f5]' onClick={handleRefreshClick}>Refresh</button>
                    </div>
                    <div>
                        <Link to="/addNewQuote">
                            <button className='text-white text-sm px-3 shadow-md py-1 rounded-md border bg-[#1b98f5] ' onClick={showModal1}>+ Add New Quotation</button>
                        </Link>
                        <Modal title="Add New Payment" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                            <div className="grid grid-cols-1 gap-3">

                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <p>Number</p>
                                        <input type="text" className='border w-full rounded-sm' />
                                    </div>
                                    <div>
                                        <p>Date</p>
                                        <input type="text" className='border w-full rounded-sm' />
                                    </div>


                                </div>


                                <div className="grid grid-cols-1 gap-2">
                                    <div>
                                        <p>Amount</p>
                                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>


                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <p>Payment Mode</p>
                                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>

                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <p>Reference</p>
                                        <input type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>

                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <p>Description</p>
                                        <textarea type="text" className='border w-full rounded-sm focus:border-[#1b98f5] outline-none' />
                                    </div>

                                </div>


                            </div>
                        </Modal>
                    </div>
                </div>

                <div className='drawer bg-white p-5 rounded-md overflow-x-scroll  border hover:shadow-md'>
                    <table className='w-full '>
                        <thead>
                            <tr className='bg-[#f6f6f6] text-sm font-light text-black lg:text-lg'  >
                                <th className='py-5 text-start border-e  px-1'>Customer Name</th>
                                <th className='py-2 text-start border-e  px-1'>Location Name</th>
                                <th className='py-2 text-start border-e  px-1'>Date</th>
                                <th className='py-2 text-start border-e  px-1'>Number of Door</th>
                                <th className='py-2 text-start border-e  px-1'>Width(mm)</th>
                                <th className='py-2 text-start border-e  px-1'>Height(mm)</th>
                                <th className='py-2 text-start border-e  px-1'>Pattern</th>
                                <th className='py-2 text-start border-e  px-1'>Panel Text</th>
                                <th className='py-2 text-start border-e  px-1'>Profile</th>
                                <th className='py-2 text-start border-e  px-1'>Total Cost</th>
                                <th className='py-2 text-start border-e  px-1'>Generate Quatation</th>
                                <th className='py-2 text-start border-e  px-1'>Status</th>

                            </tr>
                        </thead>
                        {(filteredData.length > 0 ? filteredData : quotation).map((quotation, index) =>
                            <tr key={index} className='border-b'>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.Customer_name}</td>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.Location_Name}</td>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.Date}</td>
                                <td className='text-sm py-4 lg:text-lg px-3'> {quotation.Number_of_Door}</td>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.Width}</td>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.Height}</td>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.Pattern}</td>
                                <td className='text-sm py-4 lg:text-lg'>

                                    {quotation.panelText.map((text, index) => (
                                        <tr key={index}>
                                            <td className='text-sm'>* {text}</td>
                                        </tr>
                                    ))}
                                </td>

                                <td className='text-sm py-4 lg:text-lg'>{quotation.selectedSubOption}</td>
                                <td className='text-sm py-4 lg:text-lg'>{quotation.total_cost}</td>
                                <td className='text-sm py-4 lg:text-lg'>
                                    <button className='px-3 py-1 bg-lime-500 rounded-md' onClick={() => handlePDF(quotation)}>Generate</button>
                                </td>
                                <td className='text-sm py-4 lg:text-lg'><Status userId={quotation._id}/></td>
                            </tr>)}
                    </table>

                    <div className='flex justify-end items-center my-3'>
                        <Pagination defaultCurrent={1} total={50} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Quote1