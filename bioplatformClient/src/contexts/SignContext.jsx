import React, { createContext, useContext, useEffect, useRef } from "react";

const Signcontext = createContext();

export const Signprovider = ({ children }) => {
  const refs = {
    changesignedRef: useRef(() => {}),
    changeuserpageRef: useRef(() => {})
  };
  const signedview = (isSigned) => {
    console.log("signedview", isSigned);
    refs.changesignedRef.current(isSigned);

  };
  const changeuserpage = () => {
    console.log("change");
    refs.changeuserpageRef.current();

  };
  
  return (
    <Signcontext.Provider value={{ ...refs, signedview, changeuserpage }}>
      {children}
    </Signcontext.Provider>
  );
};

export const useSigncontext = () => useContext(Signcontext);