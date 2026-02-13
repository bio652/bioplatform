import axios from "axios";

class RestSignupService {
  axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/user",
  });

  sendsudata(data) {
    console.log("data in serv: ",data)
    return this.axiosInstance.post(`/signup`, data,  {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  }

  signout(){
    console.log("signout called");
    const token = localStorage.getItem('token');
    localStorage.removeItem("token");
    return this.axiosInstance.get(`/signout`,  {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      }
    });
  }
}

export default RestSignupService;