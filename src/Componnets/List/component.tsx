import HOCRequest from "Service/HOC";
import { FC, useEffect } from "react";
import View from "./view";
import { fetchUserById } from "redux/slices";
import { useAppDispatch } from "redux/reduxHook";

interface ListProps {}

const List: FC<ListProps> = (props) => {
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log('check res',props)
    dispatch(fetchUserById())
  }, []);
  return <View />;
};

export default HOCRequest(List);
