import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const basicAuthFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_BASIC_AUTH_USER || "",
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASS || "",
  },
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
});