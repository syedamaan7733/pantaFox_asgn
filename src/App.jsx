import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Menu, X } from "lucide-react";
import Cards from "./Component/Cards";

function App() {
  const [data, setData] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [isMobile, setisMobile] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGRhMDg2YzEzNGJkMTkwZDgzOTNhNDZiZjcxY2Q1YyIsIm5iZiI6MTc0NTUwNzIyMy4yMjQsInN1YiI6IjY4MGE1Mzk3OGJjZWE2NmE4NmFhYTMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Crl5V1F2tpCkLsdBezFqTIsSStpx5Sn9QRK2ErnOQE",
            },
          }
        );
        setData(res.data.results);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  // console.log(data);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header
          className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
            scrolling
              ? "bg-white text-gray-800 shadow-lg py-2"
              : "bg-black/30 backdrop-blur-lg text-white py-6"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* company name */}
              <div className="freckle-face-regular  text-3xl font-bold transform transition hover:scale-105 duration-300">
                MovieFlix
              </div>
              {/* for desktop */}
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  {["Home", "Favourite", "Bookings", "DragonZ"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="relative font-medium hover:text-indigo-400 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-2xl "
                onClick={() => setisMobile(!isMobile)}
              >
                {isMobile ? <X /> : <Menu />}
              </button>
            </div>

            {/* Mobile navigation */}
            {isMobile && (
              <nav className="md:hidden mt-4 pb-4 animate-fadeIn">
                <ul className="flex flex-col space-y-4">
                  {["Home", "Favourite", "Bookings", "DragonZ"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block py-2 hover:text-indigo-400 transition-colors duration-300"
                        onClick={() => setisMobile(false)}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className=" pt-24 pb-16 bg-stone-50">
          <div className="container  m-auto px-4">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-6 animate-fadeSlideUp">
                Check Our Latest Collections
              </h1>
             
              <div className=" w-full grid grid-cols-2 md:grid-cols-4 place-items-center gap-4 p-6 bg-gradient-to-r bg-gradient-to-r from-[#E2E2E2] to-[#C9D6FF] rounded-2xl animate-fadeIn animation-delay-500">
                {data?.map((movie) => {
                  return <Cards key={movie.id} movie={movie} />;
                })}
              </div>
            </div>
          </div>
        </main>

       
      </div>
    </>
  );
}

export default App;
