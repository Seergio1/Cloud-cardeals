import React from 'react'

function Profil() {
  return <>
    <div className='profil-container'>

      <div className='profil-info'>
        <div className='user-img'></div>
        <div className='user-name'>Sergio</div>
      </div>

      <div className='detail-info'>
        <div className='detail-info-item'>
          <div className='data'>72</div>
          <div className='label'>Annonces</div>
        </div>

        <div className='detail-info-item'>
          <div className='data'>10k</div>
          <div className='label'>Vente</div>
        </div>


        <div className='detail-info-item'>
          <div className='data'>572</div>
          <div className='label'>Favoris</div>
        </div>
      </div>



    </div>
  </>
}

export default Profil