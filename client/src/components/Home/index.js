import './index.css';
import React from 'react';
// or
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

function Home() {

  const responseGoogle = (response) => {
    console.log(response);
  }


  return (
    <div className="App">
      <header className="App-header">
        Welcome to zeroBox
      </header>
    </div>
  );
}

export default Home;
