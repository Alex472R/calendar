import React, {useState} from 'react';
import './App.css';

import MainPage from "./layots/MainPage/MainPage";
import Header from "./components/Header/Header";

function App() {

  const [isLogin, setIsLogin] = useState(localStorage.getItem('token') ? true : false)

  return (
    <div className="App">
      <Header/>
      <MainPage/>
    </div>
  );
}

export default App;
