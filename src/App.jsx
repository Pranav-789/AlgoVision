import React, { useEffect } from 'react'
import { useState } from "react";
import CodeEditor from './CodeEditor';
import Carousel from './Carousel';

const App = () => {
  const [isTranslated, setIsTranslated] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [hide, setHide] = useState(false);

  const handleToggle = ()=>{
    setIsTranslated(!isTranslated);
    if(theme == 'dark'){
      setTheme('light');
    }
    else{
      setTheme('dark');
    }
  }

  console.log("rerendered App!");

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen relative"
      data-theme={theme}
    >
      <div
        className="fixed bottom-2 right-2 w-[60px] h-[30px] rounded-2xl flex items-center p-1 z-100"
        style={{
          backgroundColor: isTranslated ? "#1e3a8a" : "#fcd34d",
          borderRadius: "20px",
        }}
      >
        <div
          className="h-[25px] w-[25px] rounded-full bg-white flex justify-center items-center text-black"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          style={{
            transform: isTranslated ? "translate(28px)" : "translate(0px)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {isTranslated ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-regular fa-sun"></i>
          )}
        </div>
      </div>
      <section className="w-full min-h-screen flex justify-center items-center relative">
        <div
          className="h-[30px] w-[30px] rounded-full flex justify-center items-center bottom-3 right-[80px] z-110 text-black fixed"
          style={{
            backgroundColor: isTranslated ? "white" : "black",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setHide((prev) => !prev);
          }}
        >
          <i className="fa-solid fa-book"></i>
          <div
            className={`${
              hide ? "opacity-100 scale-100" : "opacity-0 scale-0"
            } ${
              theme === "dark" ? "bg-white text-black" : "bg-black text-white"
            } card bg-base-100 w-96 shadow-sm fixed right-[80px] bottom-12 transition ease-in-out duration-300`}
          >
            <div className="card-body">
              <h2 className="card-title">🧠 React Memoization & useCallback</h2>
              <p>
                docLink:{" "}
                <a
                  href="https://docs.google.com/document/d/1EEl_ZcK2M-J_aBJbDPRXGkKywWa3JY6lHZg4PbVnSpA/edit?usp=sharing"
                  className="text-sky-500 hover:text-sky-800"
                >
                  click here
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="relative z-1 flex flex-col justify-center items-center">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[150px] font-semibold">
            AlgoVision
          </h1>
          <p className="mt-9 md:text-3xl sm:text-2xl text-xl">
            From Code To Clarity — Instantly.
          </p>

          <div className="mt-8 flex gap-4 text-xl">
            <button className="btn btn-outline btn-info rounded-lg border-2">
              Get Started
            </button>
            <button className="btn btn-outline btn-warning rounded-lg border-2">
              Explore
            </button>
          </div>
        </div>
      </section>
      <section className="w-[90%]">
        <CodeEditor theme={theme} />
      </section>
      <section>
        <Carousel />
      </section>
    </div>
  );
}

export default App
