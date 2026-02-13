import React, { useRef, useState } from 'react'
import styles from "./Create.module.css"
import RestBoardService from '../../../services/restboard';
import { useSigncontext } from '../../../contexts/SignContext';

function Create() {
    const apiServ = new RestBoardService();
    const { signedview, changeuserpage } = useSigncontext();
    const [img, setimg] = useState("");
    const [name, setname] = useState("");
    const formRef = useRef(null);

    const clearf = () => {
        formRef.current.reset();
    };
    const simg = (e) => {
        if (apiServ.isImageUrl(e)){
            console.log(true);
            setimg(e);
        }
    };
    const senddata = () => {
        if (!name || name.length < 2) {
            alert("invalid name input");
            return;
        }
        if (!img || !apiServ.isImageUrl(img)){
            alert("invalid img");
            return;
        }
        apiServ
            .createnft({name: name, img: img})
            .then((response)=>{
                console.log(response.data);
                if(response.data){
                    clearf();
                    signedview(true);
                    changeuserpage();
                }
            })
            .catch((error) => {
                console.error("Error rest: ", error);
            });
            
    };
  return (
    <div className={styles.createcard}>
        <div className={styles.field1}>
        <form ref={formRef} className={styles.ref}>
            <input type="text" placeholder="Name" className={styles.ccin} onChange={(e)=>{setname(e.target.value)}} />
            <input type="text" placeholder='Img' className={styles.ccin} onChange={(e)=>{simg(e.target.value)}} />
        </form>
        <button className={styles.ccbut} onClick={senddata}>Create for 10 bioc.</button>
        </div>
        <div className={styles.imgfield}>
            <img className={styles.img} src={img? img : ""} />
        </div>
    </div>
  )
}

export default Create