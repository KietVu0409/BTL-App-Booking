import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.82:3000/bookings';

// Tạo mới booking
export const createBooking = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, data);
    return response.data; // Trả về thông tin booking đã tạo
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error; // Ném lỗi nếu có lỗi xảy ra
  }
};

// Tìm kiếm booking theo customer_id
export const findBookingByCustomerId = async (customerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customer/${customerId}`);
    return response.data; // Trả về danh sách bookings của customer
  } catch (error) {
    console.error('Error finding booking by customer ID:', error);
    throw error; // Ném lỗi nếu có lỗi xảy ra
  }
};
