import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const CreateQuiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([
      { question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);
  
    const handleSubmit = async () => {
      try {
        await axios.post(`/quiz/${courseId}`, { questions });
        toast.success('Quiz added successfully!');
        navigate('/instructor/courses');
      } catch (err) {
        console.error(err);
        toast.error('Failed to create Quiz');
      }
    };
  
    const handleAddQuestion = () => {
      setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
};

const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
};

const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
};

const handleCorrectAnswerChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = e.target.value;
    setQuestions(newQuestions);
};

    return (

      <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Quiz</h2>
                <div className="space-y-6">
                    {questions.map((q, i) => (
                        <div key={i} className="relative p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Question {i + 1}</h3>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={q.question}
                                placeholder="Enter the question here"
                                onChange={(e) => handleQuestionChange(e, i)}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {q.options.map((opt, j) => (
                                    <input
                                        key={j}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder={`Option ${j + 1}`}
                                        value={opt}
                                        onChange={(e) => handleOptionChange(e, i, j)}
                                    />
                                ))}
                            </div>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Correct Answer (must match one of the options)"
                                value={q.correctAnswer}
                                onChange={(e) => handleCorrectAnswerChange(e, i)}
                            />
                            {questions.length > 1 && (
                                <button
                                    onClick={() => handleRemoveQuestion(i)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                                    aria-label={`Remove question ${i + 1}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <button
                        onClick={handleAddQuestion}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Add More Questions
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
  };
  
  export default CreateQuiz;