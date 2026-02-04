import { Routes, Route } from "react-router-dom";
import Card from "./components/card/Card";
import StudentScreen from "./Student";

<Routes>
  <Route path="/card" element={<Card />} />
  <Route path="/students/:teacherId" element={<StudentScreen />} />
</Routes>