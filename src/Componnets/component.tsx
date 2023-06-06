import PATH_NAME from "Enum/PathEnum";
import * as React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileComponent from "./Profile";
interface MainComponentProps {}

interface MainComponentState {}

class MainComponent extends React.Component<MainComponentProps, MainComponentState> {
  state = {};
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={PATH_NAME.PATH.HOME}/>} />
        <Route path={PATH_NAME.PATH.HOME} Component={ProfileComponent} />
      </Routes>
    );
  }
}

export default MainComponent;
