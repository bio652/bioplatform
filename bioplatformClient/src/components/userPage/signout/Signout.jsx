import React, { useEffect, useState } from 'react'
import styles from "./Signout.module.css"
import RestSignupService from '../../../services/restsignup';
import { useNavigate } from 'react-router-dom';
import { useSigncontext } from '../../../contexts/SignContext';

function Signout() {
    const apiServ = new RestSignupService();
    const [out, setout] = useState(false);
    const afternavigate = useNavigate();
    const { signedview } = useSigncontext();
    useEffect(() => {
          if (out){
            afternavigate("/signup");
          }
          }, [out,afternavigate]);
    const so = () => {
        apiServ
            .signout()
            .then((response)=>{
                console.log(response.data);
                if(response.data){
                    setout(true);
                    signedview(false);
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };
  return (
    <div className={styles.signout}>
        <div className={styles.signoutname}>Sign out</div>
        <button className={styles.signoutbutton} onClick={so}>Sign out</button>
    </div>
  )
}

export default Signout