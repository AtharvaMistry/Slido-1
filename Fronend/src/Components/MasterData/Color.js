import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Color() {
    const [color, setColor] = useState(''); // Changed state variable name
    const [colorData, setColorData] = useState([]);

    const handleAdd = () => {
        // if (designs.some(existingDesign => existingDesign.room === room)) {
        //     console.error('Pattern with the same name already exists.');
        //     return;
        // }

        axios.post(`http://localhost:8000/api/color-add`, {color})
            .then(response => {
                console.log('Post successful', response);
                alert(response.data.Message)
                setColor('');
                getData()
            })
            .catch(error => {
                console.error('Error posting data', error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("http://localhost:8000/api/get-color")
            .then(res => {
                console.log(res.data.data);
                setColorData(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    return (
        <div className="container min-w-full">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className='border-2 p-5 shadow-md'>
                    <input type="text" className='px-2 py-1 rounded-md w-full border border-black outline-none ' placeholder='add design type' value={color} onChange={(e) => setColor(e.target.value)} /><br /><br />
                    <button className='border-2 px-2 py-1 rounded-md border-black min-w-[200px]' onClick={handleAdd}>Add Pattern</button>
                </div>

                <div className='border-2 p-5 shadow-md'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Added Color</th>
                            </tr>
                            {colorData.map((value, index) => (
                                <tr key={index} className='text-xl'>
                                    <td className='text-xl'>{value.color}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Color;
