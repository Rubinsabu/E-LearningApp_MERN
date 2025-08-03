import Quiz from '../models/quizModel.js';

export const createQuiz = async (req, res) => {
  const { questions } = req.body; // array of {question, options, correctAnswer}
  const { courseId } = req.params;

  try {
    const savedQuestions = await Quiz.insertMany(
      questions.map(q => ({ ...q, course: courseId }))
    );
    res.status(201).json(savedQuestions);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
};

export const getQuizByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const quiz = await Quiz.find({ course: courseId }).select('-correctAnswer');
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
};

export const submitQuiz = async (req, res) => {
  const { courseId } = req.params;
  const { answers } = req.body; // { [questionId]: selectedOption }

  try {
    const questions = await Quiz.find({ course: courseId });
    let score = 0;

    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    res.json({ total: questions.length, score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz' });
  }
};
