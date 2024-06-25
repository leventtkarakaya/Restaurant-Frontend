import React, { useState } from "react";
import { UseUserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const { user, setUser } = UseUserContext();
  const navigate = useNavigate();
  console.log("🚀 ~ VerifyOtp ~ user:", user);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const combinedOtp = parseInt(otp.join(""));
  const email = user?.email;
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dataOtp = {
      email,
      combinedOtp,
    };
    console.log(dataOtp.email, dataOtp.combinedOtp);
    await axios
      .post(
        "https://restaurant-backend-drab.vercel.app/api/v1/user/verifyotp",
        {
          email: dataOtp.email,
          combinedOtp: dataOtp.combinedOtp,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data.data.success);
        if (data.data.success) {
          toast.success(data.data.message);
          location.reload();
          window.location.href = "/";
        }
      });
  };

  return (
    <>
      <div className="relative pt-[15vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="max-w-lg px-6 pt-10 mx-auto bg-white shadow-xl realative pb-9 rounded-2xl">
          <div className="flex flex-col w-full max-w-md space-y-16 max-auto">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="font-semibold">
                <p>E-mail Dogrulama Kodunuzu Giriniz</p>
              </div>
              <div className="flex flex-col text-sm font-medium text-gray-400">
                <p>
                  E-posta adresinize gelen 6 haneli kodu girerek hesabınızı
                  onaylayabilirsiniz {user?.email}
                </p>
              </div>
            </div>
            <div>
              <form className="flex flex-col space-y-16">
                <div className="flex justify-center">
                  {otp.map((digit, index) => {
                    return (
                      <input
                        type="text"
                        key={index}
                        value={digit}
                        maxLength={1}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="w-12 h-12 mx-2 text-xl text-center bg-gray-200 border-gray-300 rounded "
                      />
                    );
                  })}
                </div>
                <button
                  onClick={handleOnSubmit}
                  className="bg-[#03396c]  w-full hover:bg-[#005b96] text-white text-xl active:scale-90 hover:shadow-xl shadow-md  p-4 relative cursor-pointer rounded-full"
                >
                  Dogrula
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
