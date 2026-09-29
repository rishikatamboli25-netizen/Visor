import { motion } from "framer-motion";
import { useState } from "react";
import MarketplacePopup from "./MarketPlacePopup";

const Navbar = () => {
  const [selected, setSelected] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* DESKTOP NAV */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-[100] px-8 hidden md:block"
      >
        <div className="max-w-[70vw] max-h-[12vh] bg-white/50 border border-gray-200 backdrop-blur-lg rounded-2xl mx-auto my-3 h-[10vh] grid grid-cols-3 px-6">

          {/* Logo Left */}
          <div className="self-center font-display">
            <span className="font-extrabold text-[clamp(1rem,1.4vw,2rem)] tracking-[-0.03em]">
              VIS<span className="text-[#00F5FF]">OR</span>
            </span>
          </div>

          {/* Center Links */}
          <ul className="flex self-center justify-center gap-12 text-[clamp(0.8rem,0.9vw,1.6rem)] text-gray-600 font-medium font-body cursor-pointer">
            <button
              onClick={() => scrollTo("Features")}
              className="hover:text-black"
            >
              Features
            </button>

            <button
              onClick={() => scrollTo("HowItWorks")}
              className="hover:text-black"
            >
              How It Works
            </button>

            <button
              onClick={() => scrollTo("Pricing")}
              className="hover:text-black"
            >
              Pricing
            </button>
          </ul>

          {/* Right Button */}
          <div className="self-center justify-self-end">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-black text-white px-6 py-2 font-semibold rounded-xl text-[clamp(0.8rem,0.8vw,1.6rem)] hover:scale-110 transition-all duration-50 ease-in"
            >
              Pre-Order
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE NAV */}
      <div className="fixed top-0 z-50 bg-[#FCFCFCEE] flex flex-col justify-center items-center w-full justify-self-center pt-4 backdrop-blur-md md:hidden">

        <div className="self-center font-display">
          <span className="font-extrabold text-[clamp(2rem,2vw,4rem)] tracking-[-0.03em]">
            VIS<span className="text-[#00F5FF]">OR</span>
          </span>
        </div>

        <div className="sticky top-0 z-20 flex gap-3 justify-center font-body text-[0.8rem] font-thin text-gray-800 py-2 pb-4">
          <button
            className={`border rounded-sm px-3 ${
              selected === 0 ? "bg-sky-200" : "bg-transparent"
            }`}
            onClick={() => {
              setSelected(0);
              scrollTo("Home");
            }}
          >
            Home
          </button>

          <button
            className={`border rounded-sm px-3 ${
              selected === 1 ? "bg-sky-200" : "bg-transparent"
            }`}
            onClick={() => {
              setSelected(1);
              scrollTo("Features");
            }}
          >
            Features
          </button>

          <button
            className={`border rounded-sm px-3 ${
              selected === 2 ? "bg-sky-200" : "bg-transparent"
            }`}
            onClick={() => {
              setSelected(2);
              scrollTo("HowItWorks");
            }}
          >
            How It Works
          </button>

          <button
            className={`border rounded-sm px-3 ${
              selected === 3 ? "bg-sky-200" : "bg-transparent"
            }`}
            onClick={() => {
              setSelected(3);
              scrollTo("Pricing");
            }}
          >
            Pricing
          </button>
        </div>
      </div>

      {/* MARKETPLACE POPUP */}
      <MarketplacePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default Navbar;