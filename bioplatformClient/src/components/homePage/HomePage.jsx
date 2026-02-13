import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import RestBoardService from '../../services/restboard'

function HomePage() {
    const [nft, setnft] = useState({});
    const apiServ = new RestBoardService();
    useEffect(()=>{
      apiServ 
          .getrandomnft()
          .then((response)=>{
            if(response.data){
              setnft(response.data);
            }
          }).catch((error) => {
                console.error("Error with geting: ", error);
          });
    },[]);
  return (
    <div className={styles.homewindow}>
      <div className={styles.welcomecard}>
        <div className={styles.welcomecardh1}>Welcome to bioplatfotm!</div>
        <div className={styles.welcomecardh2}>There you can trade your nft's and make some money(no).</div>
        <div className={styles.welcomecardh3}>Sign up and go to nft board!</div>
      </div>
      <div className={styles.randomcard}>
        <div className={styles.randomcard2}>
            <div className={styles.randomcardname}>Random NFT:</div>
            <div className={styles.randomcardowner}>Owner: {nft.owner? nft.owner:"nobody"}</div>
            <div className={styles.randomcardprice}>{nft.onSale? `Price: ${nft.price} biocoins`:"Not for sale"}</div>
        </div>
        <div className={styles.nftcard}>
           <Link to={`/item/${nft.token}`} className={styles.itemlink}>
            <img src={nft.img} className={styles.cardimg} />
            <div className={styles.nftcardname}>{nft.name}</div>
            <div className={styles.nftcardtoken}>NFT token: <div className={styles.infolight}>{nft.token}</div></div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage