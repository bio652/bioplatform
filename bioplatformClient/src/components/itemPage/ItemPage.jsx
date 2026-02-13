import React, { useEffect, useState } from 'react'
import styles from "./ItemPage.module.css"
import RestBoardService from '../../services/restboard'
import { data, useParams } from 'react-router-dom'
import { useSigncontext } from '../../contexts/SignContext';

function ItemPage() {
    const apiServ = new RestBoardService();
    const { itemtoken } = useParams();
    const [itemdata, setidata] = useState(null);
    const [bought, setb] = useState(false);
    const { signedview } = useSigncontext();
    const buynft = () => {
        console.log(itemtoken);
        apiServ
            .buyNft(itemtoken)
            .then((response)=>{
                console.log("BOUGHT :", response.data);
                if(response.data){
                    setb(true);
                    signedview(true);
                }
            })
            .catch((error) => {
                console.error("Error with sending: ", error);
            });
    };

    useEffect(() => {
        console.log("itemtoken:    ", itemtoken);
        apiServ
            .getItem(itemtoken)
            .then((response)=>{
                if(response.data){
                    console.log(response.data);
                    setidata(response.data);
                }
            })
            .catch((error) => {
                console.error("Error with getting: ", error);
            });
    }, [itemtoken]);
  return itemdata && (
    <div className={styles.itempagewindow}>
        <div className={styles.nftcard}>
            <img src={itemdata.img} className={styles.cardimg} />
            <div className={styles.nftcardname}>{itemdata.name}</div>
            <div className={styles.nftcardtoken}>NFT token: <div className={styles.infolight}>{itemdata.token}</div></div>
            <div>Owner: <div className={styles.infolight}>{itemdata.owner}</div></div>
        </div>
        <div className={styles.buyinfocard}>
            {itemdata.onSale ? (
                    bought ? (
                        <div className={styles.cardbought}>Bought</div>
                    ) : (
                    <div>
                        <div className={styles.buyinfoprice}>Price: {itemdata.price} biocoins</div>
                        <button className={styles.buyinfobutton} onClick={buynft}>Buy</button>
                    </div>
                    )
                ) : (
                    <div className={styles.notforsale}>Not for sale</div>
            )}

        </div>
    </div>
  );
}

export default ItemPage