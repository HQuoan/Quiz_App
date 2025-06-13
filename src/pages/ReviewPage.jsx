import { useNavigate, useParams } from "react-router-dom";
import { useReviewSession } from "../features/quiz-sessions/useReviewSession";

function ReviewPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { isPending, userAnswers } = useReviewSession(sessionId);

  if (isPending) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">Review Your Quiz</h3>
        <button className="btn btn-success" onClick={() => navigate(`/`)}>Back</button>
      </div>

      {userAnswers.length === 0 && (
        <p className="text-muted">No answers found for this session.</p>
      )}

      <div className="overflow-auto" style={{ maxHeight: "80vh" }}>
        {userAnswers.map((answer, index) => {
          const { question } = answer;
          const isBoolean = question.questionType === "boolean";

          const renderBooleanOptions = () => {
            const options = [true, false];
            return (
              <ul className="list-group">
                {options.map((val) => {
                  const isSelected = val === answer.selectedAnswer;
                  const isCorrect = val === question.correctAnswerBool;

                  return (
                    <li
                      key={val.toString()}
                      className={`list-group-item d-flex justify-content-between align-items-center
                        ${isCorrect ? "list-group-item-success" : ""}
                        ${isSelected && !isCorrect ? "list-group-item-warning" : ""}
                      `}
                    >
                      {val.toString()}
                      {isSelected && <span className="badge bg-primary">Your Choice</span>}
                      {isCorrect && <span className="badge bg-success">Correct</span>}
                    </li>
                  );
                })}
              </ul>
            );
          };

          const renderMultipleOptions = () => (
            <ul className="list-group">
              {question.questionOptions.map((opt) => {
                const isSelected = opt.optionId === answer.selectedOptionId;
                const isCorrect = opt.isCorrect;

                return (
                  <li
                    key={opt.optionId}
                    className={`list-group-item d-flex justify-content-between align-items-center
                      ${isCorrect ? "list-group-item-success" : ""}
                      ${isSelected && !isCorrect ? "list-group-item-warning" : ""}
                    `}
                  >
                    {opt.optionText}
                    {isSelected && <span className="badge bg-primary">Your Choice</span>}
                    {isCorrect && <span className="badge bg-success">Correct</span>}
                  </li>
                );
              })}
            </ul>
          );

          return (
            <div key={answer.answerId} className="mb-4 p-3 border rounded">
              <h5>{index + 1}. {question.questionText}</h5>
              {isBoolean ? renderBooleanOptions() : renderMultipleOptions()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewPage;
