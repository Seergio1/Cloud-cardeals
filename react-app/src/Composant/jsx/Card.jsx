import React, { useEffect, useState } from 'react'
import Icon from './../../Icon'
import './../../assets/fontawesome-5/css/all.css'
import './../css/Card.css'
import Modal from './Modal';
import { FormulaireCategorie } from './Formulaire';
import { FetchSpecGET, FetchSpecPOST } from '../../Fetch';
import { Table } from './Table'
import { useNavigate } from 'react-router-dom';





export function CardLogin({ name, src }) {
    const [open, setOpen] = useState('');
    const blur = () => {
        if (open === 'active') {
            setOpen('');
        }

    }
    return <>
        <div className='card-item'>
            <img className='ellipse' tabIndex={0} src={Icon({ pathIcon: "ellipse" })} alt="user" onBlur={blur} onClick={() => {
                if (open === '') {
                    setOpen('active');
                } else {
                    setOpen('');
                }

            }} />
            <div className='info-user'>
                <img className='imgUser' src={Icon({ pathIcon: src })} alt="user" />
                <div className='user-name'>{name}</div>
            </div>

        </div>
        <div className={`delete-recent-login ${open}`}>
            {/* <div className='triangle'>.</div> */}
            <div className='Delete-account'>Delete account</div>
        </div>
    </>
}





export function CardSimple({ titre, formulaire }) {
    // modal open/close
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }

    return <>
        {closeModal ? <Modal closer={handleClose}>{formulaire}</Modal> : ""}
        <div className='cardList-container' onClick={() => { handleClose() }}>
            {titre}
        </div>
    </>
}























export function CardUser({ user }) {
    const navigate = useNavigate();
    return <>
        <div className='cardUser-container'>
            <div className='card-img'>
                {/* <img src={Icon({ pathIcon: "user" })} alt="user" /> */}
            </div>
            {user != null ?
                <div className='card-info-container'>
                    <div className='card-info-1'>{user.email}</div>
                    <div className='card-info-2'>ADMIN</div>
                </div>
                : <div className='card-info-container'>
                    <div className='card-info-1'>User</div>
                    <div className='card-info-2'>ADMIN</div>
                </div>}


            <div className='deconnexion' onClick={() => {
                localStorage.removeItem("token");
                // window.location = '/'
                navigate('/home');
            }}>
                <img src={Icon({ pathIcon: "deconnexion" })} alt="deconnexion" />
            </div>


        </div>
    </>
}

export function CardInfoBV({ data }) {
    return <>
        <div className='info-container'>
            <div className='info-item'>
                <div className='label'>Inscrits</div>
                <div className='data'>374</div>
            </div>
            <div className='info-item'>
                <div className='label'>PV</div>
                <div className='data'>5</div>
            </div>
            <div className='info-item'>
                <div className='label'>Votants</div>
                <div className='data'>73</div>
            </div>
            <div className='info-item'>
                <div className='label'>Participation</div>
                <div className='data'>19.52 %</div>
            </div>
            <div className='info-item'>
                <div className='label'>Blancs</div>
                <div className='data'>2 (2.74 %)</div>
            </div>
            <div className='info-item'>
                <div className='label'>Nuls</div>
                <div className='data'>1 (1.37 %)</div>
            </div>
            <div className='info-item'>
                <div className='label'>Exprimés</div>
                <div className='data'>70 (95.89 %)</div>
            </div>
        </div>
    </>
}

export function CardInfoPlace({ data }) {
    return <>
        <div className='info-container'>
            <div className='info-item'>
                <div className='label'>Région</div>
                <div className='data data-info'>ANALAMANGA</div>
            </div>
            <div className='info-item'>
                <div className='label'>District</div>
                <div className='data data-info'>AMBOHIDRATRIMO</div>
            </div>
            <div className='info-item'>
                <div className='label'>Commune</div>
                <div className='data data-info'>AMBATO</div>
            </div>
            <div className='info-item'>
                <div className='label'>Fokontany</div>
                <div className='data data-info'>AMBOHIJORERY</div>
            </div>
            <div className='info-item'>
                <div className='label'>Centre de Vote</div>
                <div className='data data-info'>1101010501-EPP TSARAHONENANA</div>
            </div>
            <div className='info-item'>
                <div className='label'>Bureau de Vote</div>
                <div className='data data-info'>110101050101-EPP TSARAHONENANA S.1</div>
            </div>
        </div>
    </>
}


