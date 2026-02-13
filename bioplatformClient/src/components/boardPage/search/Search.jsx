import React, { useEffect, useState } from 'react'
import styles from "./Search.module.css"

function Search({ changer }) {
    const [name, setname] = useState("");
    const [minp, setmin] = useState(0);
    const [maxp, setmax] = useState(0);
    useEffect(() => {
      if (minp == null || isNaN(minp)) {
       setmin(0);
      }
      if (maxp == null || isNaN(maxp)) {
       setmax(0);
      }
    }, [minp, maxp]);
    const setchanger = () => {
      if(!name){
        setname("");
      }
      changer({name, minp, maxp});
    };
  return (
    <div className={styles.searchwindow}>
        <input type="text" placeholder="nft name" className={styles.searchin} onChange={(e)=>{setname(e.target.value)}}/>
        <input type="text" placeholder="minprice" className={styles.searchin} onChange={(e)=>{setmin(parseInt(e.target.value))}}/>
        <input type="text" placeholder="maxprice" className={styles.searchin} onChange={(e)=>{setmax(parseInt(e.target.value))}}/>
        <button className={styles.searchbtn} onClick={setchanger}>search</button>
    </div>
  )
}

export default Search