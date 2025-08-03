import { getThumbnailUrl } from '../utils/thumbnailUtils.js';

const ThumbnailImage = ({ 
  url, 
  alt, 
  className = "w-full h-48 object-cover rounded mb-4",
  placeholderText = "No Image" 
}) => {
  const thumbnailUrl = getThumbnailUrl(url);

  if (!url || !thumbnailUrl) {
    return null; // Don't render anything if no valid URL
  }

  return (
    <img
      src={thumbnailUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = `https://via.placeholder.com/320x180?text=${placeholderText}`;
      }}
    />
  );
};

export default ThumbnailImage;