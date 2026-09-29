import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplacePopup from "./Components/MarketPlacePopup";

import glasse from "./assets/image/glasse.png";
import glasse1 from "./assets/image/glasse1.png";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Feature data
const FEATURES = [
  {
    icon: "◈",
    title: "Neural Vision AI",
    desc: "On-device AI processes 120 frames per second, recognizing faces, text, and objects in real-time — no cloud latency.",
    accent: "#00F5FF",
  },
  {
    icon: "◉",
    title: "All-Day Battery",
    desc: "48 hours of mixed use on a single charge. Micro-cell technology packs power into a frame you'll forget you're wearing.",
    accent: "#B4FF39",
  },
  {
    icon: "◐",
    title: "Feather Architecture",
    desc: "At 24g, VISOR is lighter than your sunglasses. Titanium-composite temples flex without fatigue for any face shape.",
    accent: "#FF6BFF",
  },
];

// How it works data
const STEPS = [
  {
    num: "01",
    title: "Wear",
    desc: "Slide on like any glasses. Auto-calibration takes 3 seconds.",
  },
  {
    num: "02",
    title: "See",
    desc: "Your world enriched. Navigation, notifications, live translation — all in your sightline.",
  },
  {
    num: "03",
    title: "Live",
    desc: "Hands-free. Screen-free. Distraction-free. Just presence, enhanced.",
  },
];

// Testimonial data
const TESTIMONIALS = [
  {
    name: "Aria Chen",
    role: "Product Designer @ Linear",
    text: "VISOR replaced my second monitor. I design with overlays floating in real space now. It's genuinely surreal.",
  },
  {
    name: "Marcus Webb",
    role: "Surgeon, UCSF",
    text: "Patient vitals in my peripheral vision without looking away. This changes how I operate — literally.",
  },
  {
    name: "Soren Albrecht",
    role: "Ultra-marathon runner",
    text: "Pace, elevation, heart rate — and the trail. Nothing between me and the mountain.",
  },
];

// Stats data
const STATS = [
  { val: 12, unit: "ms", label: "Latency" },
  { val: 8, unit: "K", label: "Resolution" },
  { val: 24, unit: "g", label: "Weight" },
  { val: 48, unit: "h", label: "Battery" },
];

// Pricing data
const PLANS = [
  {
    name: "VISOR One",
    price: "499",
    features: [
      "Neural Vision AI",
      "48h Battery",
      "2yr Warranty",
      "Standard Lens",
    ],
    accent: "#00F5FF",
    popular: false,
  },
  {
    name: "VISOR Pro",
    price: "799",
    features: [
      "Neural Vision AI+",
      "72h Battery",
      "Lifetime Warranty",
      "Adaptive Photochromic Lens",
      "Priority Support",
    ],
    accent: "#B4FF39",
    popular: true,
  },
];

// Animated stat counter
function States({ val, unit, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(0));

  useEffect(() => {
    if (isInView) {
      animate(count, val, {
        type: "spring",
        stiffness: 70,
        damping: 40,
      });
    }
  }, [isInView, val, count]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div
        className={`font-display font-extrabold text-[clamp(2rem,6vw,4rem)] ${
          index % 2 === 0 ? "text-skyBlue" : "text-green"
        }`}
      >
        <motion.span>{rounded}</motion.span>
        <span>{unit}</span>
      </div>

      <div className="text-[clamp(0.8rem,1vw,1.6rem)] text-[#888] font-body uppercase">
        {label}
      </div>
    </div>
  );
}

// 3D glasses model
function Model({ hovered, mouse }) {
  const { scene } = useGLTF("/model.glb");
  const modelRef = useRef(null);

  useFrame(() => {
    if (!hovered || !modelRef.current) return;

    modelRef.current.rotation.y = mouse.x * Math.PI;
    modelRef.current.rotation.x = mouse.y * Math.PI * 0.5;
  });

  return <primitive ref={modelRef} object={scene} scale={5} />;
}

