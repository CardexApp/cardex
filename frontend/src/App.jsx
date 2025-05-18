// import {LOGO} from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Header/navBar.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Products from "./Pages/ProductsPage.jsx";
import CarInfoDetails from "./Components/ProductDetails/CarInfo Container/CarInfoDetails.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <CarInfoDetails />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listings" element={<Products />} />
        <Route path="/car/:id" element={<CarInfoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
