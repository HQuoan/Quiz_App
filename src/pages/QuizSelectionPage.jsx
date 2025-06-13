import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";
import { useQuizzes } from "../features/quizzes/useQuizzes";
import { useMySessions } from "../features/quiz-sessions/useMySessions";
import { useState } from "react";

function QuizSelectionPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const { logout } = useLogout();
  const { quizzes, isPending } = useQuizzes();
  const [showHistory, setShowHistory] = useState(false);

  const { sessions } = useMySessions();
  console.log("mysee", sessions);

  const startQuiz = (id) => navigate(`/quiz/${id}`);

  return (
    <>
      {isAuthenticated && (
        <div className="d-flex justify-content-between align-items-center">
          <h2>Welcome, {user.username}!</h2>{" "}
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <div className="container mt-3">
        <h2>Select a Quiz</h2>
        <ul className="list-group mb-3">
          {quizzes.map((quiz) => (
            <li
              key={quiz.quizId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {quiz.title}
              <button
                className="btn btn-success"
                onClick={() => startQuiz(quiz.quizId)}
              >
                Start
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowHistory((prev) => !prev)}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>

      {showHistory && (
        <div
          className="border rounded p-3 mb-4 mt-2"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h5>Quiz History</h5>
          {sessions?.length === 0 && <p>No history found.</p>}
          {sessions?.map((s, i) => (
            <div
              key={`${s.quizSessionId}-${i}`}
              className="mb-3 pb-2 border-bottom small"
            >
              <p className="mb-1">
                <strong>Session ID:</strong> {s.quizSessionId}
              </p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                {s.isCompleted ? "✅ Completed" : "⏳ In Progress"}
              </p>
              <p className="mb-1">
                <strong>Start:</strong> {new Date(s.startTime).toLocaleString()}
              </p>
              {s.isCompleted && s.quizResult && (
                <>
                  <p className="mb-1">
                    <strong>Score:</strong> {s.quizResult.score * 100}%
                  </p>
                  <p className="mb-1">
                    <strong>Passed:</strong> {s.quizResult.passed ? "✅" : "❌"}
                  </p>
                  <p className="mb-1">
                    <strong>Finished:</strong>{" "}
                    {new Date(s.quizResult.completionDate).toLocaleString()}
                  </p>
                  <p className="mb-1">
                    <strong>Time:</strong> {s.quizResult.totalTimeTaken}s
                  </p>
                </>
              )}

              <button
                className="btn btn-sm btn-warning mt-2"
                onClick={() => navigate(`/quiz/${s.quizId}`)}
              >
                Try Again
              </button>
              {s.isCompleted && (
                <button
                  className="btn btn-sm btn-success mt-2 ms-2"
                  onClick={() => navigate(`/review/${s.quizSessionId}`)}
                >
                  Review
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default QuizSelectionPage;
