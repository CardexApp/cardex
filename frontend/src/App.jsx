// import {LOGO} from './logo.svg';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Header/navBar.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Products from "./Pages/ProductsPage.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import CartPage from "./Pages/CartPage.jsx";
import CarInfoDetails from "./Components/ProductDetails/CarInfo Container/CarInfoDetails.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import { ToastContainer } from "react-toastify";
import OrderDetails from "./Pages/OrderDetails.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import Register from "./Components/User/Register/Register.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import Customers from "./Components/Admin/Customers.jsx";

function App() {
  return (
    <CartProvider>
      <ToastContainer />
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/car/:id" element={<CarInfoDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
