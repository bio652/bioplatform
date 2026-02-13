import React, { useEffect, useState } from 'react'
import styles from "./Balance.module.css"
import RestBalanceService from '../../../services/restbalance';
import { useSigncontext } from '../../../contexts/SignContext';

function Balance({ data }) {
    const [cbalance, setbalance] = useState(0);
    const { signedview } = useSigncontext();
    useEffect(()=>{
        setbalance(data.balance);
    },[data]);
    const apiServ = new RestBalanceService();
    const addCoins = () => {
        apiServ
            .addCoins()
            .then((response) => {
                if (response.data){
                    setbalance(response.data);
                    signedview(true);
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };

    
  return (
    <div className={styles.balancecard}>
        <div className={styles.balancename}>
        Your Balance:
        </div>
        <div className={styles.balancecount}>
            {cbalance} <div className={styles.balancecur}>biocoins.</div>
        </div>
        <button className={styles.balancebutton} onClick={addCoins}>Get some Biocoins</button>
    </div>
  )
}

export default Balance