import axios from "axios";

class RestUserService {
    axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api/user",
        headers: {
          'Content-Type': 'application/json',
      },
    });

    getUserData(){
        const token = localStorage.getItem('token');
        return this.axiosInstance.get(`/getuserdata`,  {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            }
        });
    }

    

}

export default RestUserService;