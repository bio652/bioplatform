import axios from "axios";
class RestAdminService {
  
  axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/admin",
  });

  killuser(userid) {
    const token = localStorage.getItem('token');
    console.log(token);
    return this.axiosInstance.delete(`/killuser/${userid}`, {
      headers: {
          'Authorization': token ? `Bearer ${token}` : '',
      }
    });
  }

  confiscateall(userid) {
    const token = localStorage.getItem('token');
    return this.axiosInstance.get(`/confiscateuser/${userid}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
      }
    });
  }

  killnft(nft) {
    const token = localStorage.getItem('token');
    return this.axiosInstance.delete(`/killnft/${nft}`, {
      headers: {
          'Authorization': token ? `Bearer ${token}` : '',
      }
    });
  }

  confiscatenft(nft) {
    const token = localStorage.getItem('token');
    return this.axiosInstance.get(`/confiscatenft/${nft}`,{
      headers: {
          'Authorization': token ? `Bearer ${token}` : '',
      }
    });
  }
}

export default RestAdminService;