
import { Loader, Menu, X } from "lucide-react";
import "./App.css";
import Navbar from "./Component/Navbar";
import SearchComponent from "./Component/Search";
import { useAppContext } from "./context/AppContext";
import useMovieData from "./hooks/useMovieData";
import MovieGrid from "./Component/MovieGrid";

function App() {
  const { movies: data, loading } = useMovieData();
  const {
    screenSize: { isMobile, isTablet },
  } = useAppContext();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Main Content */}
        <main className="pt-24 pb-16 bg-stone-50">
          <div className="container m-auto px-4">
            <div className="flex flex-col items-center">
              <div className={`text-center mb-2`}>
                <h1 className="font-black mb-4 relative">
                  <span
                    className="text-3xl md:text-6xl bg-gradient-to-r from-gray-300 via-gray-600 to-gray-900
 bg-clip-text text-transparent drop-shadow-2xl"
                  >
                    Check Our Latest Collections
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-xl -z-10 transform scale-110"></div>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl -z-20 transform scale-105"></div>
                </h1>

                <div>
                  {isMobile || isTablet ? (
                    <SearchComponent />
                  ) : (
                    <p className="md:block text-lg text-gray-600 max-w-2xl mx-auto tracking-widest">
                      Explore our curated collection of the latest and most
                      popular films
                    </p>
                  )}
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader size={32} className="animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600 text-lg">Loading movies...</span>
                </div>
              ) : data?.length ? (
                <MovieGrid />
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No movies found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;