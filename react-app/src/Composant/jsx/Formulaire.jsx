import React from 'react'
import { ButtonP, InputP, SelectP } from './Input'
import './../css/Formulaire.css'
import { useState } from 'react';
import { FetchSpecGET, FetchSpecPOST, FetchSpecUpdate } from '../../Fetch';





export function Formulaire({ titre, dataMagasin, dataArticle }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
    };


    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' >
                <div className='first-part'>
                    <InputP type={"datetime-local"} label={"Date"} classN={"inputForm dateN"} fonction={""} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
                <div className='second-part'>
                    <InputP type={"text"} label={"Quantité"} classN={"inputForm quantite"} fonction={handleChange} />
                    <SelectP setValueSelect={[]} defaut={"Article"} label={"Article"} idN={"selectForm"} data={[]} />
                    <SelectP setValueSelect={[]} defaut={"Magasin"} label={"Magasin"} idN={"selectForm"} data={[]} />
                </div>
            </form>
        </div>
    </>
}

export function FormulaireCategorie({ titre, setData }) {



    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".categorie").value != "") {
            const categorie = {
                nom: e.target.querySelector(".categorie").value,
            }
            console.log(categorie);


            FetchSpecPOST({ path: "/categorie/create", method: "POST", requestBody: categorie }).then((data) => {
                FetchSpecGET({ path: "/categories", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }



    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Nom"} classN={"inputForm categorie"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
            </form>
        </div>
    </>
}
export function FormulaireMarque({ titre, setData }) {



    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".marque").value != "") {
            const marque = {
                nom: e.target.querySelector(".marque").value,
            }
            console.log(marque);


            FetchSpecPOST({ path: "/marque/create", method: "POST", requestBody: marque }).then((data) => {
                FetchSpecGET({ path: "/marques", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }


    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Nom"} classN={"inputForm marque"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
            </form>
        </div>
    </>
}


export function FormulaireModele({ titre, setData, classN }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".modele").value != "") {
            const modele = {
                nom: e.target.querySelector(".modele").value,
            }
            console.log(modele);


            FetchSpecPOST({ path: "/modele/create", method: "POST", requestBody: modele }).then((data) => {
                FetchSpecGET({ path: "/modeles", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }


    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Modèle"} classN={"inputForm modele"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
                {/* <div className={`second-part ${classN}`}>
                    <SelectP setValueSelect={[]} defaut={"Marque"} label={"Marque"} idN={"selectForm"} data={[]} />
                </div> */}
            </form>
        </div>
    </>
}
export function FormulaireMoteur({ titre, setData }) {



    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".moteur").value != "") {
            const moteur = {
                nom: e.target.querySelector(".moteur").value,
            }
            console.log(moteur);


            FetchSpecPOST({ path: "/moteur/create", method: "POST", requestBody: moteur }).then((data) => {
                FetchSpecGET({ path: "/moteurs", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }


    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Moteur"} classN={"inputForm moteur"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
            </form>
        </div>
    </>
}
export function FormulaireType({ titre, setData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".type").value != "") {
            const type = {
                nom: e.target.querySelector(".type").value,
            }
            console.log(type);

            FetchSpecPOST({ path: "/carburant/create", method: "POST", requestBody: type }).then((data) => {
                FetchSpecGET({ path: "/carburants", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }

    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Vitesse"} classN={"inputForm type"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
            </form>
        </div>
    </>
}
export function FormulaireBoiteVitesse({ titre, setData }) {



    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".boite").value != "") {
            const type = {
                nom: e.target.querySelector(".boite").value,
            }
            console.log(type);

            FetchSpecPOST({ path: "/boite_de_vitesse/create", method: "POST", requestBody: type }).then((data) => {
                FetchSpecGET({ path: "/boites_de_vitesses", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }


    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Boite de vitesse"} classN={"inputForm boite"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
            </form>
        </div>
    </>
}

export function FormulaireCouleur({ titre, setData }) {



    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.querySelector(".couleur").value != "") {
            const couleur = {
                nom: e.target.querySelector(".couleur").value,
            }
            console.log(couleur);

            FetchSpecPOST({ path: "/couleur/create", method: "POST", requestBody: couleur }).then((data) => {
                FetchSpecGET({ path: "/couleurs", method: "GET" }).then((data) => {
                    setData(data);
                    alert("Insertion réussi")
                })
            });
        } else {
            alert("Veuillez remplir tous les champs")
        }

    }


    return <>
        <div className='box-formulaire'>
            <div className='form-header'>
                <div className='from-header-text'>{titre}</div>
            </div>
            <form className='formP' onSubmit={handleSubmit}>
                <div className='first-part'>
                    <InputP type={"text"} label={"Couleur"} classN={"inputForm couleur"} fonction={handleChange} />
                    <ButtonP Texte={"Valider"} classN={"btn-form"} />
                </div>
            </form>
        </div>
    </>
}

// export function FormulaireUpdate({ titre, setData, id, nom }) {

//     const [nomT, setNomT] = useState(nom)

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNomT(value);

//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const boite_de_vitesse = {
//             nom: nom,
//         }
//         console.log(boite_de_vitesse);

//         FetchSpecUpdate({ path: `/boite_de_vitesse/update/${id}`, method: "PUT", requestBody: boite_de_vitesse }).then((data) => {
//             FetchSpecGET({ path: "/boites_de_vitesses", method: "GET" }).then((data) => {
//                 setData(data);
//             })
//         });
//     }


//     return <>
//         <div className='box-formulaire'>
//             <div className='form-header'>
//                 <div className='from-header-text'>{titre}</div>
//             </div>
//             <form className='formP' onSubmit={handleSubmit}>
//                 <div className='first-part'>

//                     <InputP value={nom} type={"text"} label={"boite_de_vitesse"} classN={"inputForm boite_de_vitesse"} fonction={handleChange} />
//                     <ButtonP Texte={"Valider"} classN={"btn-form"} />
//                 </div>
//             </form>
//         </div>
//     </>
// }

