import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMySweets = async () => {
        const sweets = await dbService
        .collection("Sweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt", "desc")
        .get();
        console.log(sweets.docs.map((doc) => doc.data()));
    }

    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
        }
        refreshUser();
    }

    useEffect(()=>{
        getMySweets();
    }, []);

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} type="text" value={newDisplayName} />
                    <input type="submit" value="Update Profile" />
                </form>
            </div>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
};

export default Profile;