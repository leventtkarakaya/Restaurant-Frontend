import axios from "axios";
import React, { useEffect, useState } from "react";
import { UseFoodContext } from "../../context/foodContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { UseCardContext } from "../../context/cardContext";
export default function Menu() {
  // ? food context
  const { food, setFood } = UseFoodContext();
  // ? btn state
  const [active, setActive] = useState(0);
  // ? uploading state
  const [uploading, setUploading] = useState(false);
  // ? value state
  const [value, setValue] = useState({ value: "all" });
  const category = [
    {
      id: 0,
      name: "Hepsi",
      value: "all",
    },
    {
      id: 1,
      name: "Tatlılar",
      value: "Tatlılar",
    },
    {
      id: 2,
      name: "Içeçekler",
      value: "Içeçekler",
    },
    {
      id: 3,
      name: "Yemekler",
      value: "Yemekler",
    },
    {
      id: 4,
      name: "Meyveler",
      value: "Meyveler",
    },
    {
      id: 5,
      name: "Sebzeler",
      value: "Sebzeler",
    },
    {
      id: 6,
      name: "Kırmızı Et",
      value: "Kırmızı Et",
    },
    {
      id: 7,
      name: "Beyaz Et",
      value: "Beyaz Et",
    },
  ];
  const handleButtonClick = (item) => {
    setActive(item.id);
    setValue(item);
  };
  const handleGetFoods = async () => {
    setUploading(true);
    try {
      const res = await axios.get(
        `https://restaurant-backend-seven.vercel.app/api/v1/food/admin/getAllFoods?category=${value.value}`
      );
      setUploading(false);
      if (res.data.success && uploading === false) {
        setFood(res.data.data.food);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetFoods ~ error:", error);
    }
  };
  console.log(food);
  useEffect(() => {
    handleGetFoods();
  }, [value]);
  const { addToCart } = UseCardContext();
  return (
    <>
      <div className="pt-[8vh]">
        <div className="container py-8 mx-auto">
          <div className="p-5 mb-14">
            <div className="flex flex-wrap justify-center gap-5 mb-8 ">
              {category.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={
                      active === item.id
                        ? "text-xl px-4 py-3 bg-[#03396c] text-white text-center border-2 rounded-sm justify-center font-medium"
                        : "text-xl px-4 py-3 bg-white text-[#03396c] text-center border-2 rounded-sm justify-center font-medium"
                    }
                    onClick={() => handleButtonClick(item)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {food?.map((item) => {
                return (
                  <>
                    <FoodCardItem item={item} addToCart={addToCart} />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const FoodCardItem = ({ item, addToCart }) => {
  return (
    <>
      <div className="flex flex-col items-center p-5 rounded-lg cursor-pointer bg-slate-300 food-card">
        <div className="relative mb-3">
          <Link to={`/food-details/${item?._id}`}>
            <img
              src={item?.foodImage}
              alt="food"
              style={{
                objectFit: "fill",
                borderRadius: "10px",
                width: "200px",
                height: "200px",
              }}
            />
          </Link>
          <div className="absolute top-0 left-2">
            <button className="shadow-sm text-white bg-[#03396c] hover:bg-[#005b96] p-5 relative cursor-pointer rounded-full mt-2">
              <FaHeart className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            </button>
          </div>
          <div className="absolute bottom-2 right-2">
            <button className="shadow-sm bottom-4 border-white text-white text-xl  bg-[#03396c] hover:bg-[#005b96] p-6 relative cursor-pointer rounded-full ">
              <div className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {item?.price}₺
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-xl text-center font-bold text-[#2e2e2e]">
            {item?.name}
          </p>
          <div className="flex space-x-2 text-sm cursor-pointer">
            <span className="font-semibold text-[#2e2e2e] text-[16px] ">
              {item?.reviews.length}
            </span>
            <FaStar className="text-[#f1c40f]" size={16} />
            <span className="font-semibold text-[#2e2e2e]">5.0</span>
          </div>
        </div>
        <button
          onClick={() => addToCart(item)}
          className="bg-[#005b96] hover:bg-[#03396c] active:scale-90 transition-all duration-200 shadow-md hover:shadow-xl text-white font-medium py-2 px-8 rounded-full mt-3"
        >
          Siparişe Ver
        </button>
      </div>
    </>
  );
};
