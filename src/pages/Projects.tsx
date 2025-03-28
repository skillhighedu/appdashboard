import { useState, useEffect } from "react";
import { FileText, Upload } from "lucide-react";
import { Button } from "@components/ui/button";
import Header from "@components/Header";
import { useStore } from "@context/useStore";
import { fetchProjects } from "../services/projectService";
import { Project } from "../types/projects";
import SubmitModal from "@components/Model";
import { Storage } from "@utils/storage";
import { Skeleton } from "@components/ui/skeleton";

export default function Projects() {
  const { projects, setProjects } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const courseId = Storage.get("selectedCourseId");

  useEffect(() => {
    const loadProjects = async () => {
      if (!courseId) {
        console.error("Course ID is missing.");
        setIsLoading(false);
        return;
      }
      try {
        const data = await fetchProjects(courseId);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, [courseId, setProjects]);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-6">
      <Header title="Projects" />
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-primary mt-4">
        Your Projects
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-200 text-center mt-2">
        Manage and submit your project solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))
        ) : projects && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-darkSecondary rounded-2xl shadow-md p-6 border border-gray-200 dark:border-darkPrimary flex flex-col justify-between transition hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
                {project.projectName}
              </h2>

              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 flex items-center gap-2 text-sm mt-2 hover:underline"
              >
                <FileText className="w-4 h-4" /> View Project Details
              </a>

              <div className="flex items-center justify-between mt-6">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {project.solutions[0]?.reviewState || "Pending"}
                </span>

                <Button
                  className="text-white rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                >
                  {project.solutions[0]?.isCompleted ? "Check Solution" : "Submit"} <Upload />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
            No projects available.
          </p>
        )}
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedProject={selectedProject}
      />
    </div>
  );
}