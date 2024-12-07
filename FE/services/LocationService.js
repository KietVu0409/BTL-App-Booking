import axios from "axios";

const API_BASE_URL = "http://192.168.1.82:3000/locations";

/**
 * Lấy danh sách tất cả các loại địa điểm (location types).
 * @returns {Promise<Array>} - Danh sách các loại địa điểm.
 */
export const getAllLocations = async () => {
  const response = await axios.get(`${API_BASE_URL}/getall`);
  return response.data;
};