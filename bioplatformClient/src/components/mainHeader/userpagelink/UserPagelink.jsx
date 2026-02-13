import React, { useState } from 'react'
import styles from './UserPagelink.module.css';
import { Link } from 'react-router-dom';

function UserPagelink({ data }) {
  const [balance, setbalance] = useState(0);
  return (
    <Link to={"/userpage"} className={styles.userpagelink}>
        <div className='smalluser'>
            <div className={styles.smallname}>{data.username}</div>
            <div className={styles.smallbalance}>balance: {data.balance} biocoins</div>
        </div>
    </Link>
  )
}

export default UserPagelink