function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Waitlist state
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse position for the 3D model
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  // Auto-change testimonials
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  // Waitlist submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) return;

    setJoined(true);
  };

  // Open marketplace popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Close marketplace popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />

      <main className="pt-36 md:mt-0">
        {/* HERO */}
        <section id="Home" className="md:scroll-mt-5 scroll-m-32">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-auto justify-self-center flex flex-col items-center"
          >
            <div className="text-[clamp(0.8rem,0.9vw,1.4rem)] w-fit rounded-2xl border border-[#00F5FF] px-5 text-[#00B8CC] bg-[rgba(0,245,255,0.08)] font-body flex items-center gap-2">
              <span className="text-[#00F5FF] text-[clamp(1.3rem,1.4vw,2rem)]">
                •
              </span>
              Now Shipping — 2026 Edition
            </div>

            <div className="md:w-[40vw] mt-12 md:leading-[1] leading-tight md:-tracking-[2px] -tracking-[1px] font-extrabold font-display flex flex-col items-center">
              <div className="text-center text-[clamp(1.6rem,6vw,2.6rem)]">
                See the world
              </div>

              <div className="bg-gradient-to-r from-[#00F5FF] to-[#B4FF39] bg-clip-text text-transparent text-[clamp(2.2rem,6vw,5rem)]">
                augmented.
              </div>
            </div>

            <div className="md:w-[26vw] w-[78vw] text-[clamp(0.8rem,1vw,2rem)] font-body text-center text-gray-600 font-thin pt-7">
              VISOR layers intelligence over reality — navigation, translation,
              recognition — in 24 grams of titanium you'll forget you're
              wearing.
            </div>

            {/* Hero CTAs */}
            <div className="flex md:flex-row flex-col md:gap-4 gap-5 text-[clamp(0.8rem,0.8vw,2rem)] font-semibold font-body mt-10">
              <button
                onClick={openPopup}
                className="text-white rounded-xl px-8 py-4 bg-black hover:scale-105 hover:drop-shadow-[0px_0px_12px_rgba(0,245,255,0.5)] transition-all duration-200 ease-in"
              >
                Pre-order – $399
              </button>

              <button className="rounded-xl px-8 py-4 border hover:scale-105 transition-all duration-50 ease-in">
                Watch demo →
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:mt-24 mt-12 justify-self-center"
          >
            <img className="md:h-32 h-20" src={glasse1} alt="" />
          </motion.div>
        </section>

        {/* STATS */}
        <section className="text-white w-full md:h-[29vh] h-[27vh] bg-black flex justify-center items-center mt-24">
          <div className="md:flex grid grid-cols-2 grid-rows-2 gap-x-20 w-[70vw] items-center justify-between h-full">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                viewport={{ once: true }}
              >
                <States
                  index={index}
                  val={stat.val}
                  unit={stat.unit}
                  label={stat.label}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="Features" className="scroll-mt-28">
          <div className="md:max-w-[70vw] w-[90vw] justify-self-center md:mt-36 mt-20 md:mb-32">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-[#00B8CE] font-body text-[clamp(0.8rem,0.8vw,1.6rem)] font-semibold tracking-widest pb-3">
                CAPABILITIES
              </div>

              <div className="whitespace-pre-line font-display text-[clamp(2rem,4vw,6rem)] font-extrabold md:-tracking-[2px] leading-tight">
                {`Build for how 
you
actually live.`}
              </div>
            </motion.div>

            {/* 3D Model + Features */}
            <div className="grid md:grid-cols-2 mt-20">
              {/* 3D Model */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={handleMouseMove}
              >
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={1} />
                  <directionalLight position={[2, 2, 2]} />
                  <Model hovered={hovered} mouse={mouse.current} />
                </Canvas>
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-7">
                  {FEATURES.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ y: -3, x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white rounded-xl h-32 p-5 pb-0"
                    >
                      <div className="h-full flex justify-center gap-4">
                        <div
                          className="w-8 text-[clamp(1rem,1.7vw,2rem)] h-[62%]"
                          style={{ color: feature.accent }}
                        >
                          {feature.icon}
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="font-display text-[clamp(1.1rem,1vw,2rem)] font-semibold">
                            {feature.title}
                          </div>

                          <p className="font-body text-[clamp(0.9rem,0.7vw,1.5rem)] font-thin text-gray-500">
                            {feature.desc}
                          </p>
                        </div>
                      </div>

                      <div
                        className="w-6 h-0.5 rounded"
                        style={{ backgroundColor: feature.accent }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="HowItWorks"
          className="bg-[#111] md:pb-20 mt-16 md:scroll-m-0 scroll-mt-20"
        >
          <div className="max-w-[90vw] justify-self-center md:pt-28 pt-16 scroll-mt-28">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="font-body text-[clamp(0.8rem,0.8vw,1.6rem)] font-semibold tracking-widest pb-3 text-green">
                EXPERIENCE
              </div>

              <div className="whitespace-pre-line font-display text-[clamp(2rem,4vw,6rem)] font-extrabold md:-tracking-[2px] leading-tight text-white pb-16">
                {`Three seconds to
another world.`}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 md:gap-24">
              {/* Steps */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {STEPS.map((step, index) => (
                  <div key={index} className="flex gap-4 mb-12">
                    <div className="border w-10 h-10 rounded-xl border-skyBlue flex justify-center items-center shrink-0 mt-5">
                      <div className="bg-skyBlue h-4 w-4 rounded-full" />
                    </div>

                    <div>
                      <div className="text-gray-500 text-[clamp(1rem,0.7vw,2rem)] font-display font-bold pb-1">
                        {step.num}
                      </div>

                      <div className="text-white font-display text-[clamp(1.5rem,1.5vw,3rem)] font-semibold md:pb-2">
                        {step.title}
                      </div>

                      <div className="text-[#888] font-body text-[clamp(1.2rem,0.8vw,2rem)] leading-relaxed font-thin">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Product Image */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="md:h-[60vh] hidden md:block"
                  src={glasse}
                  alt=""
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <motion.section
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:mt-32 mt-20 md:h-auto h-[36vh]"
        >
          <div className="justify-self-center text-center">
            <div className="uppercase text-[#00B8CE] font-body text-[clamp(0.8rem,0.8vw,1.6rem)] font-semibold tracking-widest pb-3">
              Perspectives
            </div>

            <div className="whitespace-pre-line font-display text-[clamp(2rem,4vw,6rem)] font-extrabold md:-tracking-[2px] tracking-tight leading-tight text-black md:pb-16 pb-9">
              {`Early adopters
speak.`}
            </div>
          </div>

          <div className="md:w-auto w-[90vw] justify-self-center">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="flex flex-col text-center items-center"
            >
              <p className="text-[clamp(1rem,2vw,1.2rem)] italic text-gray-700 leading-relaxed font-light mb-6 max-w-3xl">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>

              <div className="flex flex-col items-center">
                <div className="font-semibold text-sm sm:text-base">
                  {TESTIMONIALS[activeTestimonial].name}
                </div>

                <div className="text-gray-400 text-xs sm:text-sm">
                  {TESTIMONIALS[activeTestimonial].role}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {TESTIMONIALS.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => setActiveTestimonial(index)}
                animate={{
                  width: index === activeTestimonial ? 24 : 8,
                  background: index === activeTestimonial ? "#00F5FF" : "#ccc",
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded cursor-pointer"
              />
            ))}
          </div>
        </motion.section>

        {/* PRICING */}
        <section id="Pricing" className="scroll-mt-28">
          <div className="justify-self-center md:w-[70vw] md:mt-48 mt-28 md:h-[99vh] w-[90vw]">
            <div className="uppercase text-[#00B8CE] font-body text-[clamp(0.8rem,0.8vw,1.6rem)] font-semibold tracking-widest pb-3">
              pricing
            </div>

            <div className="font-display text-[clamp(2rem,4vw,6rem)] font-extrabold md:-tracking-[2px] tracking-tight leading-tight text-black">
              Choose your lens.
            </div>

            <div className="flex flex-col justify-center items-center">
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12 mt-4"
              >
                {PLANS.map((plan, index) => (
                  <div
                    key={index}
                    className={`h-fit md:w-[25vw] p-11 rounded-2xl ${
                      plan.popular
                        ? "bg-[#111] text-green border border-green"
                        : "bg-white border"
                    }`}
                  >
                    <h2 className="font-display text-[clamp(0.7rem,1vw,1.3rem)] tracking-[-0.03em] font-extrabold">
                      {plan.name}
                    </h2>

                    <div style={{ color: plan.accent }}>
                      <span className="text-[clamp(1rem,1.4vw,2rem)] font-extrabold font-display align-super leading-none">
                        $
                      </span>

                      <span className="text-[clamp(3rem,3vw,6rem)] font-extrabold font-display">
                        {plan.price}
                      </span>
                    </div>

                    <div
                      className={`w-[80%] h-[1px] justify-self-center ${
                        plan.popular ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    />

                    <div className="flex flex-col gap-4 mt-5 font-body">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex gap-3 ${
                            plan.popular ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <span
                            style={{
                              color: plan.accent,
                              fontWeight: 700,
                            }}
                          >
                            ✓
                          </span>

                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Existing pricing button opens marketplace popup */}
                    <button
                      onClick={openPopup}
                      className={`w-[90%] h-[5vh] mt-8 justify-self-center rounded-xl font-bold ${
                        plan.popular
                          ? "bg-green text-black"
                          : "bg-black text-white border"
                      }`}
                    >
                      {plan.popular ? "Order VISOR Pro" : "Order VISOR One"}
                    </button>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA / WAITLIST */}
        <section className="bg-[#111] text-center h-auto py-10 mt-11">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="font-display font-extrabold tracking-[-0.03em] leading-none">
              <div className="text-[#F8F8F5] text-[clamp(2rem,5vw,4rem)] md:pt-24 pt-14 pb-2">
                Ready to see
              </div>

              <div className="bg-gradient-to-r text-[clamp(2rem,5vw,4rem)] from-[#00F5FF] to-[#B4FF39] bg-clip-text bg-transparent text-transparent">
                differently?
              </div>
            </div>

            <div className="text-[#666] font-body md:py-9 py-7 text-[clamp(1rem,0.9vw,2rem)] font-thin">
              Join 12,000+ on the waitlist. Ships Q2 2025.
            </div>

            {/* Waitlist form / success state */}
            <AnimatePresence mode="wait">
              {!joined ? (
                <motion.form
                  key="waitlist-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    transition: {
                      duration: 0.35,
                      ease: "easeInOut",
                    },
                  }}
                  className="flex flex-col md:flex-row gap-4 justify-center items-center flex-wrap"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 md:w-auto w-[80vw] text-[#F8F8F5] text-[0.9rem,1vw,1.8rem] outline-none focus:border-[#00F5FF]/50 transition-colors"
                  />

                  <button
                    type="submit"
                    className="bg-[#00F5FF] text-[#111] border-none rounded-xl px-8 py-3 md:w-auto w-[50vw] text-[0.9rem,1vw,1.8rem] font-bold cursor-pointer font-body hover:bg-white transition-colors"
                  >
                    Join Waitlist
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="px-6"
                >
                  <p className="text-[#F8F8F5] font-body text-[clamp(0.9rem,1vw,1.2rem)]">
                    You’re officially on the VISOR waitlist.
                  </p>

                  <p className="text-[#666] font-body text-sm mt-2">
                    We’ll let you know when VISOR is ready to change the way
                    you see the world.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Global marketplace popup */}
      <MarketplacePopup
        isOpen={showPopup}
        onClose={closePopup}
      />
    </>
  );
}

export default App;
