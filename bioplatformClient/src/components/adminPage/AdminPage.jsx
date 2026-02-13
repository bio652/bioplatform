import React, { useState } from 'react'
import styles from './AdminPage.module.css';
import RestAdminService from '../../services/restadmin';

function AdminPage() {
    const apiServ = new RestAdminService();
    const [userid, setuserid] = useState("");
    const [nft, setnft] = useState("");

    const killuser = () => {
        if(!userid){
            alert("invalid input");
            return; 
        }
        apiServ
            .killuser(userid)
            .then((response)=>{
                if(response.data){
                    alert("success");
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };

    const confiscateall = () => {
        if(!userid){
            alert("invalid input");
            return; 
        }
        apiServ
            .confiscateall(userid)
            .then((response)=>{
                if(response.data){
                    alert("success");
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };

    const killnft = () => {
        if(!nft){
            alert("invalid input");
            return; 
        }
        apiServ
            .killnft(nft)
            .then((response)=>{
                if(response.data){
                    alert("success", response.data);
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };
    
    const confiscatenft = () => {
        if(!nft){
            alert("invalid input");
            return; 
        }
        apiServ
            .confiscatenft(nft)
            .then((response)=>{
                if(response.data){
                    alert("success");
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
    };

  return (
    <div className={styles.adminwindow}>
        <div className={styles.adminpagename}>
            Admin page.
        </div>
        <div className={styles.adminuserscard}>
            <div className={styles.adminname}>users</div>
            <input type="text" placeholder="userid" className={styles.adminin} onChange={(e)=>{setuserid(e.target.value)}}/>
            <div className={styles.butns}>
            <button className={styles.adminbut} onClick={killuser}>kill user</button>
            <button className={styles.adminbut} onClick={confiscateall}>confiscate all</button>
            </div>
        </div>
        <div className={styles.adminnftcard}>
            <div className={styles.adminname}>nfts</div>
            <input type="text" placeholder="nft token" className={styles.adminin} onChange={(e)=>{setnft(e.target.value)}} />
            <div className={styles.butns}>
            <button className={styles.adminbut} onClick={killnft}>kill nft</button>
            <button className={styles.adminbut} onClick={confiscatenft}>confiscate nft</button>
            </div>
        </div>
    </div>
  )
}

export default AdminPage