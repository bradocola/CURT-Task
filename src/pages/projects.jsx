import MyButton from "../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useState } from "react";
const Projects = () => {
    const { project, deleteProject, addProject, maxId, editProject } = useProject();
    const navigate = useNavigate();
    const [ create, setCreate ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ title, setTitle ] = useState();
    const [ description, setDescription ] = useState();
    const [ id, setId] = useState();

    return (
        <div className="flex justify-start min-h-screen flex-col pt-5 bg-orange-100">
            {create ? 
            <div>
                <div className="flex flexrow justify-between">
                    <h1 className="text-4xl font-bold mt-4 ml-4"> {edit ? "Edit" : "Create"} Project Page </h1>
                    <MyButton size="large" buttonStyle="cancel" onClick={()=>{
                        setDescription(false)
                        setTitle("")
                        setDescription("")
                        setId("")
                        setCreate(false)
                        setEdit(false)
                    }}> Cancel </MyButton>
                </div>
                <div className="flex flex-col h-full justify-center m-auto">
                    <h2 className="text-2xl font-bold mt-2 ml-8"> Title </h2>
                    <input className="rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5" onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <h2 className="text-2xl font-bold mt-2 ml-8"> Description </h2>
                    <input className="rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5" onChange={(e) => setDescription(e.target.value)} value={description}/>
                </div>
                <div>
                    <MyButton size="large" buttonStyle="navbar" onClick={()=>{
                        if(edit){
                            editProject(id,title,description)
                        }else{
                            addProject({
                                id: maxId()+1,
                                title: title,
                                description: description,
                                ownerId: 1,
                                members: [],
                            })
                        }
                        setDescription(false)
                        setTitle("")
                        setDescription("")
                        setId("")
                        setCreate(false)
                        setEdit(false)
                    }}> { edit ? "Confirm Edit" : "Create"} </MyButton>
                </div>

            </div> 
            :
            <div>
                <div className="flex flexrow justify-between px-15">
                    <h1 className="text-4xl font-bold mt-4"> Projects Page </h1>
                    <MyButton size="large" buttonStyle="navbar" onClick={()=>setCreate(true)}> Create </MyButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8 mx-10 ">
                    {   
                        project.map((project) => (
                            <div key={project.id} className="bg-orange-200 border p-4 m-2 rounded shadow hover:scale-125 transition-all duration-1000 flex flex-col h-full">

                                <h2 className="text-2xl font-semibold">{project.title}</h2>
                                <p>{project.description}</p>
                                <div className="flex justify-end items-center mt-2 flexrow mt-auto">
                                    <MyButton size="small" buttonStyle="delete" onClick={() => deleteProject(project.id)}>
                                        Delete
                                    </MyButton>
                                    <MyButton size="small" buttonStyle="navbar" onClick={() => {
                                        setTitle(project.title);
                                        setDescription(project.description);
                                        setCreate(true);
                                        setEdit(true);
                                        setId(project.id);
                                    }}>
                                        Edit
                                    </MyButton>
                                    <MyButton size="small" onClick={() => navigate(`/projects/${project.id}`)}>
                                        View Project
                                    </MyButton>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default Projects