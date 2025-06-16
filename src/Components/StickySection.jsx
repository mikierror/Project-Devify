import { useState } from "react";

export function StickySection({
  title,
  content,
  index,
  activeIndex,
  isLast,
  innerRef, // ✅ receive ref from App
}) {
  const isActive = index <= activeIndex;
  const headerHeight = 70;
  const topOffset = index * headerHeight;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      ref={innerRef} // ✅ set the ref so scroll detection works
      className={`transition-all duration-500  ${
        isOpen ? "min-h-screen" : "min-h-[100px]"
      } py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center ${
        isLast ? `pb-[${headerHeight * (index + 1)}px]` : ""
      } `}
    >
      <div
        className={`w-full z-20 shadow-md transition-all duration-300 ${
          isActive ? "fixed" : "relative"
        }`}
        style={{
          top: isActive ? `${topOffset}px` : "unset",
          backgroundColor: "inherit",
          padding: "1rem",
        }}
      >
        <div className="flex justify-between items-center gap-4 ">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold p-2 py-3 h-14 rounded-md bg-gray-800 text-white w-full">
            {title}
          </h2>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-sm px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isOpen ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-20 text-base md:text-xl lg:text-2xl font-medium  dark:text-gray-300  h-fit text-black text-start  sm:p-8 lg:p-10 max-w-7xl bg-gray-200 dark:bg-gray-800 rounded-m ">
          <p className="leading-loose">
            {content}
          </p>
        </div>
      )}
    </section>
  );
}
