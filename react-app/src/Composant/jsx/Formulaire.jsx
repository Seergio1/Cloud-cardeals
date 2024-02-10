import React from 'react'
import { ButtonP, InputP, SelectP } from './Input'
import './../css/Formulaire.css'
import { useState } from 'react';
import { FetchSpecPOST } from '../../Fetch';


function parseCustomDateString(inputDateString) {
    // Split the input string into date and time parts
    const [datePart, timePart] = inputDateString.split(' ');
  
    // Extract day, month, and year from the date part
    const [day, month, year] = datePart.split('/');
  
    // Extract hours, minutes, and seconds from the time part
    const [hours, minutes, seconds] = timePart.split(':');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
export function FormulaireUpdate({titre,type,dataMagasin,dataArticle,idM,quantity,price,id_article,id_magasin,date}) {
    const handleChange = (e)=>{
        const {name,value} = e.target;
    };
    const [valueSelect1,setValueSelect1] = useState(id_article);
    const [valueSelect2,setValueSelect2] = useState(id_magasin);
    const [valueSelect3,setValueSelect3] = useState(type);
    // const handleDateChange = (event) => {
    //     // Mettez à jour l'état avec la nouvelle valeur du champ
    //     setSelectedDate(event.target.value);
    //   };
    const handleSubmit = (e)=>{
        e.preventDefault();
        // let dateN = formatDate({date:e.target.querySelector(".dateN").value});
        let quantite = e.target.querySelector(".quantite").value;
        let id_article = valueSelect1;
        let id_magasin = valueSelect2;
        let direction = valueSelect3;
        let mouvement = null;

        if (type==="in") {
            let prixUnitaire = e.target.querySelector(".prixUnitaire").value;
            
            mouvement = {
                id:idM,
                status_direction : direction,
                article : {
                    id : id_article
                },
                quantity : quantite,
                price_unity : prixUnitaire,
                date : date,
                magasin : {
                    id : id_magasin
                },
                etat: 20
            }
        }else{
            mouvement = {
                id:idM,
                status_direction : direction,
                article : {
                    id : id_article
                },
                quantity : quantite,
                date : date,
                magasin : {
                    id : id_magasin
                },
                etat: 20
            }
        }
        console.log(mouvement);
        FetchSpecPOST({path:"/mouvement/updateMouvInvalidate",method:"PUT",requestBody:mouvement});
    }
    // const [selectedDate, setSelectedDate] = useState(() => {
    //     const currentDate = new Date();
    //     const date_intermediaire = currentDate.toLocaleString(); // Utilisez .slice(0, 16) pour obtenir YYYY-MM-DDTHH:mm
    //     return parseCustomDateString(date_intermediaire);
    //   });
    
    const dataMethodSelect = [
        {id:"out",name:"out"},
        {id:"in",name:"in"}
    ]

     
      
    return <>
         <div className='box-formulaire update'>
        <div className='form-header'>
            <div className='from-header-text'>{titre}</div>
        </div>
        <form className='formP' onSubmit={handleSubmit}>
            <div className='first-part'>
                {/* <InputP value={selectedDate} type={"datetime-local"} label={"Date"} classN={"inputForm dateN"} fonction={handleDateChange}/> */}
                <ButtonP Texte={"Valider"} classN={"btn-form"}/>
            </div>
            <div className='second-part'>
                <InputP value={quantity} type={"text"} label={"Quantité"} classN={"inputForm quantite"} fonction={handleChange}/>
                {type==="in"?<InputP value={price} type={"text"} label={"Prix"} classN={"inputForm prixUnitaire"} fonction={handleChange}/>:null}
                <SelectP setValueSelect={setValueSelect1} defaut={"Article"} label={"Article"} idN={"selectForm"} data={dataArticle}/>
                <SelectP setValueSelect={setValueSelect2} defaut={"Magasin"} label={"Magasin"} idN={"selectForm"} data={dataMagasin}/>
                <SelectP setValueSelect3={setValueSelect3} defaut={"Type"} label={"Type"} idN={"selectForm"} data={dataMethodSelect}/>
            </div>
        </form>
    </div>
    </>
}

export function Formulaire({titre,type,dataMagasin,dataArticle}) {
    const [valueSelect1,setValueSelect1] = useState(null);
    const [valueSelect2,setValueSelect2] = useState(null);
    // Initialisez l'état avec la date et l'heure actuelles
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    const date_intermediaire = currentDate.toLocaleString(); // Utilisez .slice(0, 16) pour obtenir YYYY-MM-DDTHH:mm
    return parseCustomDateString(date_intermediaire);
  });
  
    const handleSubmit = (e)=>{
        e.preventDefault();
        let dateN = e.target.querySelector(".dateN").value;
        let quantite = e.target.querySelector(".quantite").value;
        let id_article = valueSelect1;
        let id_magasin = valueSelect2;

        let mouvement = null;
        
        

        if (type==="in") {
            let prixUnitaire = e.target.querySelector(".prixUnitaire").value;
            
            mouvement = {
                status_direction : "in",
                article : {
                    id : id_article
                },
                quantity : quantite,
                price_unity : prixUnitaire,
                date : dateN,
                magasin : {
                    id : id_magasin
                },
                etat: 20
            }
        }else{
            mouvement = {
                status_direction : "out",
                article : {
                    id : id_article
                },
                quantity : quantite,
                date : dateN,
                magasin : {
                    id : id_magasin
                },
                etat: 20
            }
        }

        // console.log(mouvement);

        FetchSpecPOST({path:"/mouvement/addMouvement",method:"POST",requestBody:mouvement});
       
    };  

    const handleChange = (e)=>{
        const {name,value} = e.target;
    };
    const handleDateChange = (event) => {
        // Mettez à jour l'état avec la nouvelle valeur du champ
        setSelectedDate(event.target.value);
      };
    
  return <>
    <div className='box-formulaire'>
        <div className='form-header'>
            <div className='from-header-text'>{titre}</div>
        </div>
        <form className='formP' onSubmit={handleSubmit}>
            <div className='first-part'>
                <InputP value={selectedDate} type={"datetime-local"} label={"Date"} classN={"inputForm dateN"} fonction={handleDateChange}/>
                <ButtonP Texte={"Valider"} classN={"btn-form"}/>
            </div>
            <div className='second-part'>
                <InputP type={"text"} label={"Quantité"} classN={"inputForm quantite"} fonction={handleChange}/>
                {type==="in"?<InputP type={"text"} label={"Prix"} classN={"inputForm prixUnitaire"} fonction={handleChange}/>:null}
                <SelectP setValueSelect={setValueSelect1} defaut={"Article"} label={"Article"} idN={"selectForm"} data={dataArticle}/>
                <SelectP setValueSelect={setValueSelect2} defaut={"Magasin"} label={"Magasin"} idN={"selectForm"} data={dataMagasin}/>
            </div>
        </form>
    </div>
  </>
}

