import axiosInstance from "./api";
export const getPatients = (pageNumber = 1, pageSize = 10) =>
  axiosInstance.get(`/accounts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data);

// Lấy getPatients theo ID
export const getgetPatientsById = (id) =>
  axiosInstance.get(`/accounts/${id}`).then((res) => res.data);

// Tạo getPatients mới
export const creategetPatients = (getPatientsData) =>
  axiosInstance.post("/accounts", getPatientsData).then((res) => res.data);

// Cập nhật getPatients
export const updategetPatients = (id, getPatientsData) =>
  axiosInstance.put(`/accounts/${id}`, getPatientsData).then((res) => res.data);

// Xóa getPatients
export const deletegetPatients = (id) =>
  axiosInstance.delete(`/accounts/${id}`).then((res) => res.data);