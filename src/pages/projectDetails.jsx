import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { projects, tasks } from "../data/mockData.js";
import MyButton from "../components/buttons/Button.jsx";
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((project) => project.id === parseInt(id));
  const taskat = tasks.filter((task)=> task.projectId === parseInt(id))

  if (!project) {
    return <div>Project not found</div>;
  }
  else {
    return (
      <div className="flex justify-center min-h-screen flex-col pt-5">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p>{project.description}</p>
        {   
            taskat.map((task) => (
                <div key={task.id} className="border p-4 m-2 rounded shadow">
                    <h2 className="text-2xl font-semibold">{task.title}</h2>
                    <p>{task.description}</p>
                    <div className="flex justify-end items-center mt-2">
                        <MyButton size="small" onClick={() => navigate(`/projects/${project.id}/${task.id}`)}>
                            View Task
                        </MyButton>
                    </div>
                </div>
            ))
        }
      </div>
    );
  }
};

export default ProjectDetails;