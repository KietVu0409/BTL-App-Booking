import axios from "axios";

const API_BASE_URL = "http://192.168.1.82:3000/favorites";

/**
 * Thêm một accommodation vào danh sách yêu thích của khách hàng.
 * @param {number} customerId - ID của khách hàng.
 * @param {number} accommodationId - ID của accommodation.
 * @returns {Promise<Object>} - Phản hồi từ server.
 */
export const addFavorite = async (customerId, accommodationId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, {
      customerId,
      accommodationId,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm yêu thích:", error);
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Lấy danh sách yêu thích của một khách hàng.
 * @param {number} customerId - ID của khách hàng.
 * @returns {Promise<Array>} - Danh sách accommodation yêu thích.
 */
export const getFavorites = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích:", error);
    throw error.response ? error.response.data : error.message;
  }
};

/**
 * Xóa một accommodation khỏi danh sách yêu thích của khách hàng.
 * @param {number} customerId - ID của khách hàng.
 * @param {number} accommodationId - ID của accommodation.
 * @returns {Promise<Object>} - Phản hồi từ server.
 */
export const removeFavorite = async (customerId, accommodationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${customerId}/${accommodationId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa yêu thích:", error);
    throw error.response ? error.response.data : error.message;
  }
};