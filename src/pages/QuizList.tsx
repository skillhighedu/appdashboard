import { ArrowUpRight, BookOpen } from "lucide-react";
import Button from "@components/Button";
import Header from "@components/Header";
import { fetchAllQuizzes } from "../services/quizService";
import { useStore } from "@context/useStore";
import { useEffect } from "react";
import { Storage } from "@utils/storage";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const { setQuizzes, quizzes } = useStore();
  const courseId = Storage.get("selectedCourseId");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchAllQuizzes(courseId);
        setQuizzes(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourses();
  }, [courseId]);

  const handleSelectedQuiz = (quizId:string) => {
    Storage.set("quizid", quizId);
    navigate("/quiz");
  }

  return (
    <div className="flex flex-col min-h-screen p-2">
      <Header title="Quiz Section" />
      <h1 className="text-md md:text-2xl font-bold mb-8 text-center text-gray-800 dark:text-primary">
        Available Quizzes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center ">
        {quizzes &&
          quizzes.map((quiz, index) => {
            return (
              <div
                key={quiz.id}
                className="relative bg-white dark:bg-darkSecondary w-80 h-56 p-8 rounded-3xl shadow-lg border border-gray-300 dark:border-darkPrimary 
                            hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* Background Icon */}
                <BookOpen className="absolute right-4 bottom-4 text-gray-300 opacity-24 w-24 h-24" />

                {/* Display Quiz Number */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-50 mb-3 text-left">
                  Quiz {index + 1}
                </h2>

                <p className="text-lg text-gray-600 mb-6">
                  Total Questions: {quiz.questions.length}
                </p>
              
                  <Button  onClick={()=>handleSelectedQuiz(quiz.id)} name="Start Quiz" icon={<ArrowUpRight />} />
           
              </div>
            );
          })}
      </div>
    </div>
  );
}
