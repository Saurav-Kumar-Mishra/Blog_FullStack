import React, { createContext, useContext } from "react";

const User = createContext();

export default function AppContextProvider({ children }) {
  const [isLogged, setIsLogged] = React.useState(false);
  console.log(isLogged);
  const value = {
    isLogged,
    setIsLogged,
  };

  return <User.Provider value={value}>{children}</User.Provider>;
}

export const useUser = () => {
  const context = useContext(User);

  if (!context)
    throw new Error("useUser should be used inside UserContext.Provider");
  else return context;
};
