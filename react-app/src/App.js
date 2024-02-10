
import './App.css';
import './assets/css/index.css';




import { Routes, Route, Link } from "react-router-dom";

import { useState } from 'react';


import Home from './Page/Home';


import Login from './Page/Login';
import Detail from './Composant/jsx/Detail';
import Statistique from './Composant/jsx/Statistique';



function App() {

  return (

    <>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/stat' element={<Statistique />} />
      </Routes>


    </>
  )
}

export default App;
