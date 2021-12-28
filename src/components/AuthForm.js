import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            if(newAccount) {
                console.log(email, password);
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        }   catch(error) {
           setError(error.message);
        }        
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <input name="email" onChange={onChange} type="text" placeholder="Email" required value={email} />
                <input name="password" onChange={onChange} type="password" placeholder="Password" required value={password} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error && <h1>{error}</h1>}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account" }</span>
        </>
    )
}

export default AuthForm;