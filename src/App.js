import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLogIn from "./Components/User Entry/Login";
import UserSignup from "./Components/User Entry/SignUp";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<UserSignup />} />
        <Route exact path="/login" element={<UserLogIn />} />
      </Routes>
    </div>
  );
}

export default App;
