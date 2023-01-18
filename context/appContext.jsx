import React from "react";

export const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [cxtAddress, setCxtAddress] = React.useState(null);

  const login = (address) => {
    setCxtAddress(address);
  };

  const logout = () => {
    setCxtAddress(null);
  };

  const memoedValue = React.useMemo(
    () => ({
      cxtAddress,
      login,
      logout,
    }),
    [cxtAddress]
  );
  return (
    <AppContext.Provider value={memoedValue}>{children}</AppContext.Provider>
  );
};

const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp can only be used inside AppProvider");
  }
  return context;
};

export { AppProvider, useApp };
