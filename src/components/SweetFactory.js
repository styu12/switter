import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SweetFactory = ({userObj}) => {

    const [sweet, setSweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const storageRef = storageService.ref();
            const attachmentRef = storageRef.child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const sweetObj = {
            text: sweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl: attachmentUrl
        }
        await dbService.collection("Sweets").add(sweetObj);
        setSweet("");
        setAttachment("");
    }
    const  onChange = (event) => {
        const {target: {value}} = event;
        setSweet(value);
    }

    const onFileChange = (event) => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
    }

    const onClearAttachment = () => setAttachment(null);

 return (
    <form onSubmit={onSubmit} action="">
        <input value={sweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && (
            <div>
                <img alt="uploading" src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
            </div>
        )}
        <input type="submit" value="Sweet" />
    </form>
 )
}

export default SweetFactory;