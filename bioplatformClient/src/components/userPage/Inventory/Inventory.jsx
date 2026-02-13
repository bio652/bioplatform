import React, { useEffect, useState } from 'react'
import styles from "./Inventory.module.css"
import { Link } from 'react-router-dom';
import RestBoardService from '../../../services/restboard';

function Inventory({inv}) {
    const apiServ = new RestBoardService();
    const [items, setitems] = useState([]);
    useEffect(() => {
        console.log("EFFECT ON INVEN", inv)
            if(!inv || inv.length < 1){
                console.log("inv < 1");
                return
            }
            apiServ
                .getInventory()
                .then((response) => {
                    const fetched = response.data;
                    console.log("fetched: ", fetched);
                    setitems(fetched);
                })
                .catch((error) => {
                    console.error("Error rest: ", error);
                });
        }, [inv]);
  return (
    <div className={styles.invwind}>
        {items.length > 0 ? (
        items.map((el) => <Item key={el.id} data={el} />)
      ) : (
        <div className={styles.nullinv}>No NFTs</div>
      )}
    </div>
  )
}

function Item({ data }){
    const apiServ = new RestBoardService();
    const [os, setos] = useState(data.onSale);
    const [newprice, setnp] = useState(0);
    const [curprice, setcur] = useState(data.price);
    const sell = () => {
        let price = newprice;
        if(!price) {
            setnp(0);
            price =  data.price;
            console.log("no ", price, data.price);
        };
        if(price < 0 && price > 1000){
            alert("unable price(0<x<1000)");
            return;
        }
        console.log("apiserv");
        setcur(price);
        apiServ
            .putonsale({ nfttoken: data.token, newprice: price})
            .then((response) => {
                console.log("put on sale: ", response.data);
                if (response.data) {
                    setos(true);
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };

    const takeoff = () => {
        apiServ
            .putoutsale({ nfttoken: data.token})
            .then((response) => {
                console.log("put out sale: ", response.data);
                if (response.data) {
                    setos(false);
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };

    return(
        <div className={styles.itemcard}>
            <Link to={`/item/${data.token}`} className={styles.itemlink}>
            <img src={data.img} className={styles.cardimg}/>
            <div className={styles.cardname}>{data.name}</div>
            </Link>
            {os? <>
            <div className={styles.cardprice}>price: {curprice} bioc.</div>
            <button className={styles.cardtobutton} onClick={takeoff}>Take off</button>
            </> : <>
            <input type="text" placeholder={data.price} className={styles.cardprin} onChange={(e)=>{setnp(parseInt(e.target.value))}}/>
            <button className={styles.cardbutton} onClick={sell}>Sell</button>
            </>}
        </div>
    )
}

export default Inventory