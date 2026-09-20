import MyButton from "../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/mockData.js";
const Projects = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center min-h-screen flex-col pt-5">
            <h1 className="text-4xl font-bold">Projects Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {   projects.map((project) => (
                        <div key={project.id} className="border p-4 m-2 rounded shadow">
                            <h2 className="text-2xl font-semibold">{project.title}</h2>
                            <p>{project.description}</p>
                            <div className="flex justify-end items-center mt-2">
                                <MyButton size="small" onClick={() => navigate(`/projects/${project.id}`)}>
                                    View Project
                                </MyButton>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Projects