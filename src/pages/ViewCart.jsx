import React from "react";
import { UseCardContext } from "../../context/cardContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ViewCart() {
  const { cartItem, removeItem, addToCart } = UseCardContext();
  const itemsPrice = cartItem.reduce((a, c) => a + c.quantity * c.price, 0);
  const taxPrice = itemsPrice * 0.2;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <>
      <div className="pt-20">
        <div className={cartItem.length > 0 ? "bg-gray-200" : "bg-slate-100"}>
          <div className="container mx-auto">
            <div className="w-full px-10 py-5 text-black bg-white rounded-md">
              <div className="flex justify-between pb-8 border-b">
                <h1 className="text-2xl font-semibold">
                  Kartınızda {cartItem.length} ürün vardır.
                </h1>
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
              {cartItem.map((item, index) => {
                return (
                  <>
                    <CartFood item={item} key={index} />
                  </>
                );
              })}
              <div
                className={
                  cartItem.length === 0
                    ? "mx-auto hidden items-end justify-center px-6 flex-col"
                    : "mx-auto justify-center items-end px-6 flex-col"
                }
              >
                <div className="text-right mb-2 font-semibold text-[#03396c]">
                  Nakliye fiyatı:
                  <span className="text-sm">{shippingPrice}</span>
                </div>
                <div className="text-right mb-2 font-semibold text-[#03396c]">
                  Toplam fiyatı:{" "}
                  <span className="text-sm">{totalPrice} ₺ </span>
                </div>
                <Link to={"/order"}>
                  <button className="btn text-right ml-auto text-white hover:bg-[#005b96] hover:border-[#33396c] bg-[#03396c] btn-sm ">
                    Sepeti Onayla
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CartFood = ({ item }) => {
  const { cartItem, addToCart, removeItem } = UseCardContext();

  return (
    <>
      <div className="grid items-center grid-cols-4 -mx-8 border-b gap-x-8 hover:bg-gray-100">
        <div className="grid mx-6 grid-row ">
          <div className="w-full">
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
            <span className="flex items-center gap-x-2 mb-7">
              <div className="shadow-sm text-white bg-[#03396c] hover:bg-[#005b96] p-4 relative  cursor-pointer rounded-full">
                <AiOutlineMinus
                  onClick={() => removeItem(item)}
                  size={18}
                  style={{
                    position: "absolute",
                    fontFamily: "sans-serif",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                />
              </div>
              <span className="text-[#f5f5f5] px-4 py-[6px] bg-[#03396c] text-lg font-medium rounded-md">
                {item?.quantity}
              </span>
              <div className="shadow-sm text-white bg-[#03396c] hover:bg-[#005b96] p-4 relative cursor-pointer rounded-full">
                <AiOutlinePlus
                  onClick={() => addToCart(item)}
                  size={18}
                  style={{
                    position: "absolute",
                    fontFamily: "sans-serif",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                />
              </div>
            </span>
          </div>
        </div>

        <div className="flex justify-center w-1/5 cursor-pointer">
          <span className="text-sm font-bold">{item?.category}</span>
        </div>
        <span className="w-1/5 text-sm font-bold text-center">
          {item?.price} X {item?.quantity}
        </span>
        <span className="w-1/5 text-sm font-bold text-center">
          {item?.price * item?.quantity}₺
        </span>
      </div>
    </>
  );
};
