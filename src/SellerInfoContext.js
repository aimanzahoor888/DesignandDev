// SellerInfoContext.js
import { createContext, useContext, useState } from 'react';

export const SellerInfoContext = createContext();

export const SellerInfoProvider = ({ children }) => {
  const [sellerInfo, setSellerInfo] = useState({});
  
  const updateSellerInfo = (info) => {
    setSellerInfo(info);
  };

  return (
    <SellerInfoContext.Provider value={{ sellerInfo, updateSellerInfo }}>
      {children}
    </SellerInfoContext.Provider>
  );
};

export const useSellerInfo = () => {
  return useContext(SellerInfoContext);
};




