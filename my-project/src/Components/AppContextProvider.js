import React, { createContext, useContext} from "react";

export const User = createContext();

export default function AppContextProvider({ children }) { 
  const [user, setUser]=React.useState(null);
  console.log(user);
  const value = {
    user,
    setUser
  };

  return <User.Provider value={value}>{children}</User.Provider>;
}

// export function useUser(){
//   const context = useContext(User);

//   if(!context){
//     console.log("User can be used inside App only");
//   }else return [context.user, context.setUser];
// }

