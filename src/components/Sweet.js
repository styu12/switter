import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Sweet = ({ sweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newSweet, setNewSweet] = useState(sweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure to delete this sweet?");
        if(ok) {
            await dbService.doc(`Sweets/${sweetObj.id}`).delete();
            await storageService.refFromURL(sweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    } 

    const onChange = (event) => {
        const {target: {value}} = event;
        setNewSweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`Sweets/${sweetObj.id}`).update({
            text: newSweet
        });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} placeholder="Edit your sweet" value={newSweet} required />
                        <input type="submit" value="Edit Sweet!" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{sweetObj.text}</h4>
                    {sweetObj.attachmentUrl && <img alt={sweetObj.text} src={sweetObj.attachmentUrl} width="70px" height="70px" />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
};

export default Sweet;