import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import Index from "./pages";
import Colleges from "./pages/Colleges";
import Users from "./pages/Users";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
// import Index3 from "./sub-pages/index3";
import Team from "./pages/FullTeam";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <Loader key="loader" />
      ) : (
        <>
          <Navigation />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/users" element={<Users />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />

          </Routes>

          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}

export default App;
