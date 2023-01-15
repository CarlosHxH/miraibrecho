import React, { Children } from "react";

const Context = React.createContext(null);
export const useCtx = () => React.useContext(Context);
export default function SearchProvider() {
  const [input, setInput] = React.useState(null);
  return (
    <Context.Provider value={{ input, onChange: setInput }}>
      {Children}
    </Context.Provider>
  );
}
