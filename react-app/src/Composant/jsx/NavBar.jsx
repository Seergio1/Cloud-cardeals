import React from 'react'
import { useState } from 'react';
import './../css/NavBar.css'
import { useNavigate } from 'react-router-dom';
import { Token } from '@mui/icons-material';

function NavBar({ setPage }) {
  const [activeText, setActiveText] = useState(0);
  const [navIcon, setNavIcon] = useState("");
  // const navData = [{ text: 'Home' }, { text: 'Car Catalogue' }, { text: 'Message' }];
  let navData = [];
  if (localStorage.getItem("token") == null) {
    navData = [{ text: 'Home' }, { text: 'Car Catalogue' }, { text: 'Message' }]
  } else {
    navData = [{ text: 'Home' }, { text: 'Car Catalogue' }]
  }
  const navigate = useNavigate();
  return <>
    <div className='nav-box-container'>
      <nav>
        <div className='logo'>CARDEALS</div>
        <div className='nav-container'>
          {navData.map((data, index) => (
            <ItemNav navigate={navigate} setP={setPage} key={index} text={data.text} index={index} setActiveText={setActiveText} activeText={activeText === index ? "activeText" : ""} setNavIcon={setNavIcon} navIcon={navIcon} />
          ))}

        </div>
        <div className='profils-container'>
          {localStorage.getItem("token") == null ? <div className='sign-in-bouton' onClick={() => {
            navigate('/signin')
          }}>Sign in</div> : 'Conncté'}

        </div>
        <div className={`icon-menu ${navIcon}`} onClick={() => {
          console.log(navIcon);
          if (navIcon === "") {
            setNavIcon("activeIcon")
          } else {
            setNavIcon("")
          }
        }}>
          <div className='menu-icon-item'></div>
          <div className='menu-icon-item'></div>
        </div>
      </nav>
      <div className={`sideBar-container ${navIcon}`}>
        {navData.map((data, index) => (

          <ItemNav navigate={navigate} setP={setPage} key={index} text={data.text} index={index} setActiveText={setActiveText} activeText={activeText === index ? "activeText" : ""} setNavIcon={setNavIcon} navIcon={navIcon} />
        ))}
      </div>
    </div>
  </>
}


function ItemNav({ navigate, text, setActiveText, activeText, setNavIcon, navIcon, index, setP }) {
  return <>
    {text === 'Message' ? <div className={`nav-item ${activeText}`} onClick={() => {
      navigate('/message')
      setActiveText(index)
      navIcon === "activeIcon" ? setNavIcon("") : setNavIcon("activeIcon")
    }}>{text}</div>
      : <div className={`nav-item ${activeText}`} onClick={() => {
        setP(index)
        setActiveText(index)
        navIcon === "activeIcon" ? setNavIcon("") : setNavIcon("activeIcon")
      }}>{text}</div>}

  </>
}

export default NavBar