import React, { useEffect, useState } from 'react'
import { CardUser, CardSimple, ListeCardAnnonce } from '../Composant/jsx/Card'
import './../assets/css/Home.css'

import NavBar from '../Composant/jsx/NavBar';



import { Formulaire, FormulaireBoiteVitesse, FormulaireCategorie, FormulaireCouleur, FormulaireMarque, FormulaireModele, FormulaireMoteur, FormulaireType, FormulaireUpdate } from '../Composant/jsx/Formulaire';
import { FetchSpecGET } from '../Fetch';

import { Table, TableBoites, TableCategorie, TableCouleur, TableMarque, TableModele, TableMoteur, TableType } from '../Composant/jsx/Table';

import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Toggle({ toggle, changeToggle }) {
    return <>
        <div className={`toggle-dark-mode`} onClick={changeToggle}>
            <div className={`toggle-item ${toggle}`}>{toggle}</div>
        </div>
    </>
}

function Home() {
    const [toggle, setToggle] = useState(localStorage.getItem('theme'));
    const changeToggle = () => {

        if (toggle === 'Light') {
            setToggle('Dark');
            document.documentElement.style.setProperty('--principal', '#21252b');
            document.documentElement.style.setProperty('--secondaire', '#282c34');
            document.documentElement.style.setProperty('--font', 'white');
            localStorage.setItem('theme', 'Light');
        } else {
            setToggle('Light');
            document.documentElement.style.setProperty('--principal', '#f2f2f2');
            document.documentElement.style.setProperty('--secondaire', 'white');
            document.documentElement.style.setProperty('--font', 'black');
            localStorage.setItem('theme', 'Dark');
        }
    }
    const couleurs = FetchSpecGET({ path: "/couleurs", method: "GET" });
    const carburants = FetchSpecGET({ path: "/carburants", method: "GET" });
    const moteurs = FetchSpecGET({ path: "/moteurs", method: "GET" });
    const categories = FetchSpecGET({ path: "/categories", method: "GET" });
    const modeles = FetchSpecGET({ path: "/modeles", method: "GET" });
    const marques = FetchSpecGET({ path: "/marques", method: "GET" });


    const annonces = FetchSpecGET({ path: "/annonces", method: "GET" });





    const boite_de_vitesse = FetchSpecGET({ path: "/boites_de_vitesses", method: "GET" });
    const userActuel = FetchSpecGET({ path: `/employer/email/${localStorage.getItem('token')}`, method: "GET" });

    const [dataCouleurs, setDataCouleurs] = useState(null);
    const [dataCarburants, setDataCarburants] = useState(null);
    const [dataMoteurs, setDataMoteurs] = useState(null);
    const [dataCategories, setDataCategories] = useState(null);
    const [dataModeles, setDataModeles] = useState(null);
    const [dataMarques, setDataMarques] = useState(null);
    const [dataAnnonces, setDataAnnonces] = useState(null);
    const [dataBoites, setDataBoites] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // changeToggle()
        userActuel.then((u) => {
            // console.log(c);
            setDataUser(u);
            if (u.role === "USER") {
                localStorage.removeItem('token')
                navigate('/')
            }
        })

        couleurs.then((c) => {
            // console.log(c);
            setDataCouleurs(c);
        })
        carburants.then((c) => {
            // console.log(c);
            setDataCarburants(c);
        })
        moteurs.then((c) => {
            // console.log(c);
            setDataMoteurs(c);
        })
        categories.then((c) => {
            // console.log(c);
            setDataCategories(c);
        })
        modeles.then((c) => {
            // console.log(c);
            setDataModeles(c);
        })
        marques.then((c) => {
            // console.log(c);
            setDataMarques(c);
        })
        annonces.then((c) => {
            // console.log(c);
            setDataAnnonces(c);
        })
        boite_de_vitesse.then((c) => {
            // console.log(c);
            setDataBoites(c);
        })


    }, [])


    const dataList = [
        { img: 'fas fa-search', data_1: 'UI/UX Design', data_2: 'App design' },
        { img: 'fas fa-search', data_1: 'UI/UX Design', data_2: 'App design' },
        { img: 'fas fa-search', data_1: 'UI/UX Design', data_2: 'App design' },
        { img: 'fas fa-search', data_1: 'UI/UX Design', data_2: 'App design' },
        { img: 'fas fa-search', data_1: 'UI/UX Design', data_2: 'App design' }
    ]
    const dataNav = [
        { img: '', text: 'Annonce' },
        { img: '', text: 'Marque' },
        { img: '', text: 'Modèle' },
        { img: '', text: 'Categorie' },
        { img: '', text: 'Moteur' },
        { img: '', text: 'Type' },
        { img: '', text: 'Boite de vitesse' },
        { img: '', text: 'Couleur' },
        { img: '', text: 'Statistique' },
    ]


    const dataHeader = [
        {
            text: "N °",
        }, {
            text: "Nom",
        }, {
            text: "",
        }, {
            text: "",
        }, {
            text: "",
        }
    ]

    const [page, setPage] = useState(0);


    // rehefa tsy misy token dia mivoka miverina any @login
    if (localStorage.getItem("token") == null) {
        // window.location = '/'
        navigate('/');

    }

    return <>


        <div className='home-container'>
            <div className='left-container'>
                <CardUser user={dataUser != null ? dataUser : null} />

                {/* <div className='left-item-1'>
                    <Toggle toggle={toggle} changeToggle={changeToggle} />
                </div> */}
                <div className='left-item-2'>
                    <div className='titre'>Insertion</div>
                    <div className='liste-container'>
                        <CardSimple formulaire={<FormulaireMarque titre={"Insertion marque"} setData={setDataMarques} />} titre={"Marque"} />
                        <CardSimple formulaire={<FormulaireModele titre={"Insertion modèle"} classN={"modele"} setData={setDataModeles} />} titre={"Modèle"} />
                        <CardSimple formulaire={<FormulaireCategorie setData={setDataCategories} titre={"Insertion catégorie"} />} titre={"Catégorie"} />
                        <CardSimple formulaire={<FormulaireMoteur titre={"Insertion moteur"} setData={setDataMoteurs} />} titre={"Moteur"} />
                        <CardSimple formulaire={<FormulaireType titre={"Insertion type "} setData={setDataCarburants} />} titre={"Type"} />
                        <CardSimple formulaire={<FormulaireBoiteVitesse titre={"Insertion boite de vitesse "} setData={setDataBoites} />} titre={"Boite de vitesse"} />
                        <CardSimple formulaire={<FormulaireCouleur titre={"Insertion couleur"} setData={setDataCouleurs} />} titre={"Couleur"} />
                    </div>
                </div>

            </div>

            <div className='right-container'>
                <NavBar setPage={setPage} dataNavBar={dataNav} />
                {page === 0 && <ListeCardAnnonce data={dataAnnonces != null ? dataAnnonces : null} />}
                {page === 1 && <TableMarque setData={setDataMarques} data={dataMarques != null ? dataMarques : null} dataHeader={dataHeader} />}
                {page === 2 && <TableModele setData={setDataModeles} data={dataModeles != null ? dataModeles : null} dataHeader={dataHeader} />}
                {page === 3 && <TableCategorie setData={setDataCategories} data={dataCategories != null ? dataCategories : null} dataHeader={dataHeader} />}
                {page === 4 && <TableMoteur setData={setDataMoteurs} data={dataMoteurs != null ? dataMoteurs : null} dataHeader={dataHeader} />}
                {page === 5 && <TableType setData={setDataCarburants} data={dataCarburants != null ? dataCarburants : null} dataHeader={dataHeader} />}
                {page === 6 && <TableBoites setData={setDataBoites} data={dataBoites != null ? dataBoites : null} dataHeader={dataHeader} />}
                {page === 7 && <TableCouleur setData={setDataCouleurs} data={dataCouleurs != null ? dataCouleurs : null} dataHeader={dataHeader} />}

            </div>
        </div>
    </>
}



export default Home