import React, { useEffect, useState } from "react";
import Logo from "../../public/Logo.png";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../context/userContext";
import Avatar from "../../public/avatar.png";
import { UseCardContext } from "../../context/cardContext";
export default function Navbar() {
  const navigatinos = useNavigate();
  const [navigation, setNavigation] = useState(false);
  const { user, setUser } = UseUserContext();
  console.log("🚀 ~ Navbar ~ user:", user);
  const { cartItem } = UseCardContext();
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full duration-300 ease-in shadow-md bg-white/80 backdrop-blur-md">
        {user && user?.isVerified === false && (
          <div
            onClick={navigatinos("/verifyotp")}
            className="p-2 text-center text-white bg-red-500"
          >
            Lütfen E-mail Adresinizi Onaylayınız
          </div>
        )}
        <div className="container px-10 py-3 mx-auto sm:px-4 md:px-6 lg:px-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-10 cursor-pointer" />
            </Link>
            <div className="items-center hidden gap-8 lg:flex">
              <Link
                to="/"
                className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
              >
                Günün Özelleri
              </Link>
              <Link
                to="/menu"
                className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
              >
                Menümüz
              </Link>
              {user && user?.role === "admin" && (
                <Link
                  to="/addfood"
                  className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
                >
                  Yemek Ekle
                </Link>
              )}
              <Link
                to="/"
                className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
              >
                En Popülerler
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span
                      className="badge badge-sm indicator-item"
                      style={{
                        borderRadius: "100%",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#005b96",
                        color: "#ffffff",
                      }}
                    >
                      {cartItem?.length || 0}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-[#f5f5f5] shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold text-center gap-x-2">
                      {cartItem?.length || 0} Ürün
                    </span>
                    <span className="text-sm text-center">
                      Sepetinizdeki ürünler
                    </span>
                    <div className="flex items-center justify-center card-actions">
                      <NavLink to="/viewcart">
                        <button className="btn btn-primary btn-block focus:bg-[#005b96] hover:bg-[#005b96] rounded-full">
                          Sepete Git
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              {/* User Profile Controller */}
              {user && user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.profileImage || Avatar}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
                  >
                    <li>
                      <Link to={"/profile"}>
                        <button className="justify-between">Profile</button>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/all-orders"}>
                        <button className="justify-between">
                          Bütün Şiparişler
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/my-orders"}>
                        <button className="justify-between">Siparişler</button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          location.reload();
                          navigatinos("/login");
                        }}
                      >
                        Çıkış
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to={"/login"}>
                  <button className="bg-[#274c5e] text-white font-medium py-2 px-8 rounded-full active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md ">
                    Giriş
                  </button>
                </Link>
              )}
            </div>
            {/* Mobile Menu Controller */}
            <div
              className="z-40 block lg:hidden"
              onClick={() => setNavigation(!navigation)}
            >
              {navigation ? (
                <RxCross2 size={30} className="text-[#191919] cursor-pointer" />
              ) : (
                <TiThMenu size={30} className="text-[#191919] cursor-pointer" />
              )}
            </div>
            <div
              className={`lg:hidden absolute w-2/3 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm backdrop-blur-md bg-[#dae9f4] top-16 duration-500 ${
                navigation ? "right-0" : "right-[-100%]"
              } pt-24`}
            >
              <div className="flex flex-col items-center gap-8">
                <Link
                  to="/"
                  className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
                >
                  Günün Özelleri
                </Link>
                <Link
                  to="/menu"
                  className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
                >
                  Menümüz
                </Link>
                {user && user?.role === "admin" && (
                  <Link
                    to="/addfood"
                    className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
                  >
                    Yemek Ekle
                  </Link>
                )}
                <Link
                  to="/"
                  className="text-[#6B7280] text-base font-medium hover:text-[#005b96]"
                >
                  En Popülerler
                </Link>
                {user && user ? (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={user?.profileImage || Avatar}
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
                    >
                      <li>
                        <Link to={"/profile"}>
                          <button className="justify-between">Profile</button>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/all-orders"}>
                          <button className="justify-between">
                            Bütün Şiparişler
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/my-orders"}>
                          <button className="justify-between">
                            Siparişler
                          </button>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            location.reload();
                            navigatinos("/login");
                          }}
                        >
                          Çıkış
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to={"/login"}>
                    <button className="bg-[#274c5e] text-white font-medium py-2 px-8 rounded-full active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md ">
                      Giriş
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
