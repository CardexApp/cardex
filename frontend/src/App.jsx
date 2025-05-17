// import {LOGO} from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Header/navBar.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Products from "./Pages/ProductsPage.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listings" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
