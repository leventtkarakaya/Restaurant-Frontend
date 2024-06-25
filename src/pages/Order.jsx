import React from "react";
import Logo from "../../public/Logo.png";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseCardContext } from "../../context/cardContext";
import { UseUserContext } from "../../context/userContext";
import { useStripe } from "@stripe/react-stripe-js";

export default function Order() {
  const { cartItem, removeItem, addToCart } = UseCardContext();
  const itemsPrice = cartItem.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxRate = 0.18;
  const taxPrice = Math.round(itemsPrice * taxRate * 100) / 100;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const { user } = UseUserContext();
  const stripe = useStripe();
  const handleFinish = async () => {
    try {
      const orderItems = cartItem.map((item) => ({
        food: item._id,
        quantity: item.quantity,
      }));
      const res = await axios.post(
        "https://restaurant-backend-drab.vercel.app/api/v1/order/order",
        {
          user: user?._id,
          items: orderItems,
          totalAmount: totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.sessionId,
        });
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ handleFinish ~ error:", error);
    }
  };
  return (
    <>
      <div className="h-screen pt-[16vh]">
        <div className="ease-in-out duration-300 w-[100%] sm:w-max shadow-sm backdrop-blur-md bg-blue-400/30 lg:w-[30rem] mx-auto flex flex-col items-center rounded-md px-8 py-5">
          <NavLink to="/">
            <img
              src={Logo}
              alt="logo"
              width={200}
              height={200}
              className="mb-6 cursor-pointer logo"
            />
          </NavLink>
          <div className="text-xl font-medium text-[#2e2e2e] mb-3">
            Ögenin Tutarı :
            <span className="text-[#03396c]"> {itemsPrice} ₺</span>
          </div>
          <div className="text-xl font-medium text-[#2e2e2e] mb-3">
            Vergi Tutarı :<span className="text-[#03396c]"> {taxPrice} ₺</span>
          </div>
          <div className="text-xl font-medium text-[#2e2e2e] mb-3">
            Nakliye Tutarı :
            <span className="text-[#03396c]"> {shippingPrice} ₺</span>
          </div>
          <button
            onClick={handleFinish}
            className="bg-[#03396c] text-white p-2 rounded-md active:scale-90 transition  duration-300 transform hover:shadow-xl shadow-md w-full px-8 py-2 text-xl font-medium"
          >
            Toplam Ödeme {totalPrice} ₺
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
