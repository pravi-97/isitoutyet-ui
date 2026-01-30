// AppContext.jsx
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [myShowIds, setMyShowIds] = useState([]);

  return (
    <AppContext.Provider value={{ myShowIds, setMyShowIds }}>
      {children}
    </AppContext.Provider>
  );
};

export const useMyShowIds = () => useContext(AppContext);
