import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Home from './components/home/Home';
import LoginAndSignup from './components/loginAndSignup/LoginAndSignup';
import { getUserDetails } from './apis';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userHomeDetails, setUserHomeDetails] = useState();

  useEffect(() => {
      // getUserDetails(setUserHomeDetails, 5);
  })

  return (
    <div className="App">
      {!isLogin ?
        <LoginAndSignup setIsLogin={setIsLogin} />
        :
        <Home />
      }
    </div>
  );
}

export default App;
