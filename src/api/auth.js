import axiosInstance from "./api";

export const loginWithGoogle = (idToken) =>
  axiosInstance.post("/auth/firebase-login", idToken, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);

// Lấy danh sách bands từ API
export const getBands = (pageNumber = 1, pageSize = 10) =>
  axiosInstance
    .get(`/bands?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((res) => res.data);
