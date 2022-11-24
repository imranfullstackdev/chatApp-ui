import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Charts from "./pages/Charts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Charts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
