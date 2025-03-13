
import { ClipboardList, FileText, BookOpen } from "lucide-react";
import Button from "@components/Button";
import Header from "@components/Header";

const quizzes = [
    { id: 1, title: "Quiz #1", questions: 10, icon: ClipboardList },
    { id: 2, title: "Quiz #2", questions: 15, icon: FileText },
    { id: 3, title: "Quiz #3", questions: 8, icon: BookOpen },
];

export default function Quiz() {
    // const [selectedQuiz, setSelectedQuiz] = useState(null);

    return (
        <div className="flex flex-col min-h-screen p-10 ">
            <Header title="Quiz Section" />
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Available Quizzes</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                {quizzes.map((quiz) => {
                    const Icon = quiz.icon;
                    return (
                        <div
                            key={quiz.id}
                            className="relative bg-white w-80 h-56 p-8 rounded-3xl shadow-lg border border-gray-300 
                            hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                        >
                            {/* Background Icon */}
                            <Icon className="absolute right-4 bottom-4 text-gray-300 opacity-24 w-24 h-24" />

                            {/* Content */}
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{quiz.title}</h2>
                            <p className="text-lg text-gray-600 mb-6">Total Questions: {quiz.questions}</p>
                            <Button name="Start Quiz" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
