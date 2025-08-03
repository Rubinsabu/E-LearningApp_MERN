// import { useEffect, useState } from 'react';
// import axios from '../../api/axiosInstance';
// import { useNavigate, useParams } from 'react-router-dom';

// const AttemptQuiz = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       const res = await axios.get(`/quiz/${courseId}`);
//       setQuiz(res.data);
//     };
//     fetchQuiz();
//   }, [courseId]);

//   const handleSubmit = async () => {
//     const res = await axios.post(`/quiz/submit/${courseId}`, { answers });
//     setResult(res.data);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl mb-4 font-semibold">Quiz</h2>
//       {quiz.map((q, i) => (
//         <div key={q._id} className="mb-6">
//           <p className="font-medium">{i + 1}. {q.question}</p>
//           {q.options.map((opt, j) => (
//             <label key={j} className="block">
//               <input
//                 type="radio"
//                 name={`question-${q._id}`}
//                 value={opt}
//                 checked={answers[q._id] === opt}
//                 onChange={() =>
//                   setAnswers(prev => ({ ...prev, [q._id]: opt }))
//                 }
//               /> {opt}
//             </label>
//           ))}
//         </div>
//       ))}

//     <div className='flex justify-between'>
//       <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>

//       {result && <button onClick={()=>navigate("/enrolled-courses")} className="bg-green-600 text-white px-4 py-2 rounded-md">Finish Course</button>}
//     </div>
    
//       {result && (
//         <div className="mt-6 bg-green-100 p-4 rounded-md">
//           <h3 className="text-lg font-bold">Result</h3>
//           <p>You scored {result.score} out of {result.total}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttemptQuiz;


import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const AttemptQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`/quiz/${courseId}`);
      setQuiz(res.data);
    };
    fetchQuiz();
  }, [courseId]);

  const handleSubmit = async () => {
    const res = await axios.post(`/quiz/submit/${courseId}`, { answers });
    setResult(res.data);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getProgressPercentage = () => {
    return quiz.length > 0 ? (getAnsweredCount() / quiz.length) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Quiz</h1>
          <p className="text-lg text-gray-600">Test your knowledge and complete the course</p>
        </div>

        {/* Progress Section */}
        {quiz.length > 0 && !result && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quiz Progress</h3>
                  <p className="text-sm text-gray-600">
                    {getAnsweredCount()} of {quiz.length} questions answered
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(getProgressPercentage())}%
                </div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Quiz Questions */}
        {!result && quiz.length > 0 && (
          <div className="space-y-8">
            {quiz.map((q, i) => (
              <div key={q._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        answers[q._id] ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}>
                        {answers[q._id] ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Question {i + 1}
                      </h3>
                      <p className="text-gray-700 mt-1">{q.question}</p>
                    </div>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="p-6">
                  <div className="space-y-3">
                    {q.options.map((opt, j) => (
                      <label 
                        key={j} 
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                          answers[q._id] === opt 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          value={opt}
                          checked={answers[q._id] === opt}
                          onChange={() =>
                            setAnswers(prev => ({ ...prev, [q._id]: opt }))
                          }
                          className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className={`ml-4 text-lg ${
                          answers[q._id] === opt ? 'text-blue-900 font-medium' : 'text-gray-700'
                        }`}>
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {!result && quiz.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleSubmit} 
              disabled={getAnsweredCount() < quiz.length}
              className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                getAnsweredCount() < quiz.length
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submit Quiz
            </button>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="mt-8 space-y-6">
            {/* Results Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6 text-white">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h2 className="text-3xl font-bold">Quiz Completed!</h2>
                    <p className="text-lg opacity-90">Congratulations on finishing the quiz</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-6xl font-bold text-green-600 mb-2">
                      {result.score}/{result.total}
                    </div>
                    <div className="text-2xl text-gray-600">
                      {Math.round((result.score / result.total) * 100)}% Score
                    </div>
                  </div>

                  {/* Score Visualization */}
                  <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(result.score / result.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0</span>
                      <span>{result.total}</span>
                    </div>
                  </div>

                  {/* Performance Message */}
                  <div className="mb-8">
                    {(result.score / result.total) >= 0.8 ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-green-800 font-medium">🎉 Excellent work! You've mastered this material.</p>
                      </div>
                    ) : (result.score / result.total) >= 0.6 ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="text-yellow-800 font-medium">👍 Good job! You have a solid understanding.</p>
                      </div>
                    ) : (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <p className="text-orange-800 font-medium">📚 Keep learning! Consider reviewing the material.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button 
                onClick={() => navigate("/enrolled-courses")} 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete Course
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {quiz.length === 0 && !result && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Quiz</h3>
                <p className="text-gray-600">Please wait while we prepare your quiz questions...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptQuiz;
