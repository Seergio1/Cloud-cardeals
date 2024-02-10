import React, { useEffect, useState } from "react";
import "./../../../assets/css/style.css";
import Question from "./Question/Question";
import { Fetch } from "../../../Fetch";
import Modal from "../../jsx/Modal";

const AnnonceForm = () => {
  const critereDefaut =  Fetch({path:"/getDefaultAnnonceData",method:"GET"})

  const [questions, setQuestion] = useState([
    { id: (Math.random() * 10000).toFixed(0) ,responses:[]},
  ]);
  
  const [optionsType,setOptionsType] = useState([
    { type: "Select", id: 1 },
    { type: "Multiple Choice", id: 2 },
    { type: "Number", id: 3 },
    { type: "Text", id: 4 },
  ])

  useEffect(()=>{
    critereDefaut.then((def)=>{
      setQuestion(def.data.default_criteria)
      setOptionsType(def.data.all_questions_type)
      console.log(def);
    })
  },[])
  


 
  const addQuestions = () => {
    let newQuestion = [
      ...questions,
      { id: (Math.random() * 10000).toFixed(0) },
    ];
    setQuestion(newQuestion);
  };
  const removeQuestions = (id) => {
    let newQuestion = questions.filter((question) => question.id !== id);
    setQuestion(newQuestion);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let criteres = e.target.querySelectorAll(".critere_container");
    let critèresHello = [];
    ///
    criteres.forEach((critereBlock) => {
      let idType = critereBlock.querySelector("input[name=type_critere]").value;
      let reponses = [];
      critereBlock.querySelectorAll(".block_reponse").forEach((reponse) =>
        reponses.push({
          label: reponse.querySelector("input[name=reponse]").value,
          correct: reponse.querySelector("input[name=correct]").checked,
        })
      );
      critèresHello.push({
        label: critereBlock.querySelector("input[name=critere_name]").value,
        coeff: critereBlock.querySelector("input[name=coeff]").value,
        question_reponse: {
          type: idType, //idType
          reponses: reponses,
        },
      });
    });
    console.log(critèresHello);

    // return critèresHello;
    let data = { 
      details:(critèresHello),
      titre:"Dev-front",
      id_departement:1,
    }
    let formData = new FormData();
    formData.append("data", JSON.stringify(data));
    sendData(formData, "http://localhost:3202/insertAnnonceData");
  };
  const[closeModal,setCloseModal] = useState(true)
  const handleClose = ()=>{
    setCloseModal(!closeModal)
  }
  return <>
  
  
    <div className="container_annonce_form">
      
        
        
      <div className="title">Annonce</div>
      <form
        action="/"
        method="post"
        className="form_question"
        onSubmit={handleSubmit}
      >
        <div className="questions_container">
        {  console.log(questions)}
          {questions.map((question) => (
            <Question
            {...question}

              optionsType={optionsType}
              removeQuestion={removeQuestions}
              id={question.id}
              key={question.id}
            />
          ))}
        </div>
        <div className="details">
          <button onClick={addQuestions}>Add Question</button>
          <button>Validate</button>
        </div>
      </form>
    </div>
    
    </>
    
};

export default AnnonceForm;
const sendData = async (data, url ) => {
  let result = await fetch(url, {
    body: data,
    method: "POST",
    credentials:'include'
  }).catch((err) => {
    console.error(err);
  });
  let dataResult = await result.json();
  console.log(dataResult);
};
