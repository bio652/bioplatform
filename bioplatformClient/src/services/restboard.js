import axios from "axios";

class RestBoardService {
    axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api/platform",
        headers: {
          'Content-Type': 'application/json',
      },
    });

    getCatalog(filters){
        const token = localStorage.getItem('token');
        return this.axiosInstance.post(`/getcatalog`, filters,{
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }

    getItem(itemtoken){
        const token = localStorage.getItem('token');
        return this.axiosInstance.get(`/getitem/${itemtoken}`,  {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }

    getInventory(){
        const token = localStorage.getItem('token');
        return this.axiosInstance.get(`/getinv`,  {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }

    buyNft(nft){
        const token = localStorage.getItem('token');
        return this.axiosInstance.put(`/buynft`, {nfttoken: nft}, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }

    putonsale(data){
        const token = localStorage.getItem('token');
        console.log(data);
        return this.axiosInstance.put(`/putonsale`, data, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }
    putoutsale(data){
        const token = localStorage.getItem('token');
        console.log(data);
        return this.axiosInstance.put(`/putoutsale`, data, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }

    createnft(data){
        const token = localStorage.getItem('token');
        console.log(data);
        return this.axiosInstance.post(`/createnft`, data, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            }
        });
    }

    async isImageUrl(url) {
        try {
            const response = await axios.head(url);
            const contentType = response.headers['content-type'];
            return contentType.startsWith('image/'); 
        } catch (error) {
            return false;
        }
    }

    getrandomnft(){
        return this.axiosInstance.get(`/getrand`);
    }
}

export default RestBoardService;