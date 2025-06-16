import { useEffect, useRef } from "react";
import { useTheme } from "../Context/ThemeContext";

export function ThemeToggle() {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - box.getBoundingClientRect().left;
      offsetY = e.clientY - box.getBoundingClientRect().top;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    box.addEventListener("mousedown", handleMouseDown);

    return () => {
      box.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
  const { theme, toggleTheme } = useTheme();

  return (
 <button
  ref={boxRef}
  className="fixed z-50 p-2 h-fit w-fit rounded-full bg-gray-200 dark:bg-gray-700 shadow-md group"
  style={{ top: "75px", right: "30px" }}
  onClick={toggleTheme}
>
  {theme === 'dark' ? "🌞" : "🌙"}

  <div className="absolute -top-6 right-0 bg-black text-white text-xs  px-6 py-1  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    Drag me
  </div>
</button>

  );
}
