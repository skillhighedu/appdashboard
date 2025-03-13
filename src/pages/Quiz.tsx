export default function Quiz() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz #1</h2>
          <p className="text-gray-600 mb-4">Total Questions: 10</p>
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }
  