function CardWithImg({ imgPrincipale, secondImg, thirdImg, forthImg, index }) {
    const [imgPrincipal, setImgPrincipale] = useState(imgPrincipale);

    // modal open/close
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    return <>
        {closeModal ? <Modal closer={handleClose}>sergio</Modal> : ""}
        <div key={index} className='card-img-container'>
            <img src={imgPrincipal} alt="principale" className={`img-principale-item`} onClick={handleClose} />
            {<div className={`img-secondaire-container`}>
                <img src={imgPrincipale} alt="deuxieme" onClick={() => {
                    setImgPrincipale(imgPrincipale);
                }} className='img-secondaire-item' />
                <img src={thirdImg} alt="troisieme" onClick={() => {
                    setImgPrincipale(thirdImg);
                }} className='img-secondaire-item' />
                <img src={forthImg} alt="quatrieme" onClick={() => {
                    setImgPrincipale(forthImg);
                }} className='img-secondaire-item' />
            </div>}
        </div>
    </>
}
export function BoxCardWithImg({ imgPrincipale, secondImg, thirdImg, forthImg, index }) {

    return <>
        <div className='box-card-container'>

            <CardWithImg
                imgPrincipale={imgPrincipale}
                secondImg={secondImg}
                thirdImg={thirdImg}
                forthImg={forthImg}
                index={index}
            />
            <div className='box-info-container'>
                <div className=''></div>
            </div>


        </div>
    </>
}
function CardAnnonce({ annonce, navigate }) {
    const [dataDetail, setDataDetail] = useState(null);
    const details = FetchSpecGET({ path: `/caracteristique/voiture/${annonce.voiture.id}`, method: "GET" });
    const [allImageAnnonce, setImageAnnonce] = useState(null);
    const images = FetchSpecGET({ path: `/image/annonce/${annonce.id_annonce}`, method: "GET" });
    useEffect(() => {
        details.then((d) => {
            setDataDetail(d.id_caracteristique);
        })
        images.then((i) => {
            setImageAnnonce(i);
            // console.log(i);
        })
    }, [])




    return <>
        {annonce.voiture != null ?
            <div key={annonce.id_annonce} className='card-container'>

                <img src={allImageAnnonce != null ? allImageAnnonce[0].url : ''} alt={"carImage"} className='img' />

                <div className='card-info-container'>
                    <div className='annonce-title'>{annonce.voiture != null ? annonce.voiture.marque.nom : ''} {annonce.voiture != null ? annonce.voiture.modele.nom : ''}</div>
                    <div className='annonce-description'>
                        <div className='description-item'>
                            <span className='label'>Propriétaire  </span>
                            <span className='data'>{annonce.employer != null ? annonce.employer.lastname : ''} {annonce.employer != null ? annonce.employer.firstname : ''}</span>
                        </div>
                        <div className='description-item'>
                            <span className='label'>Etat  </span>
                            <span className='data'>{annonce.etat_annonce == 0 ? "En attente" : "Validé"}</span>
                        </div>
                        <div className='title'>Déscription</div>
                        <div className='description-text'>{annonce.description != null ? annonce.description : ''}</div>
                    </div>
                    <div className='box-button'>

                        <div className='button-detail' onClick={() => {
                            // console.log(dataDetail != null ? dataDetail : null);
                            localStorage.setItem('voiture', dataDetail != null ? dataDetail : null)
                            localStorage.setItem('idAnnonce', annonce.id_annonce);

                            navigate('/detail')
                        }}>
                            Voir
                        </div>



                    </div>
                </div>
            </div>
            : ''}

    </>
}

export function ListeCardAnnonce({ data }) {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredData, setFilteredData] = useState(data);
    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((annonce) => annonce.etat_annonce.toString() === activeFilter);
            setFilteredData(filtered);
        }
    }, [activeFilter, data]);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };



    return <>
        <div className='filter-buttons'>
            <div onClick={() => handleFilterChange('all')} >
                All
            </div>
            <div onClick={() => handleFilterChange('0')} >
                En attente
            </div>
            <div onClick={() => handleFilterChange('1')} >
                Validé
            </div>
        </div>
        <div className='box-container-annonce'>
            {filteredData != null ?
                filteredData.map((annonce) => (
                    <CardAnnonce key={annonce.id_annonce} navigate={navigate} annonce={annonce} />
                ))
                : ''}


        </div>
    </>
}




