import React, { useState,useEffect } from 'react'
import './../../assets/fontawesome-5/css/all.css'
import './../css/Table.css'
import {ButtonP, InputP,SelectP} from './Input' 
import { FetchSpecPOST } from '../../Fetch'
function HeaderItem({data,index}) {
    return <>
    <div key={index} className='headerItem-container'>
        <div className='headerItem-text'>{data.text}</div>
        {/* <i className='fas fa-sort'></i> */}
    </div>
    </>
}
const formatDate = ({dateString}) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()+20).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };
  function parseCustomDateString(inputDateString) {
    // Split the input string into date and time parts
    const [datePart, timePart] = inputDateString.split(' ');
  
    // Extract day, month, and year from the date part
    const [year, month, day] = datePart.split('/');
  
    // Extract hours, minutes, and seconds from the time part
    const [hours, minutes, seconds] = timePart.split(':');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
function Filtre({setDateFirst,setDateSecond,setDataEtatStock,dataEtatStock,dataArticle,dataMagasin}) {
    const [valueSelect1,setValueSelect1] = useState(null);
    const [valueSelect2,setValueSelect2] = useState(null);
   

    const allDataEtatStock = null;
    const handleChange = (e)=>{
        const {name, value} = e.target;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let dateFirst = e.target.querySelector(".dateFirst").value;
        let dateSecond = e.target.querySelector(".dateSecond").value;
        setDateFirst(dateFirst);
        setDateSecond(dateSecond);
        let article = valueSelect1;
        let magasin = valueSelect2;
        let objEtatStock = null;
        const allDataEtatStock = null;


        if(article ==null){
            
            objEtatStock = {
                id_magasin:magasin,
                date_first:parseCustomDateString(formatDate({dateString:dateFirst})),
                date_second:parseCustomDateString(formatDate({dateString:dateSecond}))
            }
            FetchSpecPOST({path:"/etat_stock/getEtatStockByMagasin",method:"POST",requestBody:objEtatStock}).then((data)=>{
                console.log(data);
                setDataEtatStock(data);
            })
        }else{
            objEtatStock = {
                id_article:article,
                id_magasin:magasin,
                date_first:parseCustomDateString(formatDate({dateString:dateFirst})),
                date_second:parseCustomDateString(formatDate({dateString:dateSecond}))
            }
            FetchSpecPOST({path:"/etat_stock/getEtatStockByArticleAndMagasin",method:"POST",requestBody:objEtatStock}).then((data)=>{
                console.log(data);
                setDataEtatStock(data);
            })
        }
        console.log(objEtatStock);
    }
    // useEffect(()=>{
    //     allDataEtatStock.then((etat_stock)=>{
    //         console.log(etat_stock);
    //         setDataEtatStock(etat_stock);
    //     })
    // },[])
    return <>
    
        <form onSubmit={handleSubmit} className='filtre-container'>
            <InputP type={"datetime-local"} label={"First date"} classN={"filtre-item dateFirst"} fonction={handleChange}/>
            <InputP type={"datetime-local"} label={"Second date"} classN={"filtre-item dateSecond"} fonction={handleChange}/>
            <SelectP setValueSelect={setValueSelect1} defaut={"Article"} label={"Article"} idN={"filtre-item"} data={dataArticle}/>
            <SelectP setValueSelect={setValueSelect2} defaut={"Article"} label={"Magasin"} idN={"filtre-item"} data={dataMagasin}/>
            <ButtonP Texte={"Valider"} classN={"btn-filtre"}/>
        </form>
    
    </>
}

export function Table({dataHeader,dataTable,dataArticle,dataMagasin}) {
    const [dataEtatStock,setDataEtatStock] = useState(null);
    const [dateFirst,setDateFirst] = useState(null);
    const [dateSecond,setDateSecond] = useState(null);
  return <>
    <Filtre setDateFirst={setDateFirst} setDateSecond={setDateSecond} dataEtatStock={dataEtatStock} setDataEtatStock={setDataEtatStock} dataArticle={dataArticle} dataMagasin={dataMagasin}/>
    <div className='box-table'>

        <div className='table-header'>
            {dataHeader.map((text,index)=>(
                <HeaderItem index={index} data={text}/>
            ))}
        </div>

        <div className='table-container'>
           {dataEtatStock!=null?
           dataEtatStock.map((data,index)=>(
                  <div key={index} className='tableRow'> 
                  
                    
                        <div key={index} className='tableColumn'>{data.etat_debut.date}</div>
                        <div className='tableColumn'>{data.etat_debut.price}</div>
                        <div className='tableColumn'>{data.etat_debut.quantity}</div>
                        <div className='tableColumn'>{data.etat_fin.date}</div>
                        <div className='tableColumn'>{data.etat_fin.price}</div>
                        <div className='tableColumn'>{data.etat_fin.quantity}</div>
                  
                  </div>
                )):null}
           
            
        </div>

    </div>
  </>
}

export function TableVote({dataHeader,dataTable,dataArticle,dataMagasin}) {
    const [dataEtatStock,setDataEtatStock] = useState(null);
   
  return <>
    {/* <Filtre setDateFirst={setDateFirst} setDateSecond={setDateSecond} dataEtatStock={dataEtatStock} setDataEtatStock={setDataEtatStock} dataArticle={dataArticle} dataMagasin={dataMagasin}/> */}
    <div className='box-table'>

        <div className='table-header'>
            {dataHeader.map((text,index)=>(
                <HeaderItem index={index} data={text}/>
            ))}
        </div>

        <div className='table-container'>
           {dataTable!=null?
           dataTable.map((data,index)=>(
                  <div key={index} className='tableRow'> 
                  
                    
                        <div key={index} className='tableColumn'>{}</div>
                        <div className='tableColumn'>{}</div>
                        <div className='tableColumn'>{}</div>
                        <div className='tableColumn'>{}</div>
                        <div className='tableColumn'>{}</div>
                  </div>
                )):null}
           
            
        </div>

    </div>
  </>
}
