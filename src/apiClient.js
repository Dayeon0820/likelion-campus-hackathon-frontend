// src/apiClient.js
import axios from 'axios';

const apiClient = async (url, options) => {
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw new Error(error.response?.data?.error || 'API 요청 실패');
  }
};

export default apiClient;
