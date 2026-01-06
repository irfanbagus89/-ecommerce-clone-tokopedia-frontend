import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL // SERVER → HARUS absolute
    : process.env.NEXT_PUBLIC_MODE === "development"
    ? "/api" // CLIENT dev
    : process.env.NEXT_PUBLIC_API_URL; // CLIENT prod

export const fetcher = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
