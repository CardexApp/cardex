import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Providers
import { CartProvider } from "./Context/CartContext.jsx";
import { OrdersProvider } from "./Context/OrdersContext.jsx";

// Notifications
import { ToastContainer } from "react-toastify";

// Layout
import NavBar from "./Components/Header/navBar.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";

// Public Pages
import Homepage from "./Pages/Homepage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import Products from "./Pages/ProductsPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import OrderDetails from "./Pages/OrderDetails.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Register from "./Components/User/Register/Register.jsx";
import CarInfoDetails from "./Components/ProductDetails/CarInfo Container/CarInfoDetails.jsx";
import DynamicCategoryPage from "./Components/DynamicCategory/DynamicCategoryPage.jsx";

// Auth + Protected Routing
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";

// Admin
import Admin from "./Components/Admin/Admin.jsx";
import AdminLogin from "./Components/Admin/Authentication/AdminLogin.jsx";
import AdminRegister from "./Components/Admin/Authentication/AdminRegister";
import AdForgetPass from "./Components/Admin/Authentication/ChangePassword.jsx";
import AdminRoute from "./Components/Admin/AdminRoute.jsx";
import ForgotPassword from "./Components/User/Password/ForgotPassword.jsx";
import UserProfile from "./Components/User/Profile/UserProfile.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");


  return (
    <OrdersProvider>
      <CartProvider>
        <ToastContainer />
        <div className="App">
          {!isAdminRoute && <NavBar />}
          <div className="mainContent">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route
                path="/user/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/listings"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />

              {/* Admin Auth Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/forgot-password" element={<AdForgetPass />} />

              {/* Admin Dashboard Routes */}
              <Route
                path="/admin/*"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
          <Footer className="cardexFooter" />
        </div>
      </CartProvider>
    </OrdersProvider>
  );
}

export default App;
