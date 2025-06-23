import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Projects from "./pages/Projects";
import Home from "./pages/Home";

function App() {
  return (
    <div
      className="flex flex-col justify-center items-center
    p-10 gap-16 max-w-3xl"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/projects/:category" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
