import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import AddFood from "./pages/admin/AddFood";
import Menu from "./pages/Menu.jsx";
import FoodDetails from "./pages/FoodDetails";
import Profile from "./pages/Profile.jsx";
import ViewCart from "./pages/ViewCart.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import Order from "./pages/Order.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import AllOrder from "./pages/admin/AllOrder.jsx";
function App() {
  const stripePromise = loadStripe(
    "pk_test_51PI70905djJLEZUPjOEC30MouPA4CkP71M2URwEDKQPKWu0SCCUMchbmcpZejuLh0uskaFZvTVY9ScaEgeLGCUJo00usQbbdc2"
  );
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/verifyotp"
          element={
            <ProtectedRoute>
              <VerifyOtp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addfood"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-details/:id"
          element={
            <ProtectedRoute>
              <FoodDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcart"
          element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Elements stripe={stripePromise}>
                <Order />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-orders"
          element={
            <ProtectedRoute>
              <AllOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
