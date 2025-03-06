import React, { useEffect, useRef, useState } from "react";

const images = [
  "/ucla-logo.jpg",
  "/Olympic+Hall+room.jpg",
  "/campus-seal.jpg",
  "/ucla-logo.jpg",
  "/Olympic+Hall+room.jpg",
  "/campus-seal.jpg",
  "/ucla-logo.jpg",
  "/Olympic+Hall+room.jpg",
  "/campus-seal.jpg",
];

const PlanExpSection = () => {
  const sectionRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const sectionHeight = sectionRef.current.offsetHeight;

        // Calculate scroll progress (0 at start, 1 at fully visible)
        let progress = 1 - Math.max(0, Math.min(1, sectionTop / (windowHeight - sectionHeight / 2)));

        setScrollPercent(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="py-16">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-black text-left px-45">
          Plan your college experience
        </h1>
      </div>

      {/* Image Slider */}
      <div className="bg-gray-900 h-80 py-10">
      <div className="overflow-hidden w-full relative">
        <div
          className="flex space-x-6 transition-transform ease-linear"
          style={{ transform: `translateX(${scrollPercent * -100}%)` }}
        >
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-64 h-64 rounded-lg shadow-md object-cover z-10"
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PlanExpSection;
