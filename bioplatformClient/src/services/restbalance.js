import axios from "axios";

class RestBalanceService {
    axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api/user",
        headers: {
          'Content-Type': 'application/json',
      },
    });

    addCoins(){
        const token = localStorage.getItem('token');
        return this.axiosInstance.get(`/addcoins`,  {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            }
        });
    }
}

export default RestBalanceService;