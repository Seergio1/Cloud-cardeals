import React, { useEffect } from 'react'
import './../css/Detail.css'
import Carousel from './Carousel'
import img1 from './../../assets/img/imgFit/24-Baton.png'
import img2 from './../../assets/img/imgFit/25-table-gigogne.png'
import img3 from './../../assets/img/imgFit/26-robot-cuiseur.png'

import carburant from './../../assets/img/carburant.png'
import boite from './../../assets/img/boite.png'
import calendrier from './../../assets/img/calendrier.png'
import kilometrage from './../../assets/img/kilometrage.png'

import './../css/NavBar.css'
import { useState } from 'react'
import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { FetchSpec2, FetchSpecGET } from '../../Fetch'

function Detail() {
    const img = [img1, img2, img3]

    const voiture = localStorage.getItem('voiture');
    const idAnnonce = localStorage.getItem('idAnnonce');
    const images = FetchSpecGET({ path: `/image/annonce/${idAnnonce}`, method: "GET" });
    const [allImage, setImageAnnonce] = useState(null);
    const [annonce, setAnnonce] = useState(null);
    const dataAnnonceById = FetchSpecGET({ path: `/annonce/${idAnnonce}`, method: "GET" });

    // console.log(voiture);
    const [allDetails, setDataDetail] = useState(null);
    const details = FetchSpecGET({ path: `/caracteristique/${voiture}`, method: "GET" });

    const navigate = useNavigate();
    useEffect(() => {
        details.then((d) => {
            setDataDetail(d);
            console.log(d);
            if (d == null) {
                navigate('/home');
            }
        })
        images.then((i) => {
            setImageAnnonce(i);
            // console.log(i);
        })
        dataAnnonceById.then((a) => {
            setAnnonce(a);
            console.log(a);
        })

    }, [])


    return (
        <>

            <div className='back'>
                <div className='icon' onClick={() => {
                    navigate('/home')
                }}> <LiaArrowLeftSolid /> </div>
                <div>Details</div>
            </div>
            {voiture != null ?
                allDetails != null ?
                    <div className='detail-container'>
                        <div className='detail-header'>
                            <Carousel images={allImage} />
                            <div className='detail-content'>
                                <div className='all-detail-container'>
                                    <div className='title'>Détails du vehicule</div>
                                    <div className='container-all-data-detail'>
                                        <div className='all-detail-left'>
                                            <div className='item-detail'>
                                                <div className='labele'>Marque :</div>
                                                <div className='data'>{allDetails.voiture != null ? allDetails.voiture.marque.nom : ''}</div>
                                            </div>
                                            <div className='item-detail'>
                                                <div className='labele'>Couleur :</div>
                                                <div className='data'>{allDetails.couleur != null ? allDetails.couleur.nom : ''}</div>
                                            </div>
                                            <div className='item-detail'>
                                                <div className='labele'>Modèle :</div>
                                                <div className='data'>{allDetails.voiture != null ? allDetails.voiture.modele.nom : ''}</div>
                                            </div>
                                        </div>
                                        <div className='all-detail-right'>
                                            <div className='item-detail'>
                                                <div className='labele'>Carburant :</div>
                                                <div className='data'>{allDetails.carburant != null ? allDetails.carburant.nom : ''}</div>
                                            </div>
                                            <div className='item-detail'>
                                                <div className='labele'>Année :</div>
                                                <div className='data'>{allDetails.annee}</div>
                                            </div>
                                            <div className='item-detail'>
                                                <div className='labele'>Kilometrage :</div>
                                                <div className='data'>{allDetails.kilometrage}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='detail-container-text'>
                                    <div className='title'>A propos de ce vehicule</div>
                                    <div className='box-data-description'>
                                        {annonce != null ? annonce.description : ''}
                                        {/* Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Esse iure non eaque? Tenetur, quas.
                                    Rerum omnis culpa tempore sit officiis?Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Esse iure non eaque? Tenetur, quas.
                                    Rerum omnis culpa tempore sit officiis?Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Esse iure non eaque? Tenetur, quas.
                                    Rerum omnis culpa tempore sit officiis?Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Esse iure non eaque? Tenetur, quas.
                                    Rerum omnis culpa tempore sit officiis? */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='detail-action'>
                            <div className='detail-action-container'>
                                <div className='detail-action-header'>
                                    <div className='detail-action-text'>
                                        <div className='title1'>{allDetails.voiture != null ? allDetails.voiture.marque.nom : ''}</div>
                                        <div className='title2'>{allDetails.voiture != null ? allDetails.voiture.modele.nom : ''}</div>
                                    </div>
                                    <div className='detail-action-item-container'>
                                        <div className='detail-action-item'>
                                            <img src={carburant} alt="carburant" />
                                            <div className='text'>{allDetails.carburant != null ? allDetails.carburant.nom : ''}</div>
                                        </div>
                                        <div className='detail-action-item'>
                                            <img src={boite} alt="boite de vitesse" />
                                            <div className='text'>{allDetails.boite_de_vitesse != null ? allDetails.boite_de_vitesse.nom : ''}</div>
                                        </div>
                                        <div className='detail-action-item'>
                                            <img src={calendrier} alt="année" />
                                            <div className='text'>{allDetails.annee}</div>
                                        </div>
                                        <div className='detail-action-item'>
                                            <img src={kilometrage} alt="kilometrage" />
                                            <div className='text'>{allDetails.kilometrage}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='detail-prix-container'>
                                    <div className='prix-total-container'>
                                        {allDetails.voiture != null ? allDetails.voiture.prix : ''} $
                                    </div>
                                    <div className='commission-container'>
                                        <div className='labele'>Commission comprise de</div>
                                        <div className='data'>
                                            <span>10</span>
                                            <span>%</span>
                                        </div>
                                    </div>
                                </div>
                                {annonce != null ?
                                    annonce.etat_annonce == 0 ?
                                        <div className='button-container' onClick={() => {
                                            FetchSpec2({ path: `/annonce/valider/${idAnnonce}`, method: "PUT" }).then((data) => {
                                                // window.location('./home');
                                                navigate('/home')
                                            });
                                        }}>Valider</div>
                                        : ''
                                    : ''}

                            </div>

                        </div>



                    </div>
                    : ''
                : ''}



        </>
    )
}

export default Detail


