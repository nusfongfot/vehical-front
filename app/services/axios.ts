import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem("access_token");
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<{ message?: string[]; statusCode?: number }>) => {
    if (error.response) {
      const { status, data } = error.response;

    //   if (status === 401) {
    //     localStorage.removeItem("access_token");
    //     if (typeof window !== "undefined") {
    //       window.location.href = "/login";
    //     }
    //   }

      const errorMessage = Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์";

      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"));
  },
);
