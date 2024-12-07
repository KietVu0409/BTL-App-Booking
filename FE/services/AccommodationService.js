import axios from "axios";

const API_BASE_URL = "http://192.168.1.82:3000/accommodations";

/**
 * Lấy danh sách accommodations theo location_type.
 * @param {string} locationType - Loại địa điểm (beach, mountain, etc.)
 * @returns {Promise<Array>} - Danh sách accommodations.
 */
export const getAccommodationsByLocationType = async (locationType) => {
  const response = await axios.get(`${API_BASE_URL}/filterByLocationType`, {
    params: { location_type: locationType },
  });
  return response.data;
};

/**
 * Lấy danh sách accommodations theo type.
 * @param {string} type - Loại accommodation (hotel, resort, homestay, camping).
 * @returns {Promise<Array>} - Danh sách accommodations.
 */
export const getAccommodationsByType = async (type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filterByType`, {
      params: { type: type },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    throw error;
  }
};

// Fetch accommodations by hotel type
export const getAccommodationsByHotel = async () => {
  const response = await axios.get(`${API_BASE_URL}/filterByType`, {
    params: { type: "hotel" },
  });
  return response.data;
};

// Fetch accommodations by resort type
export const getAccommodationsByResort = async () => {
  const response = await axios.get(`${API_BASE_URL}/filterByType`, {
    params: { type: "resort" },
  });
  return response.data;
};

// Fetch accommodations by homestay type
export const getAccommodationsByHomestay = async () => {
  const response = await axios.get(`${API_BASE_URL}/filterByType`, {
    params: { type: "homestay" },
  });
  return response.data;
};

// Fetch accommodations by camping type
export const getAccommodationsByCamping = async () => {
  const response = await axios.get(`${API_BASE_URL}/filterByType`, {
    params: { type: "camping" },
  });
  return response.data;
};

/**
 * Lấy thông tin chi tiết của một accommodation theo ID.
 * @param {number} id - ID của accommodation.
 * @returns {Promise<Object>} - Chi tiết của accommodation.
 */
export const getAccommodationById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching accommodation with id ${id}:`, error);
    throw error;
  }
};