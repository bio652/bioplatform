import React from 'react'
import styles from './Signuplink.module.css';
import { Link } from 'react-router-dom';

function Signuplink() {
  return (
    <Link to={"/signup"} className={styles.signuplink}>
        <div className={styles.smallsign}>Sign up</div>
    </Link>
  )
}

export default Signuplink