import { useCallback, useEffect, useRef } from "react";
import useMovieData from "../hooks/useMovieData";
import Cards from "./Cards";
import { Loader } from "lucide-react";

const MovieGrid = function MovieGrid({ data: propData }) {
  const { movies: hookData, loadMore, loadingMore, hasNextPage } = useMovieData();
  const observerRef = useRef();
  const loadingRef = useRef();
  
  // Use prop data if provided (for search results), otherwise use hook data
  const data = propData || hookData;
  const shouldUseInfiniteScroll = !propData; // Only use infinite scroll for default movie list

  const lastMovieElementRef = useCallback(
    (node) => {
      if (!shouldUseInfiniteScroll) return;
      if (loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadMore();
        }
      });
      
      if (node) observerRef.current.observe(node);
    },
    [loadingMore, hasNextPage, loadMore, shouldUseInfiniteScroll]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-4 p-6 bg-gradient-to-r from-[#E2E2E2] to-[#C9D6FF] rounded-2xl animate-fadeIn animation-delay-500">
        {data?.map((movie, index) => {
          const isLastMovie = shouldUseInfiniteScroll && index === data.length - 1;
          return (
            <div
              key={movie.id}
              ref={isLastMovie ? lastMovieElementRef : null}
            >
              <Cards movie={movie} />
            </div>
          );
        })}
      </div>
      
      {/* Loading indicator for infinite scroll */}
      {shouldUseInfiniteScroll && loadingMore && (
        <div className="flex justify-center items-center mt-6" ref={loadingRef}>
          <Loader size={24} className="animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading more movies...</span>
        </div>
      )}
      
      {/* End of results indicator */}
      {shouldUseInfiniteScroll && !hasNextPage && data.length > 0 && (
        <div className="text-center mt-6 text-gray-500">
          <p>You've reached the end of the movie collection!</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;