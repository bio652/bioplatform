import React, { useContext, useEffect, useState } from 'react'
import styles from "./SignUp.module.css"
import RestSignupService from '../../services/restsignup';
import { useSigncontext, Signprovider } from '../../contexts/SignContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const apiServ = new RestSignupService();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [iscreated, setiscr] = useState(false);
    const { signedview } = useSigncontext();
    const aftersignnavigate = useNavigate();
    useEffect(() => {
      if (iscreated){
        aftersignnavigate("/userpage");
      }
      }, [iscreated,aftersignnavigate]);
    const sendSignupdata = () => {
      if(!password || !username){
        alert("invalid input!");
        return;
    }
    const data = {username: username, password: password};
    console.log(data);
    apiServ
      .sendsudata(data)
      .then((response) => {
        const fetched = response.data;
        console.log(fetched);
        if(fetched.res){
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log('token saved!');
          }
          signedview(true);
          setiscr(fetched.res);
        }
      })
      .catch((error) => {
        console.error("Error sending: ", error);
      });      
    };
  return (
    <div className={styles.signupwindow}>
        {iscreated? (<></>):(<div>you aren't signed</div>)}
        <div className={styles.signupname}>Sign up</div>
        <input type="text" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}} className={styles.signupinput}/>
        <input type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} className={styles.signupinput}/>
        <button className={styles.signupbutton} onClick={sendSignupdata}>Sign up</button>
    </div>
  )
}

export default SignUp