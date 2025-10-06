import { useState, useEffect } from "react";
import { useStore } from "@context/useStore";
import { fetchCourseTopics } from "../services/lessonsService";
import { Storage } from "@utils/storage";
import { Button } from "@components/ui/button";
import { MessageCircleQuestionIcon } from "lucide-react";
import { sendQuestionService } from "../services/topicQuestionServices";
import { toast } from "sonner";

export default function Player() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"content" | "discussions">(
    "content",
  );
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const { selectedLesson, setSelectedLesson, courseLessons, setCourseLessons } =
    useStore();
  const courseId = Storage.get("selectedCourseId");

  const tabNames: { key: "content" | "discussions"; name: string }[] = [
    { key: "content", name: "Content" },
    { key: "discussions", name: "Discussions" },
  ];

  // Load lessons
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourseTopics(courseId);
        setCourseLessons(data);
        if (!selectedLesson && data.length > 0 && data[0]) {
          setSelectedLesson(data[0]); // now safe
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading lessons:", error);
        setIsLoading(false);
      }
    };
    loadCourses();
  }, []);

  // Next / Previous Handlers
  const handlePrevLesson = () => {
    if (!selectedLesson || !courseLessons) return;

    const currentIndex = courseLessons.findIndex(
      (l) => l.id === selectedLesson.id,
    );
    if (currentIndex > 0) {
      const prevLesson = courseLessons[currentIndex - 1];
      if (prevLesson) {
        setSelectedLesson(prevLesson);
      }
    } else {
      toast("You're already at the first lesson.");
    }
  };

  const handleNextLesson = () => {
    if (!selectedLesson || !courseLessons) return;

    const currentIndex = courseLessons.findIndex(
      (l) => l.id === selectedLesson.id,
    );
    if (currentIndex < courseLessons.length - 1) {
      const nextLesson = courseLessons[currentIndex + 1];
      if (nextLesson) {
        setSelectedLesson(nextLesson);
      }
    } else {
      toast("You've completed all lessons!");
    }
  };

  // Question Submit
  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.trim()) {
      if (!selectedLesson?.id) {
        console.error("Topic ID is undefined. Cannot submit the question.");
        return;
      }

      const payload = {
        courseId: courseId,
        question: question,
        topicId: selectedLesson.id,
      };

      const response = await sendQuestionService(payload);
      if (response.success) {
        toast.success("Question submitted successfully!");
      }
      setQuestion("");
      setIsQuestionFormOpen(false);
    }
  };

  const handleCancel = () => {
    setQuestion("");
    setIsQuestionFormOpen(false);
  };

  return (
    <div className="w-full bg-white dark:bg-darkSecondary rounded-lg shadow-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {isLoading || !selectedLesson ? (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
        ) : (
          <iframe
            src={selectedLesson.video}
            loading="lazy"
            className="absolute inset-0 w-full h-full rounded-t-lg"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Next / Previous Buttons */}
      <div className="flex justify-between p-4 bg-gray-100 dark:bg-darkSecondary text-darkPrimary border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={handlePrevLesson}
          disabled={
            !selectedLesson ||
            courseLessons?.findIndex((l) => l.id === selectedLesson.id) === 0
          }
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextLesson}
          disabled={
            !selectedLesson ||
            !courseLessons || // guard
            courseLessons.findIndex((l) => l.id === selectedLesson.id) ===
              courseLessons.length - 1
          }
        >
          Next
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-4 items-center p-4 bg-gray-100 text-darkPrimary dark:bg-darkSecondary">
        {tabNames.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "secondary"}
            onClick={() => setActiveTab(tab.key)}
            className={`transition-all duration-200 cursor-pointer ${
              activeTab === tab.key
                ? "shadow-md"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            aria-current={activeTab === tab.key ? "page" : undefined}
            aria-label={`Switch to ${tab.name} tab`}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            {selectedLesson?.title || "Lesson Title"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {selectedLesson?.description || "No description available."}
          </p>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === "discussions" && (
        <div className="p-6 sm:p-8 bg-gray-50  dark:bg-darkSecondary min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Lesson Discussions
            </h3>
            <Button
              onClick={() => setIsQuestionFormOpen(!isQuestionFormOpen)}
              className={`${isQuestionFormOpen ? "hidden" : "flex"} text-white cursor-pointer`}
            >
              Ask a Question <MessageCircleQuestionIcon />
            </Button>
          </div>

          {/* Question Form */}
          {isQuestionFormOpen && (
            <div className="mb-6 p-4 bg-white dark:bg-darkPrimary rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleQuestionSubmit}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full p-3 border-0 border-primary rounded-lg focus:ring-0 focus:ring-primary/90 bg-gray-50 dark:bg-darkPrimary text-gray-900 dark:text-gray-100 text-sm sm:text-base resize-y min-h-[120px]"
                  aria-label="Question input"
                  required
                />
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Be respectful while posting questions
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg focus:ring-2 cursor-pointer focus:ring-primary/90 hover:bg-primary/80"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
            Engage with the course content, ask questions, and connect with your
            mentor and peers.
          </p>

          {/* Questions List */}
          <div className="space-y-6">
            {selectedLesson && selectedLesson?.topicQuestion?.length > 0 ? (
              selectedLesson.topicQuestion.map((question, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-white dark:bg-darkPrimary rounded-xl border border-gray-200 dark:border-darkSecondary shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
                      {question.studentName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {question.studentName || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {question.createdAt
                          ? new Date(question.createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              },
                            )
                          : "Date not available"}
                      </p>
                    </div>
                  </div>

                  {/* Question */}
                  <p className="text-gray-800 dark:text-gray-100 text-sm sm:text-base font-medium mb-2">
                    {question?.question || "No question provided"}
                  </p>

                  {/* Answer */}
                  <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
                    {(question?.answer || "No answer provided yet")
                      .split("```")
                      .map((block, idx) =>
                        idx % 2 === 1 ? (
                          <pre
                            key={idx}
                            className="bg-gray-100 dark:bg-gray-800 text-sm font-mono p-3 rounded overflow-x-auto"
                          >
                            <code>{block.trim()}</code>
                          </pre>
                        ) : (
                          <p key={idx}>{block.trim()}</p>
                        ),
                      )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-darkSecondary rounded-lg">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                  No discussions available yet. Be the first to ask a question!
                </p>
                <Button
                  onClick={() => setIsQuestionFormOpen(!isQuestionFormOpen)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary focus:ring-2"
                >
                  {isQuestionFormOpen ? "Close Form" : "Start a Discussion"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
