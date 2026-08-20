import React from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppRoutes from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { darkMode } = useTheme();
  const location = useLocation();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: darkMode
          ? "linear-gradient(180deg, #0a0a0a 0%, #141414 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8f0fe 100%)",
        transition: "background 500ms",
      }}
    >
      <Navbar />
      <ScrollToTop />
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
