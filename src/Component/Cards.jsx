import { Star } from "lucide-react";
import React, { useState } from "react";

function Cards({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(movie);
  return (
    <div
      className="relative bg-white rounded-lg overflow-hidden shadow-lg w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="w-full h-80 object-cover"
        />

        {/* Vote Average Badge */}
        <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-65 text-white font-bold py-1 px-3 rounded-full flex items-center">
        <Star className="w-4 h-4 text-yellow-400 mr-1"/>
          <span>{movie.vote_average.toFixed(1)}/10</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {movie.title}
        </h3>

        {/* Release Date */}
        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Released:</span>{" "}
          {new Date(movie.releaseDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2">
          {movie.genre_ids.map((genre) => (
            <span
              key={genre}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay with More Info Button */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 flex items-end justify-center p-6 ${
          isHovered ? "opacity-100" : ""
        }`}
      >
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}

export default Cards;
