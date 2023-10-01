import React from 'react'

function StatusAccount() {
    return (
        <div className="container">
            <select name="" id="" className='border rounded-md'>
                <option value="Approve" className='border rounded-md'>
                    <button className='px-2 py-1 bg-green-500 rounded-md text-white'>Approve</button>
                </option>
                <option value="Reject" className='border rounded-md'>
                    <button>Reject</button>
                </option>
            </select>
        </div>
    )
}

export default StatusAccount