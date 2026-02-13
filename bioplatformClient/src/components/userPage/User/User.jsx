import React from 'react'
import styles from "./User.module.css"

function User({ data }) {
  return (
    <div className={styles.usercard}>
        <div className={styles.cardusername}>
            {data.username ? data.username : "username"}
        </div>
        <div className={styles.carduserid}>
            id: {data.userid ? data.userid : "1313131"}
        </div>
        <div className={styles.carduserinvcount}>
            NFT's: {data.inventory ? data.inventory.length : "0"}
        </div>
    </div>
  )
}

export default User