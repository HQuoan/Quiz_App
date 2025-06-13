import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStartQuizSession } from "../features/quiz-sessions/useStartQuizSession";
import toast from "react-hot-toast";
import { useCheckAnswer } from "../features/user-answers/useCheckAnswer";

function QuizPage() {
  const { id: quizId } = useParams();
  const navigate = useNavigate();

  const { isPending, startQuizSession } = useStartQuizSession();
  const { isPending: isChecking, checkAnswer } = useCheckAnswer();
  const [session, setSession] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Bắt đầu quiz session khi vào trang
  useEffect(() => {
    if (!quizId) return;
    startQuizSession(
      { quizId: +quizId },
      {
        onSuccess: (data) => {
          setSession(data?.result);
          console.log("session", data?.result);
        },
        onError: () => {
          toast.error("Failed to start quiz session");
          navigate("/");
        },
      }
    );
  }, [quizId, startQuizSession, navigate]);

  if (isPending || !session) {
    return <div className="container mt-5">Loading...</div>;
  }

  const questions = session?.questions || [];
  const currentQuestion = questions[current];

  const checkAnswerHandler = () => {
    const payload =
      currentQuestion.questionType === "boolean"
        ? {
            quizSessionId: session.quizSessionId,
            questionId: currentQuestion.questionId,
            selectedAnswer: selectedOption === 1 ? true : false,
          }
        : {
            quizSessionId: session.quizSessionId,
            questionId: currentQuestion.questionId,
            selectedOptionId: selectedOption,
          };

    checkAnswer(payload, {
      onSuccess: (data) => {
        setIsCorrect(data.result.isCorrect);
        setIsCheck(true);
      },
      onError: (err) => {
        toast.error("Failed to check answer");
      },
    });
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelectedOption(null);
      setIsCheck(false);
    } else {
      navigate(`/result/${session.quizSessionId}`, {
        // state: { score, total: questions.length, sessionId: session.quizSessionId },
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h5>
          Question {current + 1} / {questions.length}
        </h5>
        <button className="btn btn-danger" onClick={() => navigate(`/`)}>
          Exit
        </button>
      </div>
      <div className="progress mb-3">
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>
      <p>{currentQuestion.questionText}</p>
      <div className="list-group mb-3">
        {currentQuestion.questionType === "boolean" ? (
          <div className="list-group mb-3">
            {[
              { value: 1, label: "True" },
              { value: 0, label: "False" },
            ].map((opt) => {
              const isSelected = selectedOption === opt.value;
              const isTheCorrectOne =
                isCheck && selectedOption === opt.value && isCorrect;
              const isTheWrongOne =
                isCheck && selectedOption === opt.value && !isCorrect;

              let className = "list-group-item";
              if (isTheCorrectOne) className += " list-group-item-success";
              else if (isTheWrongOne) className += " list-group-item-danger";

              return (
                <label key={opt.value} className={className}>
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="option"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => setSelectedOption(opt.value)}
                    disabled={isCheck}
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        ) : (
          <div className="list-group mb-3">
            {currentQuestion.questionOptions.map((opt) => {
              const isSelected = selectedOption === opt.optionId;
              const isTheCorrectOne =
                isCheck && opt.optionId === selectedOption && isCorrect;
              const isTheWrongOne =
                isCheck && opt.optionId === selectedOption && !isCorrect;

              let className = "list-group-item";
              if (isTheCorrectOne) className += " list-group-item-success";
              else if (isTheWrongOne) className += " list-group-item-danger";

              return (
                <label key={opt.optionId} className={className}>
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="option"
                    value={opt.optionId}
                    checked={isSelected}
                    onChange={() => setSelectedOption(opt.optionId)}
                    disabled={isCheck}
                  />
                  {opt.optionText}
                </label>
              );
            })}
          </div>
        )}
      </div>
      <button
        className="btn btn-secondary me-2"
        onClick={nextQuestion}
        disabled={!isCheck}
      >
        Next
      </button>
      {!isCheck && (
        <button
          className="btn btn-primary "
          onClick={checkAnswerHandler}
          disabled={selectedOption === null}
        >
          Check Answer
        </button>
      )}
    </div>
  );
}

export default QuizPage;
