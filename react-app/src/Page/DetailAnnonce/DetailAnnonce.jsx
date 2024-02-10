import React from 'react'
import { useNavigate } from 'react-router-dom'
import './DetailAnnonce.css'

function DetailAnnonce() {
    const navigate = useNavigate()
    return <>
        <div className="back-button" onClick={() => {
            navigate('/')
        }}>BACK</div>
        <div className='box-details'>

        </div>
    </>
}

export default DetailAnnonce