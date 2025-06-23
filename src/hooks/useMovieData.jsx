import { useCallback, useEffect, useState } from "react";
import API_CONFIG from "../utils/API_CONFIG";

const useMovieData = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [modalMovie, setModalMovie] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  const fetchMovies = useCallback(async (page = 1, reset = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${API_CONFIG.BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (reset || page === 1) {
        setMovies(data.results || []);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...(data.results || [])]);
      }

      setCurrentPage(page);
      setHasNextPage(page < data.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasNextPage) {
      fetchMovies(currentPage + 1, false);
    }
  }, [currentPage, loadingMore, hasNextPage, fetchMovies]);

  const updateSearchData = (movies) => {
    setMovies(movies);
    setCurrentPage(1);
    setHasNextPage(movies.length > 0);
  };

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
    setHasNextPage(true);
    fetchMovies(1, true);
  }, [fetchMovies]);

  const getModalMovie = async (id) => {
    try {
      setModalLoading(true);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${API_CONFIG.BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      setModalMovie(data);
    } catch (error) {
      console.log("🚀 ~ Error Geting Details ~ error:", error);
      setModalError(error.message);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);

  return {
    movies,
    loading,
    loadingMore,
    error,
    hasNextPage,
    currentPage,
    modalMovie,
    modalError,
    modalLoading,
    setModalError,
    setModalLoading,
    getModalMovie,
    refetch: resetToFirstPage,
    loadMore,
    updateMovie: updateSearchData,
  };
};

export default useMovieData;
