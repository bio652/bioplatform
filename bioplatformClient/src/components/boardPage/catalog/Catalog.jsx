import React, { useState } from 'react'
import styles from './Catalog.module.css';
import { Link } from 'react-router-dom';
import RestBoardService from '../../../services/restboard';
import { useSigncontext } from '../../../contexts/SignContext';

function Item({ data }){
    const apiServ = new RestBoardService();
    const [bought, setb] = useState(false);
    const { signedview } = useSigncontext();
    const buynft = () => {
            console.log(data.token);
            apiServ
                .buyNft(data.token)
                .then((response)=>{
                    console.log("BOUGHT :", response.data);
                    if(response){
                        setb(true);
                        signedview(true);
                    }
                })
                .catch((error) => {
                    console.error("Error with sending: ", error);
                });
        };
    return(
        <div className={styles.itemcard}>
            <Link to={`/item/${data.token}`} className={styles.itemlink}>
            <img src={data.img} className={styles.cardimg}/>
            <div className={styles.cardname}>{data.name}</div>
            </Link>
            {bought? <div className={styles.cardbought}>Bought</div>:
                <button className={styles.cardbutton} onClick={buynft}>Buy for {data.price} biocoins</button>
            }
        </div>
    )
}

function Catalog({ data }) {
  return (
    <div className={styles.catalog}>
        {data.map((el) => (
            <Item data={el} />
        ))}
    </div>
  )
}

export default Catalog