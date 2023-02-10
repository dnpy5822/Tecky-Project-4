import { useSelector } from "react-redux";
import { IRootState } from "./store";

export function isConnected() {
  let data = useSelector((state: IRootState) => state.login.user);
  return data;
}

export function useToken() {
  let data = useSelector((state: IRootState) => state.login.user?.token);
  return data;
}