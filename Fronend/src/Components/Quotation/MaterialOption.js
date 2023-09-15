import axios from "axios";
import React, { useEffect, useState } from "react";

function MaterialOption({ onPanelTextChange, onPatternChange, onDoorsChange }) {
    const patternPanels = {
        AJAX: 1,
        BECK: 2,
        COKO: 3,
        DUKE: 4,
        EROS: 5,
        FILO: 3,
        GINO: 3,
        HERO: 3,
        IBEX: 2,
        KENO: 5,
        JAZZ: 3,
        LULU: 7,
    };

    const [selectedPattern, setSelectedPattern] = useState("AJAX");
    const [material, setMaterial] = useState([]);
    const [Number_of_Door, setSelectedDoors] = useState("");
    const [subOptionText, setSubOptionText] = useState([]);
    const [subSubOptionText, setSubSubOptionText] = useState([]);
    const [panelText, setPanelText] = useState([]);

    const handlePatternChange = (event) => {
        const selectedPattern = event.target.value;
        setSelectedPattern(selectedPattern);
        onPatternChange(selectedPattern);
    };

    const handleDoorsChange = (e) => {
        const Number_of_Door = e.target.value;
        setSelectedDoors(Number_of_Door);
        onDoorsChange(Number_of_Door);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/design")
            .then((res) => {
                const wholeData = res.data.data;
                setMaterial(wholeData.map((item) => item.design));
            })
            .catch((err) => {
                console.log("material err", err);
            });
    }, []);

    const materialSubOptions = {
        Punch: ["Glass"],
        Pearl: [
            "Clear glass",
            "Silver mirror",
            "Frosted Glass",
            "Mirror pl",
            "Fluted Glass",
            "Tinted Glass",
        ],
        Peak: ["PLPB", "MDF", "Highlight", "Premium Highlighter"],
        Vibrant: [
            "Coloured glass classic",
            "Coloured glass premium",
            "Coloured glass",
        ],
        Crystal: ["Designer Glass", "Mirror cl"],
        Persona: ["V Groove glass", "Mirror pr"],
        YinYang: ["Gloss-mat-glass", "Gloss-mat-glass-mirror"],
    };

    const subSubOptions = {
        "Mirror pl": ["Grey", "Brown", "Gold"],
        "Tinted Glass": ["grey", "brown"],
        PLPB: ["tesa"],
        MDF: ["Raminated Panel"],
        "V Groove glass": [""],
        Highlight: ["Wallpaper", "Fabric"],
        "Premium Highlighter": ["Combinations"],
        "Coloured glass": ["Metallic"],
        Glass: ["Digital Print"],
        "Gloss-mat-glass": ["Colored glass", "Clear", "tinted"],
        "Gloss-mat-glass-mirror": ["Brown", "Grey", "Gold"],
    };

    const handleSubOptionTextChange = (doorIndex, panelIndex, value) => {
        const updatedSubOptionText = [...subOptionText];
        if (!updatedSubOptionText[doorIndex]) {
            updatedSubOptionText[doorIndex] = [];
        }
        updatedSubOptionText[doorIndex][panelIndex] = value;
        setSubOptionText(updatedSubOptionText);
    };

    const handleSubSubOptionTextChange = (doorIndex, panelIndex, value) => {
        const updatedSubSubOptionText = [...subSubOptionText];
        if (!updatedSubSubOptionText[doorIndex]) {
            updatedSubSubOptionText[doorIndex] = [];
        }
        updatedSubSubOptionText[doorIndex][panelIndex] = value;
        setSubSubOptionText(updatedSubSubOptionText);
    };

    // const updateCombinedArray = () => {
    //     const combinedArray = panelText.map((doorPanels, doorIndex) => {
    //         const doorOptions = doorPanels.map((panel, panelIndex) => {
    //             const subOption = subOptionText[doorIndex]
    //                 ? subOptionText[doorIndex][panelIndex] || "null"
    //                 : "null";
    //             const subSubOption = subSubOptionText[doorIndex]
    //                 ? subSubOptionText[doorIndex][panelIndex] || "null"
    //                 : "null";
    //             return [panel, subOption, subSubOption].join("-");
    //         });
    //         return doorOptions.join(",");
    //     });

    //     return combinedArray;
    // };

    // useEffect(() => {
    //     const combinedArray = updateCombinedArray();
    //     onPanelTextChange(combinedArray);
    // }, [panelText, subOptionText, subSubOptionText]);

    const handlePanelTextChange = (doorIndex, panelIndex, value) => {
        const updatedPanelText = [...panelText];
        if (!updatedPanelText[doorIndex]) {
            updatedPanelText[doorIndex] = [];
        }
        updatedPanelText[doorIndex][panelIndex] = value;
        setPanelText(updatedPanelText);
    };

    return (
        <>
            <>
                <div className="flex flex-col justify-start items-start">
                    <p>Number Of Door:</p>
                    <select
                        name=""
                        id=""
                        className="border p-1 rounded-md border-black"
                        value={Number_of_Door}
                        onChange={handleDoorsChange}
                    >
                        <option value=""></option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div className="mb-5">
                    <div className="mb-5">
                        <h2 className="font-bold border-b-2 mb-5">Select Pattern</h2>
                    </div>
                </div>

                <div className="pb-5">
                    <div className="grid grid-cols-3 gap-5">
                        <div>
                            <p>Pattern</p>
                            <select
                                value={selectedPattern}
                                onChange={handlePatternChange}
                                className="border p-1 rounded-md border-black"
                            >
                                <option value=""></option>
                                <option value="AJAX">AJAX</option>
                                <option value="BECK">BECK</option>
                                <option value="COKO">COKO</option>
                                <option value="DUKE">DUKE</option>
                                <option value="EROS">EROS</option>
                                <option value="FILO">FILO</option>
                                <option value="GINO">GINO</option>
                                <option value="HERO">HERO</option>
                                <option value="IBEX">IBEX</option>
                                <option value="KENO">KENO</option>
                                <option value="JAZZ">JAZZ</option>
                                <option value="LULU">LULU</option>
                            </select>
                        </div>
                        {/* Loop through doors */}

                        {Array.from({ length: parseInt(Number_of_Door) || 0 }, (_, doorIndex) => (
                            <div key={doorIndex}>
                                <p>Door {doorIndex + 1}</p>
                                {Array.from({ length: patternPanels[selectedPattern] || 0 }, (_, panelIndex) => (
                                    <div key={panelIndex} className="grid gap-2 ">
                                        <select
                                            name=""
                                            id=""
                                            className="border border-black rounded-md p-1 mb-3 "
                                            value={
                                                panelText[doorIndex]
                                                    ? panelText[doorIndex][panelIndex] || ""
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handlePanelTextChange(doorIndex, panelIndex, e.target.value)
                                            }
                                        >
                                            <option value=""></option>
                                            {material.map((item, index) => (
                                                <option key={index}>{item}</option>
                                            ))}
                                        </select>
                                        {panelText[doorIndex] && (
                                            <select
                                                name=""
                                                id=""
                                                className="border  border-black rounded-md p-1 mb-3"
                                                value={
                                                    subOptionText[doorIndex]
                                                        ? subOptionText[doorIndex][panelIndex] || ""
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    handleSubOptionTextChange(
                                                        doorIndex,
                                                        panelIndex,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value=""></option>
                                                {materialSubOptions[panelText[doorIndex][panelIndex]] &&
                                                    materialSubOptions[panelText[doorIndex][panelIndex]].map(
                                                        (subOption, index) => (
                                                            <option key={index}>{subOption}</option>
                                                        )
                                                    )}
                                            </select>
                                        )}
                                        {subOptionText[doorIndex] && (
                                            <select
                                                name=""
                                                id=""
                                                className="border border-black rounded-md p-1 mb-3"
                                                value={
                                                    subSubOptionText[doorIndex]
                                                        ? subSubOptionText[doorIndex][panelIndex] || ""
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    handleSubSubOptionTextChange(
                                                        doorIndex,
                                                        panelIndex,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value=""></option>
                                                {subSubOptions[subOptionText[doorIndex][panelIndex]] &&
                                                    subSubOptions[subOptionText[doorIndex][panelIndex]].map(
                                                        (subSubOption, index) => (
                                                            <option key={index}>{subSubOption}</option>
                                                        )
                                                    )}
                                            </select>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="w-3">
                        {console.log("panelText:::", panelText)}
                        <button
                            type="button"
                            onClick={() => {

                                const combinedArray = panelText.map((doorPanels, doorIndex) => {
                                    const doorOptions = doorPanels.map((panel, panelIndex) => {
                                        const subOption =
                                            subOptionText[doorIndex] ? subOptionText[doorIndex][panelIndex] || "null" : "null";
                                        const subSubOption =
                                            subSubOptionText[doorIndex] ? subSubOptionText[doorIndex][panelIndex] || "null" : "null";
                                        return [panel, subOption, subSubOption].join("-");
                                    });
                                    return doorOptions;
                                });

                                const flattenedArray = [].concat(...combinedArray); // Flatten the array
                                console.log("EVER COMPILED ARRAY", flattenedArray);
                                onPanelTextChange(flattenedArray);
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </>

        </>
    );
}

export default MaterialOption;
