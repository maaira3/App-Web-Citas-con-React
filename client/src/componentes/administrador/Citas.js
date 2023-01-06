import  { React, useEffect, useState } from 'react'
import {requestGetAwait} from "../../helpers/Request";
import Loading from "../Loading";

export default function Citas() {
    const [ citas, setCitas ] = useState([])



    const [loading,setLoading] = useState(false);
    

    useEffect(() => {
        getCitas()
    },[])

    async function getCitas(){
        const { data } = await requestGetAwait('api/citas',{},setLoading);
        setCitas(data.data)
    }

    return (
      <>
      <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div className="container px-4 px-lg-5 h-100">
          <Loading loading={loading} />
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        {citas!==[]
        ?<>                  
        <div className="col-12 table-responsive">
        <table className="table rounded shadow-sm table-hover ">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre Paciente </th>
              <th scope="col">Correo</th>
              <th scope="col">Telefono </th>
              <th scope="col">Edad </th>
              <th scope="col">Nombre Terapeuta </th>
              <th scope="col">Fecha y hora de cita </th>
            </tr>
          </thead>
          <tbody>
           {  citas.map((item) => (
                  <tr key={item.idCliente}>
                    <td>{item.nombre}</td>
                    <td>{item.email}</td>
                    <td>{item.telefono}</td>
                    <td>{item.edad}</td>
                    <td>{item.nombreterapeuta}</td>
                    <td>{item.horarioSesion} hrs</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        </div>
        </> 
        :<></>
        }
      </div>
      </>
    )
}
