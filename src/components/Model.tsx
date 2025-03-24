import { memo, useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import Button from "@components/Button";
import Input from "./Input";
import TextArea from "./TextBox";
import { Project, ProjectSolution } from "../types/projects";
import {
  submitProjectSolution,
  updateProjectSolution,
} from "../services/projectService";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (githubLink: string, description: string) => void;
  selectedProject: Project | null;
}

const SubmitModal = memo(
  ({ isOpen, onClose, onSubmit, selectedProject }: SubmitModalProps) => {
    const [projectSolution, setProjectSolution] = useState<ProjectSolution>({
      githubLink: "",
      explanation: "",
    });
    console.log(selectedProject);

    // Populate state when a project is selected
    useEffect(() => {
      if (selectedProject) {
        const existingSolution = selectedProject.solutions?.[0] ?? null;
        setProjectSolution({
          githubLink: existingSolution?.githubLink || "",
          explanation: existingSolution?.explanation || "",
        });
      }
    }, [selectedProject]);

    if (!isOpen || !selectedProject) return null;

    // SUBMIT FORM (for new solutions)
    const handleFormSubmit = async () => {
      try {
        await submitProjectSolution(selectedProject.id, projectSolution);
        onSubmit(projectSolution.githubLink, projectSolution.explanation);
        setProjectSolution({ githubLink: "", explanation: "" }); // Reset fields
        onClose();
      } catch (error) {
        console.error("Error submitting solution:", error);
      }
    };

    // UPDATE FORM (for existing solutions)
    const handleUpdateFormSubmit = async () => {
      if (!selectedProject?.solutions?.[0]?.id) {
        console.error("Project solution ID is missing.");
        return;
      }

      await updateProjectSolution(
        selectedProject.solutions[0].id,
        projectSolution,
      );
      onSubmit(projectSolution.githubLink, projectSolution.explanation);
      setProjectSolution({ githubLink: "", explanation: "" }); // Reset fields
      onClose();
    };

    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40">
        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-xl w-96">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 pb-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
              Submit Solution
            </h2>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
            </button>
          </div>

          {/* Project Details */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-200">
              {selectedProject.projectName}
            </h3>
            <a
              href={selectedProject.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center gap-1 mt-1 text-sm hover:underline"
            >
              View Project PDF <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Input Fields */}
          <Input
            label="GitHub Link"
            type="text"
            placeholder="Enter GitHub repository URL"
            value={projectSolution.githubLink}
            onChange={(e) =>
              setProjectSolution((prev) => ({
                ...prev,
                githubLink: e.target.value,
              }))
            }
          />

          <TextArea
            label="Description"
            placeholder="Write a short description about your solution"
            value={projectSolution.explanation}
            onChange={(e) =>
              setProjectSolution((prev) => ({
                ...prev,
                explanation: e.target.value,
              }))
            }
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            {selectedProject?.solutions?.length &&
            !selectedProject.solutions[0]?.isCompleted ? (
              <Button name="Update" onClick={handleUpdateFormSubmit} />
            ) : !selectedProject?.solutions?.length ? (
              <Button name="Submit" onClick={handleFormSubmit} />
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);

export default SubmitModal;
