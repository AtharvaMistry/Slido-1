import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import MaterialOption from './MaterialOption';
import Profiles from './Profiles';
import axios from 'axios';
function Revision({ userId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/viewQuote')
            .then((response) => {
                setUsers(response.data.data);
                console.log(users, "users");
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const showModal = (userId) => {
        const selectedUserData = userId.find(user => user.Customer_name );
        if (selectedUserData) {
            setSelectedUser(selectedUserData);
            setIsModalOpen(true);
            console.log('Selected User ID:', selectedUserData._id);
        } else {
            console.error('User not found');
        }
    };




    // todo state management
    const [userData, setUserData] = useState({
        Number_of_Door: '',
        Width: '',
        Height: '',
        Pattern: '',
        panelText: [],
        selectedMaterial: '',
        selectedProject: '',
        selectedSubOption: '',
        total_cost: '',
        soft_close: '',
        profileData: {
            selectedProject: '',
            selectedSubOption: '',
        }
    });

    const [selectedProfile, setSelectedProfile] = useState('');

    const handleUserDataChange = (field, value) => {
        setUserData(prevData => ({
            ...prevData,
            [field]: value,
            Pattern: selectedPattern
        }));
        console.log(userData, "userData");
    };


    const handlePanelTextChange = (panelTextData) => {
        setUserData(prevData => ({
            ...prevData,
            panelText: panelTextData
        }));
    };


    const [selectedPattern, setSelectedPattern] = useState("AJAX");
    const handlePatternChange = (pattern) => {
        setSelectedPattern(pattern);
        console.log('Selected Pattern:', pattern);
    };
    const [Number_of_Door, setSelectedDoors] = useState("");
    const handleDoorsChange = (doors) => {
        setSelectedDoors(doors);
        setSelectedDoors((prevDoors) => {
            setUserData((prevUserData) => ({
                ...prevUserData,
                Number_of_Door: prevDoors
            }));
            console.log("doors", doors);
        });
    }
    const handleProfileChange = (material, project) => {

        setUserData((prevData) => ({
            ...prevData,
            selectedMaterial: material,
            selectedProject: project,
            profileData: {
                selectedProject: material.selectedProject,
                selectedSubOption: prevData.selectedSubOption || '',
            },
        }), () => {
            console.log('Updated userData:', userData);
        });
    };



    const handleOk = (updatedUser) => {
        const profileData = {
            selectedProject: userData.selectedProject,
            selectedSubOption: userData.selectedSubOption || '',
        };

        const userDataWithProfileData = {
            ...userData,
            Pattern: selectedPattern,
            total_cost: totalCost.toFixed(2),
            profileData: profileData,
        };

        axios
            .put(`http://localhost:8000/api/upadteQuote/${userId}`, userDataWithProfileData)
            .then((response) => {
                console.log('Quotation updated successfully:', response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setUserData({
            Number_of_Door: '',
            Width: '',
            Height: '',
            Pattern: '',
            panelText: [],
            selectedMaterial: '',
            selectedProject: '',
            selectedSubOption: '',
            total_cost: '',
            profileData: {
                selectedProject: '',
                selectedSubOption: '',
            },
        });
        setIsModalOpen(false);

    };

    // todo costing area
    const [totalCost, setTotal_cost] = useState(0);
    const handleCost = () => {

        console.log(selectedPattern, "userData.selectedMaterial");
        console.log(userData.selectedMaterial.selectedProject, "userData:::::::::::::::");
        if (selectedPattern === 'AJAX') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1, "materialOption1");
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2, "materialOption2");
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (2 * 2500) + (2500)) * 1.18);
                    } else if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (4 * 2500) + (2500)) * 1.18);
                    }
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    if (userData.soft_close === "2") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (2 * 2500) + (2500)) * 1.18);
                    } else if (userData.soft_close === "4") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (4 * 2500) + (2500)) * 1.18);
                    }
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (2 * 2500) + (3000)) * 1.18);
                    } else if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (4 * 2500) + (3000)) * 1.18);
                    }
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    if (userData.soft_close === "2") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (2 * 2500) + (3000)) * 1.18);
                    } else if (userData.soft_close === "4") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (4 * 2500) + (3000)) * 1.18);
                    }
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {

                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };

                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (2 * 3000) + (4000)) * 1.18);
                    } else if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (4 * 3000) + (4000)) * 1.18);
                    }
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    if (userData.soft_close === "2") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (2 * 3000) + (4000)) * 1.18);
                    } else if (userData.soft_close === "4") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (4 * 3000) + (4000)) * 1.18);
                    }
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1 = userData.panelText[0];
                console.log(materialOption1);
                const materialOption2 = userData.panelText[1];
                console.log(materialOption2);
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                if (materialOption1 === materialOption2) {
                    console.log('Same material option');
                    if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (2 * 3000) + (4000)) * 1.18);
                    } else if (userData.soft_close === "2") {
                        setTotal_cost(((((width * height) / (304.8 * 304.8)) * materialOptionPrices[materialOption1]) + (4 * 3000) + (4000)) * 1.18);
                    }
                } else {
                    console.log('Different material options');
                    const materialValue1 = materialOptionPrices[materialOption1];
                    const materialValue2 = materialOptionPrices[materialOption2];
                    if (userData.soft_close === "2") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (2 * 3000) + (4000)) * 1.18);
                    } else if (userData.soft_close === "4") {
                        setTotal_cost((((width * height) / (2 * (304.8 * 304.8))) * (materialValue1 + materialValue2) + (4 * 3000) + (4000)) * 1.18);
                    }
                }
            }


            // todo: BECK
        } else if (selectedPattern === 'BECK') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };


                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
                // todo lux and flora
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
                // todo szafir and lazuryt
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
                // todo: szafir ag and helio
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];
                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);
                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 4) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4000)) * 1.18);
                }
            }


            // todo: COKO 
        } else if (selectedPattern === 'COKO') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;

                totalCost = (totalArea / 6) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
                // todo flora and lux
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];

                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 6) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];

                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 6) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };


                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];

                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 6) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4000)) * 1.18);
                }
            }

            // todo duke 
        } else if (selectedPattern === 'DUKE') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];

                const materialOption1Door2 = userData.panelText[4];
                const materialOption2Door2 = userData.panelText[5];
                const materialOption3Door2 = userData.panelText[6];
                const materialOption4Door2 = userData.panelText[7];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);
                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                console.time("materialOption1Door1 log");
                console.log(materialOptionPrices[materialOption1Door1], "sdad");
                console.timeEnd("materialOption1Door1 log");


                totalCost = (totalArea / 8) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2]);
                console.log(totalCost, "totalCost");


                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];

                const materialOption1Door2 = userData.panelText[4];
                const materialOption2Door2 = userData.panelText[5];
                const materialOption3Door2 = userData.panelText[6];
                const materialOption4Door2 = userData.panelText[7];


                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 8) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                }; const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];

                const materialOption1Door2 = userData.panelText[4];
                const materialOption2Door2 = userData.panelText[5];
                const materialOption3Door2 = userData.panelText[6];
                const materialOption4Door2 = userData.panelText[7];


                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 8) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];

                const materialOption1Door2 = userData.panelText[4];
                const materialOption2Door2 = userData.panelText[5];
                const materialOption3Door2 = userData.panelText[6];
                const materialOption4Door2 = userData.panelText[7];


                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 8) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: EROS
        } else if (selectedPattern === 'EROS') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 10) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption5Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 10) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption5Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                }; const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 10) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption5Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                let totalCost = 0;
                totalCost = (totalArea / 10) * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption5Door2]);
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: FILO
        } else if (selectedPattern === 'FILO') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 10);
                const largePanelArea = (totalArea) * (3 / 10);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }

            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 10);
                const largePanelArea = (totalArea) * (3 / 10);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                }; const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 10);
                const largePanelArea = (totalArea) * (3 / 10);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 10);
                const largePanelArea = (totalArea) * (3 / 10);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: GINO
        } else if (selectedPattern === 'GINO') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }

            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                }; const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: HERO
        } else if (selectedPattern === 'HERO') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 20);
                const largePanelArea = (totalArea) * (4 / 20);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 20);
                const largePanelArea = (totalArea) * (4 / 20);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 20);
                const largePanelArea = (totalArea) * (4 / 20);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (totalArea) * (1 / 20);
                const largePanelArea = (totalArea) * (4 / 20);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption3Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption2Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            }
            // todo: IBEX
        } else if (selectedPattern === 'IBEX') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];

                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];

                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];

                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];

                const materialOption1Door2 = userData.panelText[2];
                const materialOption2Door2 = userData.panelText[3];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);
                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                let totalCost = 0;

                const smallPanelArea = (0.3 * totalArea) * (1 / 4);
                const largePanelArea = (0.7 * totalArea) * (1 / 2);
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption2Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption1Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: JAZZ
        } else if (selectedPattern === 'JAZZ') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };


                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption1Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption3Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };


                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption1Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption3Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption1Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption3Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption1Door2 = userData.panelText[3];
                const materialOption2Door2 = userData.panelText[4];
                const materialOption3Door2 = userData.panelText[5];

                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);
                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (parseFloat(userData.Width) * parseFloat(userData.Height)) / (304.8 * 304.8);
                const totalHeight = parseFloat(userData.Height);
                let totalCost = 0;

                const smallPanelArea = (350 / totalHeight) * (totalArea) * (1 / 4);
                const largePanelArea = ((totalHeight - 700) / totalHeight) * (totalArea) * (1 / 2);

                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption1Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption3Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: KENO
        } else if (selectedPattern === 'KENO') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);

                const smallPanelArea = (totalArea) * (3 / 40);
                const largePanelArea = (totalArea) * (7 / 60);
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2]));


                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);

                const smallPanelArea = (totalArea) * (3 / 40);
                const largePanelArea = (totalArea) * (7 / 60);
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);

                const smallPanelArea = (totalArea) * (3 / 40);
                const largePanelArea = (totalArea) * (7 / 60);
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,
                    'Pearl-Tinted Glass-grey': 1862,
                    'Pearl-Tinted Glass-brown': 1862,


                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,
                    'Peak-MDF-Raminated Panel': 1965,
                    'Pearl-Fluted Glass-null': 1965,
                    'Vibrant-Coloured glass premium-null': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'Peak-Highlight-Fabric': 2194,
                    'YinYang-Gloss-mat-glass-tinted': 2194,
                    'YinYang-Gloss-mat-glass-Clear': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-null': 2569,
                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-null': 2569,
                    'Persona-Mirror pr-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-null': 4032,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];


                const materialOption1Door2 = userData.panelText[5];
                const materialOption2Door2 = userData.panelText[6];
                const materialOption3Door2 = userData.panelText[7];
                const materialOption4Door2 = userData.panelText[8];
                const materialOption5Door2 = userData.panelText[9];



                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);

                const smallPanelArea = (totalArea) * (3 / 40);
                const largePanelArea = (totalArea) * (7 / 60);
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
            // todo: LULU
        } else if (selectedPattern === 'LULU') {
            if (userData.selectedMaterial.selectedProject === 'LARA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1075,
                    'Pearl-Silver mirror-null': 1075,
                    'Peak-PLPB-tesa': 1075,

                    'Vibrant-Coloured glass classic-null': 1193,
                    'Pearl-Frosted Glass-null': 1193,
                    'Pearl-Tinted Glass-grey': 1193,
                    'Pearl-Tinted Glass-brown': 1193,


                    'Pearl-Mirror pl-Brown': 1296,
                    'Pearl-Mirror pl-Grey': 1296,
                    'Pearl-Mirror pl-Gold': 1296,
                    'Peak-MDF-Raminated Panel': 1296,
                    'Pearl-Fluted Glass-null': 1296,
                    'Vibrant-Coloured glass premium-null': 1296,

                    'Vibrant-Coloured glass-Metallic': 1525,
                    'Peak-Highlight-Wallpaper': 1525,
                    'Peak-Highlight-Fabric': 1525,
                    'YinYang-Gloss-mat-glass-tinted': 1525,
                    'YinYang-Gloss-mat-glass-Clear': 1525,

                    'Punch-Glass-Digital Print': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1653,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1653,

                    'Crystal-Designer Glass-null': 1900,
                    'Crystal-Mirror-null': 1900,
                    'Persona-V Groove glass-null': 1900,
                    'Persona-Mirror pr-null': 1900,
                    'YinYang-Gloss-mat-glass-Colored glass': 1900,

                    'Peak-Premium Highlighter-null': 3553,
                };

                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];
                const materialOption6Door1 = userData.panelText[5];
                const materialOption7Door1 = userData.panelText[6];


                const materialOption1Door2 = userData.panelText[7];
                const materialOption2Door2 = userData.panelText[8];
                const materialOption3Door2 = userData.panelText[9];
                const materialOption4Door2 = userData.panelText[10];
                const materialOption5Door2 = userData.panelText[11];
                const materialOption6Door2 = userData.panelText[12];
                const materialOption7Door2 = userData.panelText[13];




                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);

                const smallPanelArea = (totalArea) * (1 / 30);
                console.log(smallPanelArea, "smallPanelArea");
                const largePanelArea = (totalArea) * (3 / 30);
                console.log(largePanelArea, "largePanelArea");
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption6Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption6Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption7Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2] + materialOptionPrices[materialOption7Door2]));
                console.log(totalCost, "totalCost");
                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 2500) + (2500)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 2500) + (2500)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'LUX' || userData.selectedMaterial.selectedProject === 'FLORA') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1154,
                    'Pearl-Silver mirror-null': 1154,
                    'Peak-PLPB-tesa': 1154,

                    'Vibrant-Coloured glass classic-null': 1272,
                    'Pearl-Frosted Glass-null': 1272,
                    'Pearl-Tinted Glass-grey': 1272,
                    'Pearl-Tinted Glass-brown': 1272,


                    'Pearl-Mirror pl-Brown': 1375,
                    'Pearl-Mirror pl-Grey': 1375,
                    'Pearl-Mirror pl-Gold': 1375,
                    'Peak-MDF-Raminated Panel': 1375,
                    'Pearl-Fluted Glass-null': 1375,
                    'Vibrant-Coloured glass premium-null': 1375,

                    'Vibrant-Coloured glass-Metallic': 1604,
                    'Peak-Highlight-Wallpaper': 1604,
                    'Peak-Highlight-Fabric': 1604,
                    'YinYang-Gloss-mat-glass-tinted': 1604,
                    'YinYang-Gloss-mat-glass-Clear': 1604,

                    'Punch-Glass-Digital Print': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 1732,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 1732,

                    'Crystal-Designer Glass-null': 1979,
                    'Crystal-Mirror-null': 1979,
                    'Persona-V Groove glass-null': 1979,
                    'Persona-Mirror pr-null': 1979,
                    'YinYang-Gloss-mat-glass-Colored glass': 1979,

                    'Peak-Premium Highlighter-null': 3432,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];
                const materialOption6Door1 = userData.panelText[5];
                const materialOption7Door1 = userData.panelText[6];


                const materialOption1Door2 = userData.panelText[7];
                const materialOption2Door2 = userData.panelText[8];
                const materialOption3Door2 = userData.panelText[9];
                const materialOption4Door2 = userData.panelText[10];
                const materialOption5Door2 = userData.panelText[11];
                const materialOption6Door2 = userData.panelText[12];
                const materialOption7Door2 = userData.panelText[13];




                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                // const totalHeight = parseFloat(userData.Height);

                const smallPanelArea = (totalArea) * (1 / 30);
                console.log(smallPanelArea, "smallPanelArea");
                const largePanelArea = (totalArea) * (3 / 30);
                console.log(largePanelArea, "largePanelArea");
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption6Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption6Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption7Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2] + materialOptionPrices[materialOption7Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (3000)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (3000)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR' || userData.selectedMaterial.selectedProject === 'LAZURYT') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1602,
                    'Pearl-Silver mirror-null': 1602,
                    'Peak-PLPB-tesa': 1602,

                    'Vibrant-Coloured glass classic-null': 1720,
                    'Pearl-Frosted Glass-null': 1720,
                    'Pearl-Tinted Glass-grey': 1720,
                    'Pearl-Tinted Glass-brown': 1720,


                    'Pearl-Mirror pl-Brown': 1823,
                    'Pearl-Mirror pl-Grey': 1823,
                    'Pearl-Mirror pl-Gold': 1823,
                    'Peak-MDF-Raminated Panel': 1823,
                    'Pearl-Fluted Glass-null': 1823,
                    'Vibrant-Coloured glass premium-null': 1823,

                    'Vibrant-Coloured glass-Metallic': 2052,
                    'Peak-Highlight-Wallpaper': 2052,
                    'Peak-Highlight-Fabric': 2052,
                    'YinYang-Gloss-mat-glass-tinted': 2052,
                    'YinYang-Gloss-mat-glass-Clear': 2052,

                    'Punch-Glass-Digital Print': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2180,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2180,

                    'Crystal-Designer Glass-null': 2427,
                    'Crystal-Mirror-null': 2427,
                    'Persona-V Groove glass-null': 2427,
                    'Persona-Mirror pr-null': 2427,
                    'YinYang-Gloss-mat-glass-Colored glass': 2427,

                    'Peak-Premium Highlighter-null': 3880,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];
                const materialOption6Door1 = userData.panelText[5];
                const materialOption7Door1 = userData.panelText[6];


                const materialOption1Door2 = userData.panelText[7];
                const materialOption2Door2 = userData.panelText[8];
                const materialOption3Door2 = userData.panelText[9];
                const materialOption4Door2 = userData.panelText[10];
                const materialOption5Door2 = userData.panelText[11];
                const materialOption6Door2 = userData.panelText[12];
                const materialOption7Door2 = userData.panelText[13];




                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                // const totalHeight = parseFloat(userData.Height);

                const smallPanelArea = (totalArea) * (1 / 30);
                console.log(smallPanelArea, "smallPanelArea");
                const largePanelArea = (totalArea) * (3 / 30);
                console.log(largePanelArea, "largePanelArea");
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption6Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption6Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption7Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2] + materialOptionPrices[materialOption7Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            } else if (userData.selectedMaterial.selectedProject === 'SZAFIR AG(Gold)' || userData.selectedMaterial.selectedProject === 'HELIO') {
                const materialOptionPrices = {
                    'Pearl-Clear glass-null': 1744,
                    'Pearl-Silver mirror-null': 1744,
                    'Peak-PLPB-tesa': 1744,

                    'Vibrant-Coloured glass classic-null': 1862,
                    'Pearl-Frosted Glass-null': 1862,

                    'Pearl-Mirror pl-Brown': 1965,
                    'Pearl-Mirror pl-Grey': 1965,
                    'Pearl-Mirror pl-Gold': 1965,

                    'Vibrant-Coloured glass-Metallic': 2194,
                    'Peak-Highlight-Wallpaper': 2194,
                    'YinYang-Gloss-mat-glass-': 2194,

                    'Punch-Glass-Digital Print': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Gold': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Brown': 2322,
                    'YinYang-Gloss-mat-glass-mirror-Grey': 2322,

                    'Crystal-Designer Glass-': 2569,
                    'Crystal-Mirror-null': 2569,
                    'Persona-V Groove glass-': 2569,
                    'Persona-Mirror-null': 2569,
                    'YinYang-Gloss-mat-glass-Colored glass': 2569,

                    'Peak-Premium Highlighter-': 4022,
                };
                const materialOption1Door1 = userData.panelText[0];
                const materialOption2Door1 = userData.panelText[1];
                const materialOption3Door1 = userData.panelText[2];
                const materialOption4Door1 = userData.panelText[3];
                const materialOption5Door1 = userData.panelText[4];
                const materialOption6Door1 = userData.panelText[5];
                const materialOption7Door1 = userData.panelText[6];


                const materialOption1Door2 = userData.panelText[7];
                const materialOption2Door2 = userData.panelText[8];
                const materialOption3Door2 = userData.panelText[9];
                const materialOption4Door2 = userData.panelText[10];
                const materialOption5Door2 = userData.panelText[11];
                const materialOption6Door2 = userData.panelText[12];
                const materialOption7Door2 = userData.panelText[13];


                const width = parseFloat(userData.Width);
                const height = parseFloat(userData.Height);

                console.log('Width:', width);
                console.log('Height:', height);

                const totalArea = (width * height) / (304.8 * 304.8);
                // const totalHeight = parseFloat(userData.Height);

                const smallPanelArea = (totalArea) * (1 / 30);
                console.log(smallPanelArea, "smallPanelArea");
                const largePanelArea = (totalArea) * (3 / 30);
                console.log(largePanelArea, "largePanelArea");
                let totalCost = 0;
                totalCost = (smallPanelArea * (materialOptionPrices[materialOption2Door1] + materialOptionPrices[materialOption4Door1] + materialOptionPrices[materialOption6Door1] + materialOptionPrices[materialOption2Door2] + materialOptionPrices[materialOption4Door2] + materialOptionPrices[materialOption6Door2])) +
                    (largePanelArea * (materialOptionPrices[materialOption1Door1] + materialOptionPrices[materialOption3Door1] + materialOptionPrices[materialOption5Door1] + materialOptionPrices[materialOption7Door1] + materialOptionPrices[materialOption1Door2] + materialOptionPrices[materialOption3Door2] + materialOptionPrices[materialOption5Door2] + materialOptionPrices[materialOption7Door2]));

                if (userData.soft_close === "2") {
                    setTotal_cost((totalCost + (2 * 3000) + (4800)) * 1.18);
                } else if (userData.soft_close === "4") {
                    setTotal_cost((totalCost + (4 * 3000) + (4800)) * 1.18);
                }
            }
        }
        setIsModalOpen(false);
    }
    useEffect(() => {
        console.log(totalCost); // Log the updated total_cost
    }, [totalCost]);

    // todo


    return (
        <div className='min-w-full'>
            <Button type="primary" onClick={() => showModal(users)}>
                Revision
            </Button>
            <Modal title="Enter value" open={isModalOpen} onOk={() => handleOk(selectedUser)} onCancel={handleCancel} width={1000} className='modal1'>


                {/* todo user */}


                {/* todo size selection */}
                <div className="grid grid-cols-3 gap-5 pb-5  " >

                    <div className='flex flex-col justify-start items-start'>
                        <p>Width(mm):</p>
                        <input
                            type="text"
                            className='border p-1 rounded-md border-black'
                            value={userData.Width}
                            onChange={(e) => handleUserDataChange('Width', e.target.value)}
                        />
                        <div>
                            <p className='text-xs' > (Range : 1200 mm to 2370 mm)</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                        <p>Heigh(mm):</p>
                        <input
                            type="text"
                            className='border p-1 rounded-md border-black'
                            value={userData.Height}
                            onChange={(e) => handleUserDataChange('Height', e.target.value)}
                        />
                        <div>
                            <p className='text-xs'>(Range : 600 mm to 2700 mm)</p>
                        </div>
                    </div>
                </div >
                <div>
                    <MaterialOption
                        onPanelTextChange={handlePanelTextChange}
                        onPatternChange={handlePatternChange}
                        onDoorsChange={handleDoorsChange} />
                </div>
                {/* todo Profiles section*/}
                <div className='pb-5 '>
                    <div className='mb-5'>
                        <h2 className='font-bold border-b-2'>Select Profile</h2>
                    </div>
                    <Profiles
                        selectedMaterial={userData.selectedMaterial}
                        selectedProject={userData.selectedProject}
                        onProfileChange={handleProfileChange}
                    />
                </div>

                {/* todo accesaries */}
                <div className=''>
                    <label htmlFor="">Soft Close</label><br />
                    <select name="soft_close"
                        id=""
                        onChange={(e) => handleUserDataChange('soft_close', e.target.value)}
                        value={userData.soft_close}
                        className='border p-1 rounded-md border-black'
                    >
                        <option value=""></option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                    </select>
                </div>
                {/* todo: costing table*/}
                <div className='flex  justify-end items-center mb-10'>
                    <div className='flex justify-start items-center me-5'>
                        <p className=''>MRP Price(INR):</p>
                        <p className='ms-5 border px-3 border-black rounded-lg'>&#8377;{totalCost}
                        </p>
                    </div>
                    <button onClick={handleCost} className='border border-black rounded-md px-3 bg-green-300'>Estimated Cost</button>
                </div>
            </Modal>
        </div>
    )
}

export default Revision