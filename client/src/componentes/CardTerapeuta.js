import React from 'react'


function CardTerapeuta(props) {
    return (
        
        <div>
            <div>
                <img src={props.imagen} width="100%" height="300"/>
            </div>
            <br/>
            <div className="card-text">
            <div align="center" className="name-card">
                <h1>{props.nombre}</h1>
            </div>
            <div align="justify" className="text-post"> {props.descripcion}</div>
            </div>
        </div>

    )
}

export default CardTerapeuta
