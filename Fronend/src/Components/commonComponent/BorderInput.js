import React, { useState } from 'react';

function BorderInput({ label, value, onChange }) {
    const [inputValue, setInputValue] = useState(value || '');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
        // width: "30%"

    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const inputStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border-color 0.3s',
    };

    const inputFocusStyle = {
        borderColor: '#007bff',
    };

    return (
        <div style={containerStyle}>
            <label htmlFor="inputField" style={labelStyle}>
                {label}
            </label>
            <input
                type="text"
                id="inputField"
                style={{ ...inputStyle, ...(inputValue ? inputFocusStyle : {}) }}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default BorderInput;