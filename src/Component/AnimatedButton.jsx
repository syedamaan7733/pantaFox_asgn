import { useEffect, useRef, useState } from "react";

const AnimatedGradientButtons = ({item = "events"}) => {
  const [clickCount, setClickCount] = useState(0);

  const [specialEffects, setSpecialEffects] = useState({
    mainBounce: false,
    secondaryGradient: false,
    neonPulse: false,
    spinning: {},
  });

  const createRipple = (event, buttonRef) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.className =
      "absolute rounded-full bg-white/60 transform scale-0 animate-ping pointer-events-none";
    ripple.style.animation = "ripple 0.6s linear";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const handleMainButtonClick = (e) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    addToLog("Main button clicked!");

    if (newCount % 5 === 0) {
      setSpecialEffects((prev) => ({ ...prev, mainBounce: true }));
      setTimeout(
        () => setSpecialEffects((prev) => ({ ...prev, mainBounce: false })),
        1000
      );
      addToLog("🎉 5 clicks milestone reached!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const focusedElement = document.activeElement;
        if (focusedElement.tagName === "BUTTON") {
          focusedElement.click();
          addToLog(`Keyboard activated: ${focusedElement.textContent}`);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      addToLog("Welcome! Try hovering and clicking the buttons");
    }, 500);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const mainButtonRef = useRef(null);
  const secondaryButtonRef = useRef(null);
  const neonButtonRef = useRef(null);

  return (
    <div className=" items-center justify-center">
      <button
        ref={mainButtonRef}
        onClick={(e) => {
          handleMainButtonClick(e);
          createRipple(e, mainButtonRef);
        }}
        onDoubleClick={() => handleDoubleClick("main")}
        onMouseEnter={() => handleHover("main")}
        className={`
            relative overflow-hidden px-6 py-2 text-white font-semibold text-sm rounded-full 
            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient 
            hover:scale-105 hover:shadow-2xl transform transition-all duration-300 ease-out 
            animate-pulse-glow active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300
            ${specialEffects.mainBounce ? "animate-bounce" : ""}
            ${specialEffects.spinning.main ? "animate-spin" : ""}
          `}
      >
        {item}
      </button>
    </div>
  );
};

export default AnimatedGradientButtons;
