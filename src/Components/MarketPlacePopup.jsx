import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MarketplacePopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl px-7 py-8 text-center shadow-2xl"
          >
            <h2 className="text-white font-display font-bold text-2xl mb-3">
              Ready to get VISOR?
            </h2>

            <p className="text-gray-400 font-body text-sm leading-6">
              To order your VISOR, visit popular marketplaces like{" "}
              <span className="text-white">Amazon</span> or{" "}
              <span className="text-white">Flipkart</span>.
            </p>

            <button
              onClick={onClose}
              className="mt-7 bg-[#00F5FF] text-[#111] px-7 py-3 rounded-full font-body font-semibold text-sm hover:bg-white transition-colors"
            >
              I Will
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MarketplacePopup;
