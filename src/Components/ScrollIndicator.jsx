import { useEffect, useState } from "react";

export function ScrollIndicator() {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / windowHeight) * 100;
            setScrollWidth(scrolled);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollWidth}%` }} />
    );
}