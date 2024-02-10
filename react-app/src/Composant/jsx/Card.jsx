import React, { useState, useEffect } from 'react'
import Icon from './../../Icon'
import './../../assets/fontawesome-5/css/all.css'
import './../css/Card.css'
import Modal from './Modal';
import { FormulaireUpdate } from './Formulaire';
import { FetchSpecPOST } from '../../Fetch';
import { HiOutlineBookmark, HiOutlineSearch } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import Base from './../../assets/img/dev/base.png'
import FrontEnd from './../../assets/img/dev/backend.png'
import BackEnd from './../../assets/img/dev/frontend.png'


import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { SelectP } from './Input';
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

export function CardUser({ img, info1, info2 }) {

    return <>
        <div className='cardUser-container'>
            <div className='card-img'>
                <img src={Icon({ pathIcon: "user" })} alt="user" />
            </div>

            <div className='card-info-container'>
                <div className='card-info-1'>John Doe</div>
                <div className='card-info-2'>Chef-manager</div>
            </div>

            <div className='deconnexion' onClick={() => {
                localStorage.removeItem("token");
                window.location = '/'
            }}>
                <img src={Icon({ pathIcon: "deconnexion" })} alt="deconnexion" />
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



// all card annonce debut
function CardItem({ key }) {
    const navigate = useNavigate();
    return <>
        <div key={key} className='card-item-container'>
            <div className='img-card'>.</div>
            <div className='card-info-container'>
                <div className='header-card-info'>
                    <div className='favoris-item'><HiOutlineBookmark /></div>
                    <div className='header-card-item categorie'>Familial</div>
                    <div className='header-card-item nom'>Tesla Model S</div>
                    <div className='header-card-item status'>Disponible</div>
                </div>
                <div className='footer-card-info'>
                    <div className='price'>129,000 £</div>
                    <div className='detail-button' onClick={() => {
                        navigate('/detail')
                    }}>Details</div>
                </div>
            </div>
        </div>
    </>
}
function AdvanceSearch() {
    const handleSearch = (e) => {
        const { name, value } = e.target;
    }
    return <>
        <div className='box-recherche-avance'>
            <div className='search-bar-container'>
                <div className='search-bar-item'>
                    <input type="text" onChange={handleSearch} placeholder='Search...' />
                    <div className='icon-search'><HiOutlineSearch /></div>
                </div>
            </div>
            <div className='header-search'>
                <div className='text-container'>
                    <div className='titre'>Car Catalogue</div>
                    <div className='sous-titre'>Explore our cars you might like</div>
                </div>
                <div className='box-container-item-search'>
                    <SelectP defaut={"Catégorie"} />
                    <SelectP defaut={"Marque"} />
                    <SelectP defaut={"Etat"} />
                    <SelectP defaut={"Prix"} />
                </div>
            </div>
        </div>
    </>
}
export function ListeCard(params) {
    return <>
        <div className='box-list-card'>
            <AdvanceSearch />
            <div className='liste-card-container'>
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
        </div>

    </>
}
// all card annonce end


// carousel trending card debut
export function Carousel({ cards, cardsToShow }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCards = cards.length;

    const extendedCards = [...cards, ...cards.slice(0, cardsToShow)]; // Duplications pour l'effet de carrousel infini

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === totalCards ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalCards : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Avance toutes les 10 secondes
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel-container">
            <div className='titre'>Trending car</div>
            <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}>
                {extendedCards.map((card, index) => (
                    <CardItem key={index} />
                ))}
            </div>
            <button className="prev-btn" onClick={prevSlide}>&lt;</button>
            <button className="next-btn" onClick={nextSlide}>&gt;</button>
        </div>
    );
}


// carousel trending card end


// card info website debut
export function InfoWebSite({ dataWebSite }) {
    return <>
        <div className='infoWebsite-container'>
            <div className='titre'>We are offering you a large wide of high-end cars</div>
            <div className='bloc-info-container'>
                {dataWebSite.map((data, index) => (
                    <div key={index} className="bloc-info-item">
                        <div className='img-info'>{data.icon}</div>
                        <div className='title-info'>{data.titre}</div>
                        <div className='text-info'>{data.text}</div>
                    </div>
                ))}
            </div>
        </div>
    </>
}
//car info website end

//Card dev
export function CardDev({ dataWebSite }) {


    return <>
        <div className='dev-container'>
            <div className='titre'>About our developper</div>
            <Swiper
                direction={'vertical'}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div className='box-dev'>
                        <div className='card-dev-item'>
                            <img className='img' src={FrontEnd} alt="" />
                            <div className='card-dev-info'>
                                <div className='user-name'>Sergio</div>
                                <div className='user-role'>Developper Front-end</div>
                            </div>
                        </div>
                        <div className='card-dev-item'>
                            <img className='img' src={BackEnd} alt="" />
                            <div className='card-dev-info'>
                                <div className='user-name'>Heja</div>
                                <div className='user-role'>Developer Backend</div>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className='box-dev'>
                        <div className='card-dev-item'>
                            <img className='img' src={BackEnd} alt="" />
                            <div className='card-dev-info'>
                                <div className='user-name'>Ericka</div>
                                <div className='user-role'>Developper Backend</div>
                            </div>
                        </div>
                        <div className='card-dev-item'>
                            <img className='img' src={Base} alt="" />
                            <div className='card-dev-info'>
                                <div className='user-name'>Rianala</div>
                                <div className='user-role'>Conception</div>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>


            </Swiper>
        </div>
    </>
}



