import React, { useEffect, useState } from 'react'
import './home.css'
import NavBar from '../../Composant/jsx/NavBar'
import { CardDev, Carousel, InfoWebSite, ListeCard } from '../../Composant/jsx/Card'
import { HiOutlineShoppingCart, HiOutlineSearch, HiOutlineChat } from "react-icons/hi";
import { FetchSpecGET } from '../../Fetch';
function Home() {
    // const trendingAnnonce = FetchSpecGET({ path: "/annonce/meilleur", method: "GET" });
    // const [dataTrending, setDataTrending] = useState(null);

    const tab = ["card 1", "card 1", "card 1", "card 1", "card 1"]
    const dataInfo = [
        {
            titre: "Recherche avancée",
            text: "Trouvez la voiture de vos rêves en quelques clics grâce à notre fonction de recherche avancée, offrant une sélection précise et adaptée à vos besoins.",
            icon: <HiOutlineSearch />
        }, {
            titre: "Chat entre utilisateurs",
            text: "Rejoignez notre communauté dynamique ! Notre chat entre utilisateurs vous permet de partager conseils et offres sur les voitures d'occasion.",
            icon: <HiOutlineChat />
        }, {
            titre: "Large choix de marques",
            text: "Découvrez nos marques automobiles de renom ! Avec une sélection variée, trouvez la voiture d'occasion qui vous convient.",
            icon: <HiOutlineShoppingCart />
        }
    ]
    let cardShow = tab.length;
    const [page, setPage] = useState(0);
    useEffect(() => {
        // trendingAnnonce.then((trending) => {
        //     setDataTrending(trending);
        //     console.log(trending);
        // })
    }, [])
    return <>
        <NavBar setPage={setPage} />
        {page === 0 && <HomeContent cardShow={cardShow} tab={tab} dataInfo={dataInfo} />}
        {page === 1 && <ListeCard />}

    </>

}

function HomeContent({ cardShow, tab, dataInfo }) {
    return <>
        <div style={{ '--cards-to-show': cardShow }}>
            <Carousel cards={tab} cardsToShow={cardShow} />
        </div>
        <InfoWebSite dataWebSite={dataInfo} />
        <CardDev />
    </>
}

export default Home