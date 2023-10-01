import React, { useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import Revision from './Revision';
import Payment from './Payment';
import PaymentLogic from './PaymentLogic';

function Status({ userId }) {
    const [status, setStatus] = useState(localStorage.getItem(`selectedStatus_${userId}`) || null);
    const [reason, setReason] = useState("");
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem(`selectedStatus_${userId}`, status);
    }, [status, userId]);
    
    const handleSubmit = () => {
        console.log(reason, "reason");
        setReason('');
    }

    let buttonName = "Pending";

    if (status === "pending") {
        buttonName = "Pending";
    } else if (status === "confirm") {
        buttonName = "Confirm";

    } else if (status === "rejected") {
        buttonName = "Rejected";
    } else if (status === "revision") {
        buttonName = "Revision";
    }

    const content = (
        <div>
            <div>
                <input
                    type="checkbox"
                    id="pending"
                    name="status"
                    value="pending"
                    checked={status === "pending"}
                    onChange={handleStatusChange}
                />
                <label htmlFor="pending">Pending</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="confirm"
                    name="status"
                    value="confirm"
                    checked={status === "confirm"}
                    onChange={handleStatusChange}
                />
                <label htmlFor="confirm">Confirm</label>
            </div>
            {status === 'confirm' && <PaymentLogic userId={userId} />}
            <div>
                <input
                    type="checkbox"
                    id="rejected"
                    name="status"
                    value="rejected"
                    checked={status === "rejected"}
                    onChange={handleStatusChange}
                />
                <label htmlFor="rejected">Rejected</label>
            </div>
            {status === "rejected" &&
                <div>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} className='border' /><br />
                    <button onClick={handleSubmit} className='border px-2 bg-slate-500 rounded-md text-white'>Submit</button>
                </div>
            }
            <div>
                <input type="checkbox"
                    id='revision'
                    name='revision'
                    value='revision'
                    checked={status === 'revision'}
                    onChange={handleStatusChange}
                />
                Revision
                {status === 'revision' && <Revision userId={userId} />}
            </div>
        </div>
    );
    return (
        <div>
            <Popover content={content} trigger="click">
                <Button>{buttonName}</Button>
            </Popover>
        </div>
    );
}

export default Status;
