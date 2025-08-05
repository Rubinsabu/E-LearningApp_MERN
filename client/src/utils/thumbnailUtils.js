// Function to extract YouTube video ID from URL
export const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null;
  };
  
  export const getThumbnailUrl = (url) => {
    // Check if it's a YouTube URL
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    // Check if it's already a direct image URL
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp)$/i;
    if (imageExtensions.test(url)) {
      return url;
    }
    
    // Return null if neither YouTube nor image URL
    return null;
  };