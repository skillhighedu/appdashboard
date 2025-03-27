import { useState, useEffect } from "react";
import { FileText, Upload } from "lucide-react";
import {Button} from "@components/ui/button";
import Header from "@components/Header";
import { useStore } from "@context/useStore";
import { fetchProjects } from "../services/projectService";
import { Project } from "../types/projects";
import SubmitModal from "@components/Model";
import { Storage } from "@utils/storage";

export default function Projects() {
  const { projects, setProjects } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseId = Storage.get("selectedCourseId");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(courseId);
        setProjects(data);
        console.log(data);
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
    <div className="flex flex-col min-h-screen px-4 py-6">
      {/* Header */}
      <Header title="Projects" />
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-primary mt-4">
        Your Projects
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-200 text-center mt-2">
        Manage and submit your project solutions.
      </p>

      {/* Learn GitHub Button */}
      {/* <div className="flex justify-center mt-6">
        <a
          href="https://docs.github.com/en/get-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button name="Learn GitHub" icon={<GithubIcon />} />
        </a>
      </div> */}

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-darkSecondary rounded-2xl shadow-md p-6 border border-gray-200 dark:border-darkPrimary flex flex-col justify-between transition hover:shadow-lg hover:-translate-y-1 duration-200"
          >
            {/* Project Title */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
              {project.projectName}
            </h2>

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
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  {project.solutions[0]?.reviewState || "Pending"}
                </span>
              </div>

              {!project.solutions[0]?.isCompleted ? (
                <Button className="text-white rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                >
                  Submit <Upload />
                </Button>
              
              ) : (

                <Button className="text-white rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                Check Solution <Upload />
              </Button>
               
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
