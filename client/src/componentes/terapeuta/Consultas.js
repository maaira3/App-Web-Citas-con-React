import {React, useEffect, useState} from 'react'
import {requestGetAwait} from "../../helpers/Request";
import Loading from "../Loading";

const baseURL = process.env.REACT_APP_API_URL
const idusuario = localStorage.getItem('id')

export default function Consultas() {
    const [consultas, setConsultas] = useState([])
    
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getConsultas()
    },[])

    async function getConsultas(){
        const { data } = await requestGetAwait(baseURL + `api/Consultas/${idusuario}`,{},setLoading); 
        setConsultas(data.data)
    }

    return (
        <div>
            <Loading loading={loading} />
            <div className="container px-4 px-lg-5 h-100"/>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="container px-4 px-lg-5 h-100">
            <div className="p-3 mb-2 text-dark" align="center">
                <h4>Consultas</h4>
                <br/>
                <div className="col-12 table-responsive">
                <table id="tablaConsultas" className="table table-light">
                    <thead className="table-dark">
                    <tr>
                        <th >Nombre del Paciente</th>
                        <th >Correo</th>
                        <th >Fecha y hora de cita</th>
                        <th >Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {  consultas.map((item) => (
                        <tr key={item.idCliente}>
                            <td>{item.nombre} </td>
                            <td>{item.email}</td>
                            <td>{item.horarioSesion} hrs</td>
                            <td>{item.link}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </div>
            </div>
         </div>  
    )
}
