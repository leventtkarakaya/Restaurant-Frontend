import axios from "axios";
import React, { useEffect, useState } from "react";
import { UseUserContext } from "../../../context/userContext";
import { dateFormatter } from "../../../utils/dateFormatter";
export default function AllOrder() {
  const [order, setOrder] = useState([]);
  const { user, setUser } = UseUserContext();
  const getAllOrders = async () => {
    try {
      const res = await axios.post(
        "https://restaurant-backend-drab.vercel.app/api/v1/order/getorders",
        {
          userId: user?._id,
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setOrder(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ getAllOrders ~ error:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  console.log(order);

  return (
    <>
      <div className="">
        <div className="pt-20">
          <div className="container mx-auto">
            <div className="w-full px-10 py-5 text-black bg-white rounded-md">
              <div className="flex justify-between pb-8 border-b">
                <h1 className="text-2xl font-semibold">Kartınız</h1>
              </div>
              <div className="flex mt-10 mb-5 gap-x-20">
                <h3 className="w-2/5 font-semibold text-gray-900 uppercase">
                  Yemek Detayı
                </h3>
                <h3 className="w-2/5 font-semibold text-gray-900 uppercase">
                  Kategori
                </h3>
                <h3 className="w-2/5 font-semibold text-gray-900 uppercase">
                  Üçret
                </h3>
                <h3 className="w-2/5 font-semibold text-gray-900 uppercase">
                  Toplam Üçret
                </h3>
              </div>
              {order.map((item, index) => {
                return (
                  <>
                    <CartFood item={item} key={index} />
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

const CartFood = ({ item }) => {
  console.log("🚀 ~ CartFood ~ item:", item);
  return (
    <>
      <div className="grid items-center grid-cols-4 -mx-8 border-b gap-x-8 hover:bg-gray-100">
        <div className="grid mx-6 grid-col gap-y-5">
          <div className="grid items-center grid-cols-3 -mx-8 border-b gap-x-8 hover:bg-gray-100">
            {item?.items?.map((item, index) => {
              return (
                <div className="w-full" key={index}>
                  <img
                    src={item?.food?.foodImage}
                    alt="food"
                    style={{
                      objectFit: "contain",
                      borderRadius: "10px",
                      width: "125px",
                      height: "100px",
                      marginBottom: "8px",
                    }}
                  />
                  <span className="text-sm font-bold">{item?.food?.name}</span>
                  <span className="flex items-center gap-x-2">
                    Miktar :
                    <span className="text-[#03396c] px-3 py-2 bg-[#f5f5f5] text-lg">
                      {item?.quantity}
                    </span>
                  </span>
                </div>
              );
            })}
            <img
              src={item?.foodImage}
              alt="food"
              style={{
                objectFit: "contain",
                borderRadius: "10px",
                width: "125px",
                height: "100px",
                marginBottom: "8px",
              }}
            />
          </div>
          <div className="flex flex-col justify-between flex-grow ">
            <span className="text-sm font-bold">{item?.foodName}</span>
            <span className="flex items-center gap-x-2 mb-7"></span>
          </div>
        </div>
        <div className="flex justify-center w-1/5 cursor-pointer">
          {item?.payment === false && (
            <span className="w-1/5 text-sm font-bold text-center">
              Üçret alınmadı
            </span>
          )}
          {item?.payment === true && (
            <span className="w-1/5 text-sm font-bold text-center text-green-600">
              Üçret alındı
            </span>
          )}
        </div>
        <div className="flex justify-center w-1/5 cursor-pointer">
          <span className="w-1/5 text-sm font-bold text-center">
            {item?.status}
          </span>
        </div>
        <span className="w-1/5 text-sm font-bold text-center">
          {dateFormatter(item?.createdAt)}
        </span>
        <span className="w-1/5 text-sm font-bold text-center">
          {item?.totalAmount} TL
        </span>
      </div>
    </>
  );
};
