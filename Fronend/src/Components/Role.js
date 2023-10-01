import React, { useState } from 'react';
import BorderInput from './commonComponent/BorderInput';
// import './BorderInput.css'; // Import your CSS file for styling

function Role({ label, value, onChange }) {

    const [userName, setUserName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const [permissions, setPermissions] = useState([
        { module: 'Orders', update: true, delete: false },
        { module: 'categories', create: false, read: true, update: false, delete: true },
        { module: 'category_order', read: true, update: false, },
        { module: 'product', create: false, read: true, update: false, delete: true },

        { module: 'media', create: false, read: true, update: false, delete: true },

        { module: 'product_order', read: true, update: false, },

        { module: 'tax', create: false, read: true, update: false, delete: true },

        { module: 'attribute', create: false, read: true, update: false, delete: true },

        { module: 'attribute_set', create: false, read: true, update: false, delete: true },

        { module: 'attribute_value', create: false, read: true, update: false, delete: true },

        { module: 'home_slider_images', create: false, read: true, update: false, delete: true },

        { module: 'product_faqs', create: false, read: true, update: false, delete: true },

        { module: 'new_offer_images', create: false, read: true, delete: true },
        { module: 'promo_code', create: false, read: true, update: false, delete: true },
        { module: 'featured_section', create: false, read: true, update: false, delete: true },
        { module: 'customers', read: true, update: false },
        { module: 'return_request', read: true, update: false, },
        { module: 'delivery_boy', create: false, read: true, update: false, delete: true },
        { module: 'fund_transfer', create: false, read: true, update: false, delete: true },
        { module: 'send_notification', create: false, read: true, delete: true },
        { module: 'notification_setting', read: true, update: false },
        { module: 'client_api_keys', create: false, read: true, update: false, delete: true },
        { module: 'area', create: false, read: true, update: false, delete: true },
        { module: 'pickup_location', create: false, read: true, update: false, delete: true },
        { module: 'city', create: false, read: true, update: false, delete: true },
        { module: 'faq', create: false, read: true, update: false, delete: true },
        { module: 'system_update', update: false },
        { module: 'zipcodes', create: false, read: true, update: false, delete: true },
        { module: 'support_tickets', create: false, read: true, update: false, delete: true },
        { module: 'settings', read: true, update: false },
        { module: 'shipping_settings', read: true, update: false },

        // Add more modules and permissions as needed
    ]);

    const togglePermission = (module, permissionType) => {
        setPermissions((prevPermissions) =>
            prevPermissions.map((permission) =>
                permission.module === module
                    ? { ...permission, [permissionType]: !permission[permissionType] }
                    : permission
            )
        );
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '20px',
    };

    const selectStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px',
        width: '200px', // You can adjust the width as needed
    };

    return (
        <div style={containerStyle}>

            <div className='flex-grow flex-col display mr-4'>


                <BorderInput
                    label={"Username*"}
                    onChange={(value) => setUserName(value)}
                    value={userName}
                />

                <BorderInput
                    label={"Mobile*"}
                    onChange={(value) => setMobile(value)}
                    value={mobile}
                />

                <BorderInput
                    label={"Email*"}
                    onChange={(value) => setEmail(value)}
                    value={email}
                />

                <BorderInput
                    label={"Password*"}
                    onChange={(value) => setPassword(value)}
                    value={password}
                />

                <BorderInput
                    label={"Confirm Password*"}
                    onChange={(value) => setConfirmPass(value)}
                    value={confirmPass}
                />

                <div>
                    <div className="font-bold mb-1">
                        Role*
                    </div>
                    <select style={selectStyle} value={selectedOption} onChange={handleOptionChange}>
                        <option value="">Select...</option>
                        <option value="superAdmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                    </select>

                </div>

                <div className='row flex gap-5 mt-5'>
                    <div className='p-2 border-gray rounded-md bg-orange-500 outline-none text-white px-5'>
                        Reset
                    </div>

                    <div className='p-2 border-gray rounded-md bg-green-500 outline-none text-white px-5'>
                        Add User
                    </div>

                </div>
            </div>

            <div className="flex-grow">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">MODULE/PERMISSIONS</th>
                            <th className="border px-4 py-2">CREATE</th>
                            <th className="border px-4 py-2">READ</th>
                            <th className="border px-4 py-2">UPDATE</th>
                            <th className="border px-4 py-2">DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission) => (
                            <tr key={permission.module}>
                                <td className="border px-4 py-2">{permission.module}</td>

                                {permission.hasOwnProperty('create') ? (
                                    <td className="border px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={permission.create}
                                            onChange={() => togglePermission(permission.module, 'create')}
                                        />
                                    </td>
                                ) : (
                                    <td className="border px-4 py-2"></td>
                                )}
                                {permission.hasOwnProperty('read') ? (
                                    <td className="border px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={permission.read}
                                            onChange={() => togglePermission(permission.module, 'read')}
                                        />
                                    </td>
                                ) : (
                                    <td className="border px-4 py-2"></td>
                                )}

                                {permission.hasOwnProperty('update') ? (
                                    <td className="border px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={permission.update}
                                            onChange={() => togglePermission(permission.module, 'update')}
                                        />
                                    </td>
                                ) : (
                                    <td className="border px-4 py-2"></td>
                                )}
                                {permission.hasOwnProperty('delete') ? (
                                    <td className="border px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={permission.delete}
                                            onChange={() => togglePermission(permission.module, 'delete')}
                                        />
                                    </td>
                                ) : (
                                    <td className="border px-4 py-2"></td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
export default Role;