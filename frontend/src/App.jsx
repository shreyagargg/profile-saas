import { Routes, Route } from "react-router-dom";
import Card from "./components/card/Card";
import StudentScreen from "./Student";
import HeroScreen from "./HeroScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroScreen />} />
      <Route path="/card" element={<Card />} />
      <Route path="/:teacherId/students" element={<StudentScreen />} />
    </Routes>
  );
}

export default App;
