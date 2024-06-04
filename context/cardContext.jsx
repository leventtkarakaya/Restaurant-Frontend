import { createContext, useContext, useState, useEffect } from "react";

const CardContext = createContext();

const UserContextProvider = ({ children }) => {
  const [food, setFood] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (food) => {
    const exits = cartItem.find((item) => item._id === food._id);
    if (exits) {
      setCartItem(
        cartItem.map((item) =>
          item._id === food._id
            ? { ...exits, quantity: exits.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItem([...cartItem, { ...food, quantity: 1 }]);
    }
  };
  const romeveItem = (x) => {
    const exits = cartItem.find((item) => item._id === food._id);
    if (exits.quantity === 1) {
      setCartItem(cartItem.filter((item) => item._id !== food._id));
    } else {
      setCartItem(
        cartItem.map((item) =>
          item._id === food._id
            ? { ...exits, quantity: exits.quantity - 1 }
            : item
        )
      );
    }
  };
  console.log(cartItem);
  return (
    <CardContext.Provider value={{ cartItem, addToCart, romeveItem }}>
      {children}
    </CardContext.Provider>
  );
};

const UseCardContext = () => {
  return useContext(CardContext);
};

export { UserContextProvider, UseCardContext };
