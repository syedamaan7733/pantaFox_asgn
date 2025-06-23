import { Menu, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import useScrollEffect from "../hooks/useScrolled";
import SearchComponent from "./Search";
import AnimatedGradientButtons from "./AnimatedButton";

function Navbar() {
  const isScrolled = useScrollEffect();

  const {
    screenSize: { isMobile, isDesktop },
    toggleMenu: { toggleMenu, isMenuOpen },
  } = useAppContext();

  const event = "DragonX";

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white text-gray-800 shadow-lg py-2"
          : "bg-black/30 backdrop-blur-lg text-white py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="freckle-face-regular text-3xl font-bold transform transition hover:scale-105 duration-300">
            MovieFlix
          </div>

          {isDesktop && (
            <div className="flex-1 max-w-2xl mx-8 px-4">
              <SearchComponent />
            </div>
          )}

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {["Home", "Favourite", "Bookings", event].map((item) => (
                <li
                  className="flex flex-col justify-center items-center"
                  key={item}
                >
                  {item === event ? (
                    <AnimatedGradientButtons item={item} />
                  ) : (
                    <a
                      href="#"
                      className="relative font-medium hover:text-indigo-400 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full"
                    >
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button className="md:hidden text-2xl" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-fadeIn">
            <ul className="flex flex-col space-y-4">
              {["Home", "Favourite", "Bookings", "DragonZ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block py-2 hover:text-indigo-400 transition-colors tracking-wider duration-300"
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
  );
}

export default Navbar;
