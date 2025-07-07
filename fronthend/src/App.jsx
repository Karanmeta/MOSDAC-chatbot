import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Content from "./components/Content";
import Missions from "./components/Missions";
import Gallery from "./components/Gallery";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a2e" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Content />
          </>
        } />
        <Route path="/missions" element={<Missions />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default App;