import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    setPrevScrollPos(window.pageYOffset);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  const getActiveClass = (path) => {
    return window.location.pathname === path ? "font-bold border-b-2 border-white pb-2 hover:text-black-300" : "";
  };

  return (
    <div className={`fixed top-0 w-full h-[70px] flex items-center justify-between px-32 transition-transform duration-300 ${visible ? "translate-y-0 bg-opacity-90" : "-translate-y-full"} bg-[#FF6600] z-20`}>
     <a href="/"><img  src={logo} alt="Logo" className="h-[40px]" /></a> 
      <div className="lg:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <ul
        className={`lg:flex items-center gap-6 text-white lg:space-y-0 ${
          menuOpen ? "block" : "hidden lg:block"
        } absolute lg:static top-full left-0 w-full lg:w-auto bg-[#FF6600] lg:bg-transparent p-4 lg:p-0 transition-all duration-300 ease-in-out`}
      >
        <li>
          <a href="/work" className={getActiveClass("/work")} onClick={() => setMenuOpen(false)}>Work</a></li>
        <li><a href="/about" className={getActiveClass("/about")} onClick={() => setMenuOpen(false)}>About</a></li>
        <li><a href="/services" className={getActiveClass("/services")} onClick={() => setMenuOpen(false)}>Services</a></li>
        <li><a href="/ideas" className={getActiveClass("/ideas")} onClick={() => setMenuOpen(false)}>Ideas</a></li>
        <li><a href="/careers" className={getActiveClass("/careers")} onClick={() => setMenuOpen(false)}>Careers</a></li>
        <li><a href="/contact" className={getActiveClass("/contact")} onClick={() => setMenuOpen(false)}>Contact</a></li>
      </ul>
    </div>
  );
}
