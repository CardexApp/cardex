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
import DynamicCategoryPage from "./Components/DynamicCategory/DynamicCategoryPage.jsx";
import { OrdersProvider } from "./Context/OrdersContext.jsx";
import AdminLogin from "./Components/Admin/Authentication/AdminLogin.jsx";
import AdminRegister from "./Components/Admin/Authentication/AdminRegister";
import AdForgetPass from "./Components/Admin/Authentication/AdForgetPass";
import ForgotPassword from "./Components/User/Password/ForgotPassword.jsx";
import UserProfile from "./Components/User/Profile/UserProfile.jsx";

function App() {
  return (
    <OrdersProvider>
      <CartProvider>
        <ToastContainer />
        <div className="App">
          <NavBar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route
              path="/category/:categoryName"
              element={<DynamicCategoryPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/user/forgot-password" element={<ForgotPassword />} />
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

            {/* Admin routes handled internally */}
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/forgot-password" element={<AdForgetPass />} />
          </Routes>
        </div>
      </CartProvider>
    </OrdersProvider>
  );
}

export default App;
