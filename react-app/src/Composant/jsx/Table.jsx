import React, { useState, useEffect } from 'react'
import './../../assets/fontawesome-5/css/all.css'
import './../css/Table.css'
import { ButtonP, InputP, SelectP } from './Input'
import { FetchSpec2, FetchSpecGET, FetchSpecPOST, FetchSpecUpdate } from '../../Fetch'
import { LiaSyncSolid, LiaTrashAlt } from "react-icons/lia";
import Pagination from './Pagination'
import Modal from './Modal'
import { FormulaireUpdate } from './Formulaire'

function HeaderItem({ data, index }) {
    return <>
        <div key={index} className='headerItem-container'>
            <div className='headerItem-text'>{data.text}</div>
            {/* <i className='fas fa-sort'></i> */}
        </div>
    </>
}


function Filtre({ setDateFirst, setDateSecond, setDataEtatStock, dataEtatStock, dataArticle, dataMagasin }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
    }

    return <>

        <form onSubmit={""} className='filtre-container'>
            <InputP type={"datetime-local"} label={"First date"} classN={"filtre-item dateFirst"} fonction={handleChange} />
            <InputP type={"datetime-local"} label={"Second date"} classN={"filtre-item dateSecond"} fonction={handleChange} />
            <SelectP setValueSelect={""} defaut={"Article"} label={"Article"} idN={"filtre-item"} data={dataArticle} />
            <SelectP setValueSelect={""} defaut={"Article"} label={"Magasin"} idN={"filtre-item"} data={dataMagasin} />
            <ButtonP Texte={"Valider"} classN={"btn-filtre"} />
        </form>

    </>
}

