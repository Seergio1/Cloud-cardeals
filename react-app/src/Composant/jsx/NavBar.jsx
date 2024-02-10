import React, { useState } from 'react'
import './../css/NavBar.css'
import { useNavigate } from 'react-router-dom'

function ItemNav({ setPage, activeText, setActiveText, activeIcon, setActiveIcon, setActive, active, index, text, img }) {
  const navigate = useNavigate();
  return <>

    {index == 8 ?
      <div key={index} className='nav-item' onClick={() => {
        // setActive(index);
        // setActiveIcon(index);
        // setActiveText(index);
        // setPage(index);
        // window.location = '/stat'
        navigate('/stat');
      }}>
        {/* <div className={`icon-nav ${activeIcon}`}>
                  {img}
                </div> */}
        <div className={`text-nav ${activeText}`}>{text}</div>
        <div className={`bar-active `}></div>
      </div>
      : <div key={index} className='nav-item' onClick={() => {
        setActive(index);
        setActiveIcon(index);
        setActiveText(index);
        setPage(index);
      }}>
        {/* <div className={`icon-nav ${activeIcon}`}>
                  {img}
                </div> */}
        <div className={`text-nav ${activeText}`}>{text}</div>
        <div className={`bar-active ${active}`}></div>
      </div>}
  </>
}

function NavBar({ dataNavBar, setPage }) {
  const [active, setActive] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);
  const [activeText, setActiveText] = useState(0);
  return <>
    <div className='nav-container' >
      {dataNavBar.map((data, index) => (
        <ItemNav key={index} setPage={setPage} activeText={activeText === index ? "activeText" : ""} setActiveText={setActiveText} activeIcon={activeIcon === index ? "activeIcon" : ""} setActiveIcon={setActiveIcon} active={active === index ? "activeBar" : ""} setActive={setActive} img={data.img} index={index} text={data.text} />
      ))}

    </div>
  </>
}

export default NavBar