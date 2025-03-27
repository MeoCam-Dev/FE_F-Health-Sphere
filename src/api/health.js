import axiosInstance from "./api";

export const getHealthRecords = (patientId) => {
  let query = `?pageNumber=1&pageSize=100`;

  if (typeof patientId !== "undefined" && patientId !== null) {
    query += `&patientId=${patientId}`;
  }

  return axiosInstance.get(`/healthrecords${query}`);
};