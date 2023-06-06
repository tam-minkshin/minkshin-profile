import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Style from "Sass/_main.module.scss";
import MainComponent from "Componnets";

function App() {
  return (
    <div className={Style["App"]}>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
