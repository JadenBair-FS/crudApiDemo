import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Student from "./Pages/Student";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/student/:id" element={<Student />} />
      <Route path ="/dashboard" element={<Dashboard />} />
      <Route path="/" exact element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
