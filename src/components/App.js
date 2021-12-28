import AppRouter from "components/Router";
import React, {useEffect, useState} from "react";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }

  return (
    <>
    { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : "Loading..."}
    <footer>&copy; Switter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
