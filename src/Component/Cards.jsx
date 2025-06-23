import { Star } from "lucide-react";
import React, { useState } from "react";

function Cards({ movie, movie: { poster_path: movirePoster = "" } = {} }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden shadow-lg w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={
            imageError || !movirePoster
              ? "movies.png"
              : `https://image.tmdb.org/t/p/w500${movirePoster}`
          }
          alt={`${movie.title} poster`}
          className="w-full h-80 object-cover"
          onError={handleImageError}
          loading="lazy" // Add lazy loading for better performance
        />

        <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-75 text-white font-bold py-1 px-3 rounded-full flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{movie.vote_average?.toFixed(1) || 'N/A'}/10</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {movie.title}
        </h3>

        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Released:</span>{" "}
          {movie.release_date 
            ? new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "TBA"
          }
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2">
          {movie.genre_ids?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-0 transition-opacity duration-300 flex flex-col items-center justify-between p-6 ${
          isHovered ? "opacity-100" : ""
        }`}
      >
        <p className="text-stone-200 flex flex-1/2 text-center justify-center items-end pb-5 text-sm">
          {movie.overview || "No overview available."}
        </p>
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300">
          View Details
        </button> */}
      </div>
    </div>
  );
}

export default Cards;