import React, { useEffect, useRef, useState } from "react";

const images = [
  "/image1.webp",
  "/image2.webp",
  "/image3.jpg",
  "/image4.jpeg",
  "/image5.jpg",
  "/image6.jpg",
  "/image7.png",
  "/image8.jpg",
  "/image9.jpeg",
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
    <div>
      <div ref={sectionRef} className="py-16 bg-gray-900">
      {/* Title Section */}
      <div className="text-center mb-8 px-4 sm:px-8 lg:px-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white text-left">
          Plan your college experience
        </h1>
      </div>

      {/* Image Slider */}
      <div className="py-10">
        <div className="overflow-hidden w-full relative">
          <div
            className="flex space-x-4 sm:space-x-6 transition-transform ease-linear"
            style={{ transform: `translateX(${scrollPercent * -100}%)` }}
          >
            {[...images, ...images].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index}`}
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-lg shadow-md object-cover z-10"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="py-14 px-4 sm:px-8 lg:px-16">
        <p className="text-base sm:text-lg font-light text-white">
          Use our interactive drag-and-drop tool to customize your dorm layout in
          real time. Arrange furniture, adjust room dimensions, and explore different
          setups with ease. Browse a searchable database of room designs and reviews
          from other students, and save your own layouts for future reference. Sign in to
          collaborate and share ideas with the UCLA community!
        </p>
      </div>
      </div>

      {/* How-to Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-15">
        {/* Image on the left */}
        <div className="flex items-center justify-center lg:justify-end z-10 drop-shadow-2xl mb-8 lg:mb-0 lg:px-25">
          <img
            src="/image10.png"
            alt="De Neve Plaza Layout"
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100 rounded-lg border border-black shadow-5xl"
          />
        </div>

        {/* Text Content on the right */}
        <div className="text-left px-4 sm:px-8 lg:px-30 max-w-full lg:max-w-150">
          <h1 className="text-3xl sm:text-4xl font-semibold text-black">
            How to make your room
          </h1>
          <p className="mt-4 sm:text-lg font-light text-black text-base">
            Just choose your floor, building, and room to start! You can drag and drop items from our
            library into any room and change them out as needed. You can experiment with different layouts,
            furnishings, and finishes and get a preview of your finished room.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanExpSection;