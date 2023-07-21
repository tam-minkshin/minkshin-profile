import { faL } from "@fortawesome/free-solid-svg-icons";
import { FC, createContext, useContext, useEffect, useState } from "react";

interface TestProviderProps {
  children: JSX.Element;
}
interface TestContext {
  handleClose: (value: boolean) => boolean;
}
const handleClose = (value: boolean) => {
  return value;
};
const init = { handleClose };
export const TestContext = createContext<TestContext>(init);

const TestProvider: FC<TestProviderProps> = ({ children }) => {
  const value = {
    handleClose: init.handleClose,
  };
  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestProvider;
