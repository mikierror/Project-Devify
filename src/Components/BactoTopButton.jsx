import { useEffect, useState } from "react";

export function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return visible ? (
        <button
            className="fixed bottom-5 right-5 bg-black text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-700 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            ↑ Top
        </button>
    ) : null;
}

