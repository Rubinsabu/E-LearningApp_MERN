import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import axios from '../../api/axiosInstance';

const LessonPlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [watched, setWatched] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchLessons = async () => {
    const { data } = await axios.get(`/lessons/${courseId}`);
    console.log("lesson details: ",data)
    setLessons(data);
  };

  const fetchWatched = async () => {
    const { data } = await axios.get(`/lessons/${courseId}/watched`);
    setWatched(data);
  };

  const toggleWatched = async (lessonId) => {
    const { data } = await axios.post(`/lessons/${courseId}/lesson/${lessonId}/watch`);
    setWatched(data.watchedLessons);
  };

  useEffect(() => {
    fetchLessons();
    fetchWatched();
  }, [courseId]);

  if (lessons.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading lessons...</p>
      </div>
    );
  }

  const currentLesson = lessons[currentIndex];
  const isWatched = watched.includes(currentLesson._id);
  const hasPrevLesson = currentIndex > 0;
  const hasNextLesson = currentIndex < lessons.length - 1;

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(currentLesson.videoUrl);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handlePrevLesson = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNextLesson = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (

    <div className="min-h-screen bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Lesson {currentIndex + 1}: {currentLesson.title}
          </h2>

          {/* Video Player */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-5">
            {videoId ? (
              <YouTube
                videoId={videoId}
                opts={opts}
                className="w-full "
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
                <p className="text-gray-600 text-lg">Invalid YouTube URL</p>
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Content</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {currentLesson.content}
            </p>
          </div>

          {/* Controls and Progress */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {hasPrevLesson && (
                <button
                  onClick={handlePrevLesson}
                  className="flex items-center bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Lesson
                </button>
              )}
              <button
                className={`flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200 ${
                  isWatched ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => toggleWatched(currentLesson._id)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isWatched ? 'Unmark as Watched' : 'Mark as Watched'}
              </button>
              {hasNextLesson && (
                <button
                  onClick={handleNextLesson}
                  className="flex items-center bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Next Lesson
                </button>
              )}
            </div>
            {watched.length !== lessons.length && !hasNextLesson && (
              <p className="text-orange-600 font-semibold text-sm">
                Course Incomplete!
              </p>
            )}
            {watched.length === lessons.length && (
              <button
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={() => navigate(`/student/attempt-quiz/${courseId}`)}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Attend Quiz
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(watched.length / lessons.length) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Progress: {watched.length}/{lessons.length} lessons watched
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
