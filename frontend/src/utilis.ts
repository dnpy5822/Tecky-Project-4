import jwtDecode from "jwt-decode";
import { User } from "./store/LoginSlice";

export async function fetchData(path: string) {
  const res = await fetch(import.meta.env.VITE_SERVER_API + path);
  const result = await res.json();

  return result;
}

export async function fetchNonGetData(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH",
  data: any
) {
  try {
    let headers: HeadersInit = {
      "content-type": "application/json",
    };

    let storeData = getLocalStorage();

    if (storeData?.token) {
      headers["Authorization"] = `Bearer ${storeData?.token}`;
    }

    const res = await fetch(import.meta.env.VITE_SERVER_API + url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (err: any) {
    return null;
  }
}

export function getLocalStorage() {
  let token = localStorage.getItem("token");
  if (token) {
    let decoded: User = jwtDecode(token);
    let user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      avatar: decoded.avatar || null,
      isAdmin: decoded.isAdmin,
      token: token,
    };
    return user;
  }
  return null;
}
