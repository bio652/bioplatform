import React, { useEffect, useState } from 'react'
import styles from "./BoardPage.module.css"
import Catalog from './catalog/Catalog'
import RestBoardService from '../../services/restboard'
import Search from './search/Search'

function BoardPage() {
    const apiServ = new RestBoardService();
    const [filters, setf] = useState({});
    const [catalog, setcatalog] = useState([]);
    const filterchange = (newVal) => {
        setf(newVal);
    };
    useEffect(()=>{
        apiServ
            .getCatalog(filters)
            .then((response)=>{
                const data = response.data;
                console.log(data);
                if(data){
                    setcatalog(data);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    },[filters]);
  return (
    <div className={styles.boardwindow}>
        <Search changer={filterchange}></Search>
        <Catalog data={catalog}></Catalog>
    </div>
  )
}

export default BoardPage