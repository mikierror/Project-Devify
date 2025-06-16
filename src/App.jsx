import React, { useEffect, useState, useRef } from "react";
import { sections } from "./Components/Section";
import { ScrollIndicator } from "./Components/ScrollIndicator";
import { ThemeToggle } from "./Components/ThemeToggle";
import { StickySection } from "./Components/StickySection";
import { BackToTopButton } from "./Components/BactoTopButton";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let newActiveIndex = 0;

      sectionRefs.current.forEach((ref, idx) => {
        if (ref && ref.offsetTop <= scrollPosition + 10) {
          newActiveIndex = idx;
        }
      });

      setActiveIndex(newActiveIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative font-sans bg-white dark:bg-gray-900 text-white h-screen">
      <ScrollIndicator />
      <ThemeToggle />

      {sections.map((section, index) => (
        <StickySection
          key={section.id}
          title={section.title}
          content={section.content}
          index={index}
          activeIndex={activeIndex}
          isLast={index === sections.length - 1}
          innerRef={(el) => (sectionRefs.current[index] = el)}
        />
      ))}

      <BackToTopButton />
    </div>
  );
}

export default App;
