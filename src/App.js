import React, { Fragment, useState } from 'react';
import './App.css';
import Home from './components/home/Home';
import LoginAndSignup from './components/loginAndSignup/LoginAndSignup';

function App() {
  const [isLogin, setIsLogin] = useState(false);

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
