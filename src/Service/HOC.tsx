import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { responseAPI } from "../redux/slices";

export default function HOCRequest<T>(Component: React.ComponentType<T>) {
  const BaseComponent = (props: any) => {
    const res = useSelector(responseAPI);
    const [state, setState] = useState<any>(props);
    useEffect(() => {
      if (res) {
        setState((s: any) => ({ ...s, ...res.response }));
      }
    }, [res]);
    return <Component {...state} />;
  };
  return BaseComponent;
}