export function TableCouleur({ dataHeader, data, setData }) {

    // console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };

    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (

                        <div key={index} className='tableRow'>
                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.couleur').value != "") {
                                    const couleur = {
                                        nom: e.target.querySelector('.couleur').value,
                                    }
                                    console.log(couleur);
                                    console.log(data.id);
                                    FetchSpecUpdate({ path: `/couleur/update/${data.id_couleur}`, method: "PUT", requestBody: couleur }).then((data) => {
                                        FetchSpecGET({ path: "/couleurs", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }

                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn couleur' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>
                            <div className='tableColumn'>
                                <div className='button-delete' onClick={() => {
                                    FetchSpec2({ path: `/couleur/delete/${data.id_couleur}`, method: "DELETE" }).then((data) => {
                                        FetchSpecGET({ path: "/couleurs", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Suppression réussi")
                                        })
                                    });
                                }}>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}




            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}

export function TableType({ dataHeader, data, setData }) {

    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };

    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (
                        <div key={index} className='tableRow'>
                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.carburant').value != "") {
                                    const carburant = {
                                        nom: e.target.querySelector('.carburant').value,
                                    }
                                    console.log(carburant);
                                    console.log(data.id);
                                    FetchSpecUpdate({ path: `/carburant/update/${data.id}`, method: "PUT", requestBody: carburant }).then((data) => {
                                        FetchSpecGET({ path: "/carburants", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }

                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn carburant' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>
                            <div className='tableColumn'>
                                <div className='button-delete' onClick={() => {
                                    FetchSpec2({ path: `/carburant/delete/${data.id}`, method: "DELETE" }).then((data) => {
                                        FetchSpecGET({ path: "/carburants", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Suppression réussi")
                                        })
                                    });
                                }}>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}




            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}
export function TableMoteur({ dataHeader, data, setData }) {

    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };


    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (
                        <div key={index} className='tableRow'>
                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.moteur').value != "") {
                                    const moteur = {
                                        nom: e.target.querySelector('.moteur').value,
                                    }
                                    console.log(moteur);
                                    console.log(data.id);
                                    FetchSpecUpdate({ path: `/moteur/update/${data.id}`, method: "PUT", requestBody: moteur }).then((data) => {
                                        FetchSpecGET({ path: "/moteurs", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }

                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn moteur' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>
                            <div className='tableColumn'>
                                <div className='button-delete' onClick={() => {
                                    FetchSpec2({ path: `/moteur/delete/${data.id}`, method: "DELETE" }).then((data) => {
                                        FetchSpecGET({ path: "/moteurs", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Suppression réussi")
                                        })
                                    });
                                }}>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}




            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}
export function TableCategorie({ dataHeader, data, setData }) {

    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };

    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (
                        <div key={index} className='tableRow'>

                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.categorie').value != "") {
                                    const categorie = {
                                        nom: e.target.querySelector('.categorie').value,
                                    }
                                    console.log(categorie);
                                    console.log(data.id);
                                    FetchSpecUpdate({ path: `/categorie/update/${data.id}`, method: "PUT", requestBody: categorie }).then((data) => {
                                        FetchSpecGET({ path: "/categories", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }

                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn categorie' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>
                            <div className='tableColumn' onClick={() => {
                                FetchSpec2({ path: `/categorie/delete/${data.id}`, method: "DELETE" }).then((data) => {
                                    FetchSpecGET({ path: "/categories", method: "GET" }).then((data) => {
                                        setData(data);
                                        alert("Suppression réussi")
                                    })
                                });
                            }}>
                                <div className='button-delete'>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}




            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}
export function TableModele({ dataHeader, data, setData }) {

    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };


    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (
                        <div key={index} className='tableRow'>
                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.modele').value != "") {
                                    const modele = {
                                        nom: e.target.querySelector('.modele').value,
                                    }
                                    console.log(modele);
                                    console.log(data.id);
                                    FetchSpecUpdate({ path: `/modele/update/${data.id}`, method: "PUT", requestBody: modele }).then((data) => {
                                        FetchSpecGET({ path: "/modeles", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }

                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn modele' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>



                            <div className='tableColumn'>
                                <div className='button-delete' onClick={() => {
                                    FetchSpec2({ path: `/modele/delete/${data.id}`, method: "DELETE" }).then((data) => {
                                        FetchSpecGET({ path: "/modeles", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Suppression réussi")
                                        })
                                    });
                                }}>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}




            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}
export function TableMarque({ dataHeader, data, setData }) {

    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };

    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (
                        <div key={index} className='tableRow'>
                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.marque').value != "") {
                                    const marque = {
                                        nom: e.target.querySelector('.marque').value,
                                    }
                                    // console.log(marque);
                                    // console.log(data.id);
                                    FetchSpecUpdate({ path: `/marque/update/${data.id}`, method: "PUT", requestBody: marque }).then((data) => {
                                        FetchSpecGET({ path: "/marques", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }
                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn marque' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>
                            <div className='tableColumn'>
                                <div className='button-delete' onClick={() => {
                                    FetchSpec2({ path: `/marque/delete/${data.id}`, method: "DELETE" }).then((data) => {
                                        FetchSpecGET({ path: "/marques", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Suppression réussi")
                                        })
                                    });
                                }}>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}




            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}
export function TableBoites({ dataHeader, data, setData }) {

    console.log(data);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(100);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [closeModal, setCloseModal] = useState(false)
    const handleClose = () => {

        setCloseModal(!closeModal)
        console.log(closeModal);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

    };

    return <>

        <div className='box-table'>

            <div className='table-header stat'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container'>
                {data != null ?
                    data.map((data, index) => (
                        <div key={index} className='tableRow'>
                            <form className='tableRow' onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.querySelector('.boite_de_vitesse').value != "") {
                                    const boite_de_vitesse = {
                                        nom: e.target.querySelector('.boite_de_vitesse').value,
                                    }
                                    console.log(boite_de_vitesse);
                                    console.log(data.id);
                                    FetchSpecUpdate({ path: `/boite_de_vitesse/update/${data.id}`, method: "PUT", requestBody: boite_de_vitesse }).then((data) => {
                                        FetchSpecGET({ path: "/boites_de_vitesses", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Update réussi")
                                        })
                                    });
                                } else {
                                    alert("Veuillez remplir tous les champs")
                                }
                            }}>
                                <div className='tableColumn'>{index + 1}</div>
                                <input className='tableColumn boite_de_vitesse' type="text" defaultValue={data.nom} onChange={handleChange} />
                                <div className='tableColumn'>

                                    <button type='submit' className='button-update'>
                                        <LiaSyncSolid />
                                    </button>


                                </div>
                            </form>
                            <div className='tableColumn'>
                                <div className='button-delete' onClick={() => {
                                    FetchSpec2({ path: `/boite_de_vitesse/delete/${data.id}`, method: "DELETE" }).then((data) => {
                                        FetchSpecGET({ path: "/boites_de_vitesses", method: "GET" }).then((data) => {
                                            setData(data);
                                            alert("Suppression réussi")
                                        })
                                    });
                                }}>
                                    <LiaTrashAlt />
                                </div>
                            </div>
                        </div>
                    )) : null}

            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}







export function TableStat({ dataHeader, data, setData }) {


    return <>

        <div className='box-table'>

            <div className='table-header'>
                {dataHeader.map((text, index) => (
                    <HeaderItem index={index} data={text} />
                ))}
            </div>

            <div className='table-container stat'>
                {data != null ?
                    data.map((best, index) => {
                        return <>
                            <div className='tableRow'>
                                <div className='tableColumn'>{best.annonce.employer.email}</div>
                                <div className='tableColumn'>{best.annonce.voiture.marque.nom} {best.annonce.voiture.modele.nom}</div>
                                <div className='tableColumn'>{best.annonce.voiture.matricule}</div>
                                <div className='tableColumn'>{best.annonce.voiture.prix}</div>
                                <div className='tableColumn'>{best.favorisCount}</div>
                            </div>
                        </>
                    })
                    : null}
            </div>
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            /> */}

        </div>
    </>
}





