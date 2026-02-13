import axios from "axios";
class RestMainService {
  
  axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      'Content-Type': 'application/json',
  },
  });

  getStr() {
    const token = localStorage.getItem('token');
    return this.axiosInstance.get(`/get`,  {
      headers: {
          'Authorization': token ? `Bearer ${token}` : '',
      }
    });
  }
}

export default RestMainService;