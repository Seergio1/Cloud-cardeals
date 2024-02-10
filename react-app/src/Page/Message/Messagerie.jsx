import React from 'react'
import ListeMessage from './ListeMessage/ListeMessage'
import Discussion from './Discussion/Discussion'
import Profil from './Profil/Profil'
import './Messagerie.css'
import { useNavigate } from 'react-router-dom'


function Messagerie() {
  const navigator = useNavigate();
  return <>
    <div className='box-messagerie'>
      <ListeMessage navigation={navigator} />
      <Discussion />
      <Profil />
    </div>
  </>
}

export default Messagerie