import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from "./components/NavBar.jsx"
import IssuesPage from "./pages/IssuesPage.jsx"
import ProjectModdal from "./components/ProjectModdal.jsx"

const API_BASE_URL = 'https://schedule-tracker-backend.onrender.com/api';

function App() {
    const [searchTask, setSearchTask] = useState('')
    const [addTask, setAddTask] = useState('')
    const [projects, setProjects] = useState([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    // Fetch projects globally so NavBar can list them
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all-projects`);
            setProjects(response.data || []);
        } catch (error) {
            console.error("Error fetching projects for nav:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Global project creation handler for the modal
    const handleModalAddSubmit = async (projectData) => {
        try {
            await axios.post(`${API_BASE_URL}/create-project`, {
                projectname: projectData.name,
                description: projectData.desc,
                colour: projectData.color,
                workspace: projectData.workspace,
                layout: projectData.layout,
                parentProjectId: projectData.parentProject ? { id: Number(projectData.parentProject) } : null
            });
            fetchProjects(); // Refresh projects list in sidebar
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white text-neutral-800">
            <NavBar
                searchTask={searchTask}
                setSearchTask={setSearchTask}
                projects={projects}
                onOpenAddProject={() => setIsAddModalOpen(true)}
            />

            <div className="flex min-w-0 flex-1">
                <Routes>
                    <Route path="/" element={<Navigate to="/issues" replace />} />
                    <Route path="/issues" element={<IssuesPage searchTask={searchTask} addTask={addTask} />} />
                </Routes>
            </div>

            {/* Todoist Add Project Modal Triggered Globally */}
            <ProjectModdal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleModalAddSubmit}
                projects={projects}
            />
        </div>
    )
}

export default App