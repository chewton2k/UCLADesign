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
    <div ref={sectionRef} className="py-16 bg-gray-900 h-150">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-white text-left px-45">
          Plan your college experience
        </h1>
      </div>

      {/* Image Slider */}
      <div className="py-10">
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
      <div> 
        <p className="py-14 font-mediumlight text-white px-45"> 
        Use our interactive drag-and-drop tool to customize your dorm layout in 
        real time. Arrange furniture, adjust room dimensions, and explore different 
        setups with ease. Browse a searchable database of room designs and reviews 
        from other students, and save your own layouts for future reference. Sign in to 
        collaborate and share ideas with the UCLA community!
        </p>
      </div>
      <div className="relative flex items-center justify-between px-45 py-15">
        {/* Image on the left */}
      <div className="flex items-center justify-end z-10 drop-shadow-2xl px-25">
      <img
          src="/image10.png"
          alt="De Neve Plaza Layout"
          className="size-100 rounded-lg border border-black shadow-5xl"
        />
      </div>
      {/* Text Content on the right */}
      <div className="text-left px-30 max-w-150">
        <h1 className="text-4xl md:text-4xl font-semibold text-black">
          How to make your room
        </h1>
        <p className="mt-4 text-lg md:text-l font-mediumlight text-black">
          Just choose your floor, building and room to start! You can drag and drop items from our 
          library into any room and change them out as needed. You can experiment with different layouts, 
          furnishings, and finishes and get a preview of your finished room.
        </p>
      
        </div>
    </div>
      </div>
    </div>
  );
};

export default PlanExpSection;


