import Sweet from "components/Sweet";
import SweetFactory from "components/SweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";


 const Home = ({ userObj }) => {

    const [sweets, setSweets] = useState([]);

    useEffect(() => {
        dbService.collection("Sweets").onSnapshot((snapshot) => {
            
            const sweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setSweets(sweetArray);
        })
    }, []);
    
     return (
         <div> 
             <SweetFactory userObj={userObj} />
             <div>
                 {sweets.map(sweet => (
                     <Sweet 
                     key={sweet.id} 
                     sweetObj={sweet} 
                     isOwner={sweet.creatorId === userObj.uid} 
                     attachmentUrl={sweet.attachmentUrl}
                     />
                 ))}
             </div>
         </div>
     )
 }

 export default Home;