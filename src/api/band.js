import axiosInstance from "./api";

// Lấy danh sách bands (có phân trang)
export const getBands = (pageNumber = 1, pageSize = 10) =>
  axiosInstance.get(`/bands?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data);

// Lấy band theo ID
export const getBandById = (id) =>
  axiosInstance.get(`/bands/${id}`).then((res) => res.data);

// Tạo band mới
export const createBand = (bandData) =>
  axiosInstance.post("/bands", bandData).then((res) => res.data);

// Cập nhật band
export const updateBand = (id, bandData) =>
  axiosInstance.put(`/bands/${id}`, bandData).then((res) => res.data);

// Xóa band
export const deleteBand = (id) =>
  axiosInstance.delete(`/bands/${id}`).then((res) => res.data);


// Lấy danh sách bandbrands (có phân trang)
export const getBandBrand = (pageNumber = 1, pageSize = 10) =>
  axiosInstance.get(`/bandbrands?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data);

// Lấy bandbrands theo ID
export const getBandBrandById = (id) =>
  axiosInstance.get(`/bandbrands/${id}`).then((res) => res.data);

// Tạo bandbrands mới
export const createBandBrand = (bandData) =>
  axiosInstance.post("/bandbrands", bandData).then((res) => res.data);

// Cập nhật bandbrands
export const updateBandBrand = (id, bandData) =>
  axiosInstance.put(`/bandbrands/${id}`, bandData).then((res) => res.data);

// Xóa bandbrands
export const deleteBandBrand = (id) =>
  axiosInstance.delete(`/bandbrands/${id}`).then((res) => res.data);
