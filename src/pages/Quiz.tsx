import { useState, useEffect } from "react";
import { useStore } from "@context/useStore";
import { fetchQuizQuestions, submitQuiz } from "../services/quizService";
import { useNavigate } from "react-router-dom";
import Header from "@components/Header";
import Loading from "@components/Loading";
import { Storage } from "@utils/storage";


interface Option {
  id: string;
  text: string;
}

interface UserAnswer {
  questionId: string;
  answerId: string;
}

export default function Quiz() {
  const { quizQuestions, setQuizQuestion } = useStore(); // quizQuestions is Quiz | null
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<string | undefined>();
  const quizId = Storage.get("quizid");

  useEffect(() => {
    const loadQuizQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(quizId); 
        setQuizQuestion(data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    loadQuizQuestions();
  }, [quizId]);

  console.log(quizQuestions);

  const currentQuestion = quizQuestions?.questions?.[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / (quizQuestions?.questions?.length || 1)) * 100;

  const handleOptionSelect = (option: Option) => setSelectedOption(option);

  const handleSubmitAnswer = () => {
    if (currentQuestion && selectedOption) {
      setUserAnswers((prev) => [
        ...prev,
        { questionId: currentQuestion.id, answerId: selectedOption.id },
      ]);
    }

    if (currentQuestionIndex < (quizQuestions?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
      handleQuizResult();
    }
  };

  const handleQuizResult = async () => {
    try {
      const result = await submitQuiz(quizId, userAnswers);
      console.log(result)
      setQuizScore(result);
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    }
  };

  if (!quizQuestions || !quizQuestions.questions?.length) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center p-4 font-poppins dark:bg-darkBg min-h-screen">
      <div className="w-full flex justify-start">
        <Header title="Quiz" />
      </div>
      <div className="bg-white dark:bg-darkSecondary rounded-xl shadow-lg w-full max-w-3xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-darkBg dark:text-gray-200 mb-6">
          Quiz Challenge
        </h2>
        {!quizCompleted ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Question {currentQuestionIndex + 1} of {quizQuestions.questions.length}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-main h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-darkBg dark:text-gray-200 mb-4">
              {currentQuestion?.text}
            </h3>
            <div className="space-y-4">
              {currentQuestion?.answers?.map((option: Option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full py-3 text-left rounded-lg border pl-4 transition-all cursor-pointer duration-200 ${
                    selectedOption?.id === option.id
                      ? "bg-blue-100 text-primary border-primary"
                      : "bg-gray-100 dark:bg-darkPrimary text-darkBg dark:text-gray-200 border-transparent"
                  } hover:bg-white hover:dark:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className={`w-full py-3 mt-6 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedOption
                  ? "bg-primary hover:bg-primary"
                  : "bg-gray-300 dark:text-darkPrimary cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex === quizQuestions.questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-darkBg dark:text-gray-200 mb-4">
              Quiz Completed!
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {quizScore !== null
                ? `You scored ${quizScore}% in this quiz.`
                : "Loading score..."}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto py-3 px-6 bg-gray-300 text-darkBg font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}