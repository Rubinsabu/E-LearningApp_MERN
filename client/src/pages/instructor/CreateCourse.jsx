import { useState } from 'react';
import { useCreateCourseMutation } from '../../features/instructor/instructorApi';

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: '',
    lessons: [{ title: '', content: '', videoUrl: '' }],
  });

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...form.lessons];
    updatedLessons[index][field] = value;
    setForm({ ...form, lessons: updatedLessons });
  };

  const addLesson = () => {
    setForm({ ...form, lessons: [...form.lessons, { title: '', content: '', videoUrl: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse(form);
    setForm({
      title: '', description: '', category: '', thumbnail: '',
      lessons: [{ title: '', content: '', videoUrl: '' }],
    });
  };

  return (

  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Create New Course
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Course Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter course title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter course description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
          rows="4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          placeholder="Enter course category"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
          Thumbnail URL
        </label>
        <input
          type="text"
          id="thumbnail"
          placeholder="Enter thumbnail URL"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Lessons</h3>
        {form.lessons.map((lesson, idx) => (
          <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="mb-3">
              <label htmlFor={`lesson-title-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                Lesson {idx + 1} Title
              </label>
              <input
                type="text"
                id={`lesson-title-${idx}`}
                placeholder="Enter lesson title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400"
                value={lesson.title}
                onChange={(e) => handleLessonChange(idx, 'title', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`lesson-content-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                Lesson Content
              </label>
              <textarea
                id={`lesson-content-${idx}`}
                placeholder="Enter lesson content"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400"
                rows="3"
                value={lesson.content}
                onChange={(e) => handleLessonChange(idx, 'content', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`lesson-video-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                type="text"
                id={`lesson-video-${idx}`}
                placeholder="Enter video URL"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white text-gray-900 placeholder-gray-400"
                value={lesson.videoUrl}
                onChange={(e) => handleLessonChange(idx, 'videoUrl', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addLesson}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Lesson
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
      >
        Create Course
      </button>
    </form>
  </div>
</div>
  );
};

export default CreateCourse;
