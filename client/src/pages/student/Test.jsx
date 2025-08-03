import React from 'react';
import ReactPlayer from 'react-player';

const TestVideo = () => {

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="p-4">
      <ReactPlayer 
        src="https://www.youtube.com/watch?v=czfaT9UacWk" 
        controls 
        width="100%"
      />
    </div>
    </div>
  );
};

export default TestVideo;