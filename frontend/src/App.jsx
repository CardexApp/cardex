// import {LOGO} from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Header/navBar.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Products from "./Pages/ProductsPage.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import CartPage from "./Pages/CartPage.jsx";
import CarInfoDetails from "./Components/ProductDetails/CarInfo Container/CarInfoDetails.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <CartProvider />
      <CarInfoDetails />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/listings" element={<Products />} />
        <Route path="/car/:id" element={<CarInfoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
