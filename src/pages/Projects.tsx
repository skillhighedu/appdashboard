import { FileText, CheckCircle, Clock, XCircle, Upload } from "lucide-react";
import Button from "@components/Button";
import Header from "@components/Header";

const projects = [
    { id: 1, name: "Project Alpha", description: "A full-stack web application.", pdfLink: "#", status: "Pending" },
    { id: 2, name: "Machine Learnin", description: "Predictive .", pdfLink: "#", status: "Submitted" },
    { id: 3, name: "E-Commerce Platform", description: "An online shopping website.", pdfLink: "#", status: "In Progress" },
    { id: 4, name: "Mobile Banking App", description: "A fintech mobile application.", pdfLink: "#", status: "Pending" },
    { id: 5, name: "AI Chatbot", description: "An NLP-based chatbot.", pdfLink: "#", status: "Submitted" },
    { id: 6, name: "Cloud Storage System", description: "Secure file storage service.", pdfLink: "#", status: "In Progress" },
    { id: 7, name: "Learning Management System", description: "A digital education platform.", pdfLink: "#", status: "Pending" },
    { id: 8, name: "IoT Smart Home", description: "IoT-based automation system.", pdfLink: "#", status: "Submitted" },
];

// Status Icons
const statusIcons = {
    "Submitted": <CheckCircle className="text-green-500 w-6 h-6" />,
    "Pending": <Clock className="text-yellow-500 w-6 h-6" />,
    "In Progress": <XCircle className="text-blue-500 w-6 h-6" />
};

export default function Projects() {
    return (
        <div className="flex flex-col min-h-screen p-10">
            <Header title="Projects" />
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Projects</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="relative bg-white w-80 h-64 p-6 rounded-3xl shadow-lg border border-gray-300 
                        hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                    >
                        {/* Background Icon */}
                        <FileText className="absolute right-4 bottom-4 text-gray-300 opacity-24 w-20 h-20" />

                        {/* Content */}
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{project.name}</h2>
                        <p className="text-lg text-gray-600 mb-4">{project.description}</p>

                        {/* Download PDF */}
                        <a href={project.pdfLink} className="text-darkSecondary font-normal flex items-center mb-4">
                            <FileText className="w-5 h-5 mr-2" /> Download PDF
                        </a>

                        {/* Submit Button & Status */}
                        <div className="flex justify-between items-center">
                            <Button name="Submit" icon={<Upload/>}/>
                            <div className="flex items-center">
                                {statusIcons[project.status as keyof typeof statusIcons]}
                                <span className="ml-2 text-sm font-medium text-gray-700">{project.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
