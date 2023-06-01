import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PATH_NAME from "./Enum/PathEnum";
import ProfileComponent from "./Componnets/Profile";
import Style from "Sass/_main.module.scss"

function App() {
  return (
    <div className={Style['App']}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={PATH_NAME.PATH.HOME} replace />} />
          <Route index path={PATH_NAME.PATH.HOME} Component={ProfileComponent} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
