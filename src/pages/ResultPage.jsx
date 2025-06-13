import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEndQuizSession } from '../features/quiz-sessions/useEndQuizSession';

function ResultPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { isPending, endQuizSession } = useEndQuizSession();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    endQuizSession(
      { quizSessionId: +sessionId },
      {
        onSuccess: (data) => setResult(data.result),
        onError: () => navigate('/'),
      }
    );
  }, [sessionId, endQuizSession, navigate]);

  if (isPending || !result) {
    return <div className="container mt-5">Loading result...</div>;
  }

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">🎉 Quiz Result</h2>

      <div className={`alert ${result.passed ? 'alert-success' : 'alert-danger'}`}>
        {result.passed ? 'You passed the quiz! ✅' : 'You did not pass. ❌'}
      </div>

      <p><strong>Score:</strong> {result.score * 100}%</p>
      <p><strong>Total Time:</strong> {Math.floor(result.totalTimeTaken / 60)} min {result.totalTimeTaken % 60} sec</p>
      <p><strong>Completed At:</strong> {new Date(result.completionDate).toLocaleString()}</p>

      <div className="mt-4">
        <button className="btn btn-warning me-2" onClick={() => navigate(-1)}>
          Try Again
        </button>
        <button className="btn btn-info me-2"  onClick={() => navigate(`/review/${sessionId}`)}>
          Review
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Quiz List
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
