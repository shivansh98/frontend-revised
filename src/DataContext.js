import React, { createContext, useState } from "react";

const ContextSchema = () => {
  const DataContext = createContext();

  const Provider = ({ children }) => {
    const [state, setState] = useState({ username: "Shivansh" });

    return (
      <DataContext.Provider value={[state, setState]}>
        {children}
      </DataContext.Provider>
    );
  };
  return { DataContext, Provider };
};

const obj = ContextSchema();

export default obj;
