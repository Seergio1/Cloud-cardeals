
import './App.css';
import './assets/css/index.css';




import { Routes, Route, Link } from "react-router-dom";

import { useState } from 'react';
import Messagerie from './Page/Message/Messagerie';
import { SignIn } from './Page/Sign/Sign';
import Home from './Page/Home/home';
import DetailAnnonce from './Page/DetailAnnonce/DetailAnnonce';



function App() {

  return (

    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/message' element={<Messagerie />} />
        <Route path='/detail' element={<DetailAnnonce />} />
      </Routes>
    </>
  )
}

export default App;
