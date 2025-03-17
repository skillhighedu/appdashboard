import { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, XCircle, Upload } from "lucide-react";
import Button from "@components/Button";
import Header from "@components/Header";
import { useStore } from "@context/useStore";
import { fetchProjects } from "../services/projectService";
import { Project } from "../types/projects";
import SubmitModal from "@components/Model";
import { toast } from "sonner";

const statusIcons = {
  Submitted: <CheckCircle className="text-green-500 w-5 h-5" />,
  Pending: <Clock className="text-yellow-500 w-5 h-5" />,
  "In Progress": <XCircle className="text-blue-500 w-5 h-5" />,
};

const getStatus = (project: Project) => {
  if (!project.solutions || project.solutions.length === 0) return "Pending";
  return project.solutions[0]?.reviewState === "SUCCESSFUL" ? "Submitted" : "In Progress";
};

export default function Projects() {
  const { projects, setProjects } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects("676c2e3cc2820bb3509dda25");
        setProjects(data);
        toast.success("Solution submitted successfully");
      } catch (error) {
        console.log(error);
      }
    };
    loadProjects();
  }, [setProjects]);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-2">
      <Header title="Projects" />
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Your Projects</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 flex flex-col justify-between transition hover:shadow-md"
          >
            {/* Project Title */}
            <h2 className="text-lg font-semibold text-gray-800">{project.projectName}</h2>

            {/* Project Link */}
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center gap-2 text-sm mt-2 hover:underline"
            >
              <FileText className="w-4 h-4" /> View Project Details
            </a>

            {/* Status & Submit */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                {statusIcons[getStatus(project)]}
                <span>{getStatus(project)}</span>
              </div>

              {!project.solutions[0]?.isCompleted ? (
                <Button
                  name="Submit"
                  icon={<Upload />}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                />
              ) : (
                <span className="text-sm font-medium text-green-600">Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit GitHub Link Modal */}
      <SubmitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        selectedProject={selectedProject}
      />
    </div>
  );
}
