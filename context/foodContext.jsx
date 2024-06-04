import React, { createContext, useContext, useState } from "react";

const FoodContext = createContext();

const FoodProvider = ({ children }) => {
  const [food, setFood] = useState(null);

  return (
    <FoodContext.Provider value={{ food, setFood }}>
      {children}
    </FoodContext.Provider>
  );
};

const UseFoodContext = () => {
  return useContext(FoodContext);
};

export { FoodProvider, UseFoodContext };
