import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditTask from "./pages/EditTask";
import './App.css';
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login/>} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtask" element={<AddTask />} />
      

<Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
