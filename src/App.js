import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Home from './components/home/Home';
import LoginAndSignup from './components/loginAndSignup/LoginAndSignup';
import { getUserDetails, userLogOut, userSignupAndLogin } from './apis';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userHomeDetails, setUserHomeDetails] = useState({});
  let monthId = 28;

  useEffect(() => {
    if(Object.keys(userHomeDetails).length === 0) {
      getUserDetails(setUserHomeDetails, monthId, setIsLogin);
    }
  },[]);

  const onFunction = (identifier) => {
      switch (identifier){
        case "register":
            userSignupAndLogin(userHomeDetails, setIsLogin, "signup");
            break;
        case "login":
            userSignupAndLogin(userHomeDetails, setIsLogin, "login", setUserHomeDetails, monthId);
            break;
        case "logout":
            userLogOut(setUserHomeDetails, setIsLogin);
            break;
      }
    
  };

  return (
    <div className="App">
      {!isLogin ?
        <LoginAndSignup setIsLogin={setIsLogin} userDetails={userHomeDetails} setUserDetails={setUserHomeDetails} onFunction={onFunction} />
        :
        <Home userHomeDetails={userHomeDetails} onLogOut={onFunction} />
      }
    </div>
  );
}

export default App;
