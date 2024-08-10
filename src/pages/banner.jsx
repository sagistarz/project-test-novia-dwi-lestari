import { useState, useEffect } from "react";
import banner from "../assets/banner.jpg";

export default function Banner() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  };

  return (
    <div className="banner relative mt-[70px] overflow-hidden">
      <img
        src={banner}
        alt="banner"
        className="w-full h-[350px] object-cover sm:h-[300px] md:h-[350px]"
        style={parallaxStyle}
      />
      <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full text-white bg-black bg-opacity-30">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Ideas</h1>
        <h1 className="text-base sm:text-lg md:text-xl">Where all our great things begin</h1>
      </div>
      <div
        className="absolute bottom-[-1px] left-0 w-full h-[150px] bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      ></div>
    </div>
  );
}
