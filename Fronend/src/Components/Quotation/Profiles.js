import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profiles({ onProfileChange }) {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');
    const [colorData, setColorData] = useState("")

    useEffect(() => {
        const profileData = {
            selectedProject: selectedProject,
            selectedSubOption: '',
        };

        onProfileChange(profileData);
    }, [selectedProject, selectedSubOption])

    // const subOptions = subOptionsMap[selectedProject] || [];

    const getColor = () => {
        axios.get("http://localhost:8000/api/get-color")
            .then(res => {
                console.log(res.data.data);
                setColorData(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/profile')
            .then(res => {
                const profileData = res.data.data;

                const projectsArray = [];

                profileData.forEach(item => {
                    if (item.profile1 && item.profile1 !== "") {
                        projectsArray.push(item.profile1);
                    }
                });

                setProjects(projectsArray);
            })
            .catch(err => {
                console.log("err", err);
            })
        getColor()
    }, []);

    return (
        <div className="container grid grid-cols-2 min-w-full">
            <div className='flex flex-col justify-start items-start'>
                <label htmlFor="projectSelect">Profile:</label>
                <select
                    id="projectSelect"
                    className='border border-black rounded-md p-1'
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    <option value=""></option>
                    {projects.map((project, index) => (
                        <option key={index} value={project}>
                            {project}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {selectedProject && (
                    <div>
                        <label htmlFor="subOptionSelect">Color:</label><br />
                        <select
                            id="subOptionSelect"
                            className='border border-black rounded-md p-1'
                            value={selectedSubOption}
                            onChange={(event) => setSelectedSubOption(event.target.value)}
                        >
                            <option value=""></option>
                            {colorData?.map((val, index) => (
                                <option key={index} value={val.color}>
                                    {val.color}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profiles;
