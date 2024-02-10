import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LiaArrowLeftSolid } from "react-icons/lia";
import { Bar } from 'react-chartjs-2';
import { FetchSpecGET } from '../../Fetch';
import './../css/Stat.css'
import { TableStat } from './Table';
import 'chart.js/auto';


function BestAnnonceComponent({ data }) {

    const dataHeader = [
        {
            text: "Utilisateur",
        }, {
            text: "Voiture",
        }, {
            text: "Matricule",
        }, {
            text: "Prix",
        }, {
            text: "Mise en favoris",
        }
    ]
    return <>
        <TableStat data={data} dataHeader={dataHeader} />
    </>
}
function BestVenteComponent({ param }) {
    let barChartData = [];

    if (param != null) {
        barChartData = param.map((item) => ({
            vendeurNom: `${item.vendeur.firstname} ${item.vendeur.lastname}`,
            nombreVentes: item.nombreVentes,
        }));
    }

    const colors = ['rgba(75,192,192,0.2)', 'rgba(255,99,132,0.2)', 'rgba(255,205,86,0.2)'];

    const data = {
        labels: barChartData.map(item => item.vendeurNom),
        datasets: [{
            label: 'Nombre de Ventes',
            data: barChartData.map(item => item.nombreVentes),
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
        }],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
}


function Statistique() {
    const navigate = useNavigate();
    const bestAnnonce = FetchSpecGET({ path: "/annonce/meilleure", method: "GET" });
    const [databestannonce, setBestAnnonce] = useState(null);

    const bestVente = FetchSpecGET({ path: "/vente/meilleurvendeur", method: "GET" });
    const [databestvente, setBestVente] = useState(null);


    useEffect(() => {
        bestAnnonce.then((best) => {
            setBestAnnonce(best);
            // console.log(best);
        })

        bestVente.then((best) => {
            setBestVente(best);
            // console.log(best);
        })

    }, [])

    return <>
        <div className='back'>
            <div className='icon' onClick={() => {
                navigate('/home')
            }}> <LiaArrowLeftSolid /> </div>
            <div>Statistique</div>
        </div>
        <div className='stat-container'>
            <div className='stat-item bestannonce '>
                <div className='title'>Top 3 des meilleures annonces</div>
                <BestAnnonceComponent data={databestannonce != null ? databestannonce : null} />
            </div>
            <div className='stat-item bestVente'>
                <div className='title'>Top 3 des meilleures vendeurs</div>
                <BestVenteComponent param={databestvente != null ? databestvente : null} />
            </div>
        </div>
    </>
}

export default Statistique