export function FormulaireChoix({titre,idChoix,dataChoix}) {
    const [valueSelect1,setValueSelect1] = useState(null);  
    const [dataSelect1,setDataSelect1] = useState(titre)

    const [valueSelect2,setValueSelect2] = useState(null);  
    const [dataSelect2,setDataSelect2] = useState("true");

    const dataAll = [
        {name:"true",id:"true"},
        {name:"false",id:"false"}
    ]

    const handleSubmit = (e)=>{
        e.preventDefault();
        let idC = idChoix;
        let id_Select1 = valueSelect1;
        let allSelect = valueSelect2

        console.log(idC);
        console.log(id_Select1);
        console.log(allSelect);
        
        localStorage.setItem("filtre",idC)
        // localStorage.setItem("data",data);
        // window.location = "/Resultat";
    };  
    const handleChange = (e)=>{
        const {name,value} = e.target;
    };
    
  return <>
 
    <div className='box-formulaire' id='box-form'>
        <div className='form-header'>
            <div className='from-header-text'>{titre}</div>
        </div>
        <form className='formP' onSubmit={handleSubmit}>
            <div className='second-part'>
                <SelectP setDataSelect={setDataSelect1} setValueSelect={setValueSelect1} defaut={dataSelect1} label={titre} idN={"selectForm"} data={dataChoix}/>
                <SelectP setDataSelect={setDataSelect2} setValueSelect={setValueSelect2} defaut={dataSelect2} label={"Afficher tous"} idN={"selectForm"} data={dataAll}/>
                <ButtonP Texte={"Valider"} classN={"btn-form"}/>
            </div>
        </form>
    </div>
  </>
}

