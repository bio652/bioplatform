import React, { useEffect, useState } from 'react'
import styles from './mainHeader.module.css';
import { Link } from 'react-router-dom';
import RestUserService from '../../services/restuser';

import UserPagelink from './userpagelink/UserPagelink';
import Signuplink from './signuplink/Signuplink';
import { useSigncontext } from '../../contexts/SignContext';

function MainHeader() {
  const apiServ = new RestUserService();

  const [isauth, setauth] = useState(false);
  const [userdata, setuserdata] = useState({});
  const { changesignedRef } = useSigncontext();

  const getUserdata = () => {
    apiServ
      .getUserData()
      .then((response)=>{
        const fetched = response.data;
        console.log("fetched: ", fetched);
        setuserdata(fetched);
        setauth(true);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    changesignedRef.current = (isSigned)=>{
      if (!isSigned) {
        setauth(false);
        setuserdata({});
      }else{
        changeView();
      }
    };
    return () => {
      changesignedRef.current = null;
    };
  }, [changesignedRef]);

  useEffect(() => {
      getUserdata();
  }, []);

  const changeView = () => {
    getUserdata();
  };

  return (
    <div className={styles.mainHeader}>
        <div className={styles.prname}>Bioplatform.</div>
        <nav className={styles.mainnav}>
          <Link to={"/homepage"} className={styles.pagelink}>Homepage</Link>
          <Link to={"/board"} className={styles.pagelink}>NFT Board</Link>
        </nav>
        {isauth? (<UserPagelink data={userdata} />):(<Signuplink></Signuplink>)}
    </div>
  )
}

export default MainHeader