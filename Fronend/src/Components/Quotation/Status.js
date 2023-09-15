import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import Revision from './Revision';

function Status() {
    const [status, setStatus] = useState(null);
    const [reason, setReason] = useState("");
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    const handleSubmit = () => {
        console.log(reason, "reason");
        setReason('');
    }
    const content = (
        <div>
            <div>
                <input
                    type="radio"
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
                    type="radio"
                    id="confirm"
                    name="status"
                    value="confirm"
                    checked={status === "confirm"}
                    onChange={handleStatusChange}
                />
                <label htmlFor="confirm">Confirm</label>
            </div>
            <div>
                <input
                    type="radio"
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
                <input type="radio"
                    id='revision'
                    name='revision'
                    value='revision'
                    checked={status === 'revision'}
                    onChange={handleStatusChange}
                />
                {status === 'revision' && <Revision/>}

            </div>

        </div>
    );

    return (
        <div>
            <Popover content={content} trigger="click">
                <Button>Status</Button>
            </Popover>
            
        </div>
    );
}

export default Status;
