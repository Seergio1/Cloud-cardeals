import React, { useState } from 'react'
import './../css/Input.css'

export function InputP({ type, label, classN, fonction, name, value }) {
    return <>
        <div className='inputBox'>
            <label htmlFor={classN}>{label}</label>
            <input defaultValue={value} name={name} id={classN} type={type} className={classN} onChange={fonction} />
        </div>
    </>
}

export function SelectP({ data, label, defaut, idN, valueSelect, setValueSelect, setDataSelect }) {
    const [open, setOpen] = useState('down')


    return <>
        <div id={idN} className='selectBox'>
            <label htmlFor={"selectLabel"}>{label}</label>
            <div id='selectLabel' className='selectLabel' onClick={() => {
                if (open === 'down') {
                    setOpen('up');
                } else {
                    setOpen('down');
                }
            }}>
                <div className='label-select'>{defaut}</div>
                <i className={`fas fa-caret-${open}`}></i>
            </div>

            <div className={`selectItemBox ${open}`}>
                {data != null ? <>

                    {data.map((data, index) =>
                        <div key={index} className='selectItem' onClick={() => {
                            setValueSelect(data.id);
                            setDataSelect(data.name)
                        }}>{data.name}</div>
                    )}
                </> : null}
            </div>
        </div>
    </>
}

export function ButtonP({ Texte, classN }) {
    return <>
        <div className='buttonBox'>
            <button className={classN} type='submit'>{Texte}</button>
        </div>
    </>
}



