import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Content from "./components/Content";
import Missions from "./components/Missions";
import Gallery from "./components/Gallery";
import PreviousChatsPage from "./components/PreviousChatsPage";

function App() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1a1a2e",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
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
        <Route path="/previous-chats" element={<PreviousChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;