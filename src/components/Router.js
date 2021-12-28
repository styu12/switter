import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigator userObj={userObj} refreshUser={refreshUser} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObj={userObj} refreshUser={refreshUser} />}>
                        </Route>
                        <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}>
                        </Route>
                    </>
                )
                 : (
                    <Route exact path="/" element={<Auth />}>
                    </Route>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;