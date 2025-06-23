import React, { useState, useEffect } from "react";
import {
  Star,
  X,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Users,
  Award,
  Film,
  AlertCircle,
  RefreshCw,
  Play,
  Heart,
  Share2,
  Bookmark,
  TrendingUp,
} from "lucide-react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Enhanced header skeleton with shimmer effect */}
      <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-400/60 via-transparent to-transparent" />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Enhanced poster skeleton */}
          <div className="flex-shrink-0">
            <div className="w-40 h-60 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded-xl mx-auto md:mx-0 shadow-lg"></div>
          </div>

          <div className="flex-1 space-y-4">
            {/* Enhanced skeleton elements */}
            <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded-lg w-3/4"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg w-1/2"></div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="h-10 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-[length:200%_100%] animate-shimmer rounded-full w-32"></div>
              <div className="h-10 bg-gradient-to-r from-green-200 via-green-100 to-green-200 bg-[length:200%_100%] animate-shimmer rounded-full w-24"></div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-[length:200%_100%] animate-shimmer rounded-full w-16"
                ></div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded mr-2"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer rounded-lg mb-4 w-32"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg w-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorState = ({ onRetry }) => {
  return (
    <div className="p-8 text-center">
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6 animate-bounce-slow shadow-lg">
          <AlertCircle className="w-10 h-10 text-red-600 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
          We couldn't load the movie information. Please check your connection
          and try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center gap-3">
              <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
              Try Again
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const MovieModal = ({
  movie,
  isOpen,
  onClose,
  loading = false,
  error = false,
  onRetry,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const ActionButton = ({
    icon: Icon,
    onClick,
    className,
    children,
    variant = "primary",
  }) => {
    const baseClasses =
      "group relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl";
    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
      secondary:
        "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
      accent:
        "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <div className="relative flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {children}
        </div>
      </button>
    );
  };

  const StatCard = ({ icon: Icon, label, value, color = "blue" }) => {
    const colors = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      purple: "from-purple-500 to-violet-500",
      amber: "from-amber-500 to-orange-500",
    };

    return (
      <div className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${colors[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        ></div>
        <div className="relative flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${colors[color]} shadow-lg`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">{label}</p>
            <p className="text-lg font-bold text-white">{value}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-all duration-500"
        onClick={onClose}
        style={{
          background: movie?.backdrop_path
            ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "rgba(0,0,0,0.8)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl transform transition-all duration-500 scale-100 animate-modal-enter border border-white/10">
        {/* Enhanced close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:rotate-90 group shadow-lg"
        >
          <X
            size={24}
            className="group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Content */}
        <div className="relative">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState onRetry={onRetry} />
          ) : movie ? (
            <div className="animate-fade-in">
              {/* Enhanced hero section */}
              <div className="relative h-80 md:h-96 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
                <img
                  src={
                    movie?.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                      : "/api/placeholder/1200/400"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                {/* Floating action buttons */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <button
                    onClick={() => setFavorited(!favorited)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg ${
                      favorited
                        ? "bg-red-500/80 text-white"
                        : "bg-black/30 hover:bg-black/50 text-white"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${favorited ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg ${
                      bookmarked
                        ? "bg-blue-500/80 text-white"
                        : "bg-black/30 hover:bg-black/50 text-white"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button className="p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-12 text-white">
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                  {/* Enhanced poster */}
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/api/placeholder/300/450"
                        }
                        alt={movie.title}
                        className="w-48 h-72 object-cover rounded-2xl shadow-2xl mx-auto lg:mx-0 transition-all duration-500 group-hover:scale-105 border border-white/10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    {/* Enhanced title section */}
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight animate-slide-up">
                        {movie.title}
                      </h1>

                      {movie.tagline && (
                        <p className="text-xl text-gray-300 italic font-light animate-slide-up delay-100">
                          "{movie.tagline}"
                        </p>
                      )}
                    </div>

                    {/* Enhanced rating and status */}
                    <div className="flex flex-wrap items-center gap-4 animate-slide-up delay-200">
                      <div className="flex items-center bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-200">
                        <Star className="w-5 h-5 mr-2 fill-current" />
                        <span className="text-lg">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-sm ml-1 opacity-80">
                          ({movie.vote_count?.toLocaleString()})
                        </span>
                      </div>

                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
                        {movie.status}
                      </span>

                      {movie.vote_average > 7.5 && (
                        <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full font-medium shadow-lg">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Highly Rated
                        </div>
                      )}
                    </div>

                    {/* Enhanced genres */}
                    <div className="flex flex-wrap gap-3 animate-slide-up delay-300">
                      {movie.genres?.map((genre, index) => (
                        <span
                          key={genre.id}
                          className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{ animationDelay: `${300 + index * 100}ms` }}
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>

                    {/* Enhanced movie details grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up delay-400">
                      {movie.release_date && (
                        <StatCard
                          icon={Calendar}
                          label="Release Date"
                          value={new Date(
                            movie.release_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          color="blue"
                        />
                      )}

                      {movie.runtime && (
                        <StatCard
                          icon={Clock}
                          label="Runtime"
                          value={formatRuntime(movie.runtime)}
                          color="green"
                        />
                      )}

                      {movie.origin_country?.length > 0 && (
                        <StatCard
                          icon={Globe}
                          label="Country"
                          value={movie.origin_country[0]}
                          color="purple"
                        />
                      )}

                      {movie.original_language && (
                        <StatCard
                          icon={Film}
                          label="Language"
                          value={movie.original_language.toUpperCase()}
                          color="amber"
                        />
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <ActionButton icon={Play} variant="primary">
                        Watch Trailer
                      </ActionButton>
                      {movie.homepage && (
                        <ActionButton icon={Globe} variant="secondary">
                          Official Site
                        </ActionButton>
                      )}
                      {movie.imdb_id && (
                        <ActionButton icon={Award} variant="accent">
                          IMDb
                        </ActionButton>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced overview */}
                {movie.overview && (
                  <div className="mb-12 animate-fade-in-up delay-500">
                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Synopsis
                    </h2>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                      <p className="text-gray-300 leading-relaxed text-lg font-light">
                        {movie.overview}
                      </p>
                    </div>
                  </div>
                )}

                {/* Enhanced production details */}
                <div className="grid lg:grid-cols-2 gap-8 animate-fade-in-up delay-600">
                  {/* Financial info */}
                  {(movie.budget > 0 || movie.revenue > 0) && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Box Office
                      </h3>
                      <div className="space-y-4">
                        {movie.budget > 0 && (
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center">
                              <DollarSign className="w-5 h-5 mr-3 text-green-400" />
                              <span className="font-medium">Budget</span>
                            </div>
                            <span className="font-bold text-green-400">
                              {formatCurrency(movie.budget)}
                            </span>
                          </div>
                        )}

                        {movie.revenue > 0 && (
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <div className="flex items-center">
                              <Award className="w-5 h-5 mr-3 text-amber-400" />
                              <span className="font-medium">Revenue</span>
                            </div>
                            <span className="font-bold text-amber-400">
                              {formatCurrency(movie.revenue)}
                            </span>
                          </div>
                        )}

                        {movie.budget > 0 && movie.revenue > 0 && (
                          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                            <div className="flex items-center">
                              <TrendingUp className="w-5 h-5 mr-3 text-purple-400" />
                              <span className="font-medium">Profit</span>
                            </div>
                            <span className="font-bold text-purple-400">
                              {formatCurrency(movie.revenue - movie.budget)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Production companies */}
                  {movie.production_companies?.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Production
                      </h3>
                      <div className="space-y-3">
                        {movie.production_companies
                          .slice(0, 5)
                          .map((company) => (
                            <div
                              key={company.id}
                              className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200"
                            >
                              <Users className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                              <span className="font-medium">
                                {company.name}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collection info */}
                {movie.belongs_to_collection && (
                  <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Part of Collection
                    </h3>
                    <div className="flex items-center space-x-4">
                      {movie.belongs_to_collection.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`}
                          alt={movie.belongs_to_collection.name}
                          className="w-16 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-xl text-white">
                          {movie.belongs_to_collection.name}
                        </h4>
                        <p className="text-gray-400 mt-1">Movie Collection</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-white">
              <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
                <Film className="w-20 h-20 text-gray-400 mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold mb-3">No movie selected</h3>
                <p className="text-gray-400">
                  Please select a movie to view its details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
