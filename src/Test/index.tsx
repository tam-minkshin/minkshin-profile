import { FC, createElement, useContext, useState } from "react";
import TestProvider, { TestContext } from "./testContext";

interface TestProps {}

const Test: FC<TestProps> = () => {
    const {handleClose} = useContext(TestContext)
    const [isClosed,setClosed] = useState<boolean>(true)
    const handleClosed = () => {
        const value = handleClose(false)
        setClosed(value)
    }

  return (
    <TestProvider>
      {isClosed ? <div className="w-40 h-40 flex items-center justify-center">
        <button onClick={handleClosed}>close</button>
      </div> : <></>}
    </TestProvider>
  );
};

export default Test;
