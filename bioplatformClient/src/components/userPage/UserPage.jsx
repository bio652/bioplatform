import React, { useEffect, useState } from 'react'
import styles from "./UserPage.module.css"
import RestUserService from '../../services/restuser';

import Inventory from './Inventory/Inventory';
import User from './User/User';
import Balance from './Balance/Balance';
import Signout from './signout/Signout';
import Create from './Create/Create';
import { useSigncontext } from '../../contexts/SignContext';

function UserPage() {
    const apiServ = new RestUserService();
    const [userdata, setuserdata] = useState({});
    const { changeuserpageRef } = useSigncontext();

    const getData = () => {
        apiServ
            .getUserData()
            .then((response) => {
                const fetched = response.data;
                setuserdata(fetched);
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    const changeView = () => {
        getData();
     };
    useEffect(() => {
        changeuserpageRef.current = ()=>{
        console.log("CUP");
        changeView();
        };
        return () => {
          changeuserpageRef.current = null;
        };
      }, [changeuserpageRef]);

  return (
    <div className={styles.userpagewindow}>
        <div className={styles.userdata}>
            <User data={userdata}></User>
            <Balance data={userdata}></Balance>
            <Signout></Signout>
        </div>
        <div className={styles.userinventory}>
            <Inventory inv={userdata.inventory}></Inventory>
        </div>
        <div className={styles.createnft}>
            <Create></Create>
        </div>
    </div>
  )
}

export default UserPage