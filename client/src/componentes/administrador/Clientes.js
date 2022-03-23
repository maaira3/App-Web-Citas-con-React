import  { React, useEffect, useState } from 'react'
import {requestGetAwait, requestPostAwait} from "../../helpers/Request";
import Loading from "../Loading";



export default function Clientes() {
    const [ citas, setCitas ] = useState([])
    const [asignarterapeuta,setAsignarTerapeuta] = useState(false)
    const [ idterapeuta, setIdTerapeuta] = useState(0)
    const [listaterapeutas, setListaTerapeutas] = useState([])
    const [listidterapeutas, setListaIdTerapeutas] = useState([])
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getCitas()
        getTerapeutas()
    },[])

    async function getCitas(){
      //Obtiene la informacion de los clientes
        const { data } = await requestGetAwait('citas',{},setLoading)
        setCitas(data.data)
        ArrayIdTerapeutas(data.data)
    }

    async function getTerapeutas(){
      //Obtiene la lista de los terapeutas
      const { data } = await requestGetAwait('terapeutas',{},setLoading);
      console.log( "terapeutas" , data.data)
      setListaTerapeutas(data.data)
    }

    const handleChangeIdTerapeuta = (e)=>{
      let name = e.target.name;
      let value = e.target.value;
  
      console.log(value,name)
      citas[name].idTerapeuta=value
      listidterapeutas[name] = value;
      //setListaIdTerapeutas()
      setCitas(citas)
    }

    async function AsignarTerapeuta(idcliente, idterapeuta){
      //Se actualiza el id del terapeuta en la tabla de cliente
      const { data } = await requestPostAwait(`cliente/${idcliente}/${idterapeuta}`,{},setLoading);
    }

    function GuardarTerapeutas(){
      for (var i=0; i<citas.length; i++){
        AsignarTerapeuta(citas[i].idCliente, listidterapeutas[i])
      }
    }

    function ArrayIdTerapeutas(cita){
      //Se crea un array para los id de los terapeutas
      const idterapeutas = []
      for (var i=0; i<cita.length; i++) 
      { idterapeutas[i]=cita[i].idTerapeuta }
      setListaIdTerapeutas(idterapeutas)
    }

    return (
    <>
      <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
      <div className="container px-4 px-lg-5 h-100 border">
        <Loading loading={loading} />
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div align="right">
          <button className="btn btn-primary" onClick={GuardarTerapeutas}>Guardar Cambios</button>
        </div>
        <br></br>
          {citas!==[] 
          ?<>                  
            <div className="col-12 table-responsive">
            <table className="table rounded shadow-sm table-hover ">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Nombre Cliente </th>
                  <th scope="col">Correo</th>
                  <th scope="col">Telefono </th>
                  <th scope="col">Edad </th>
                  <th scope="col">Nombre Terapeuta Actual</th>
                  <th scope="col">Asignar Nuevo Terapeuta </th>
                </tr>
              </thead>
              <tbody>
              {  citas.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombre}</td>
                        <td>{item.email}</td>
                        <td>{item.telefono}</td>
                        <td>{item.edad}</td>
                        <td>{item.nombreterapeuta}</td>
                          <td>
                          <div className="clientes-buttons">
                            <select name={index} className="form-select" id="floatingSelect" aria-label="Floating label select example"  onClick={handleChangeIdTerapeuta} >
                                <option value="0">Seleccione un terapeuta</option>
                                {listaterapeutas.map((terapeuta) => (
                                  <option
                                      value={terapeuta.idTerapeuta}
                                      key={terapeuta.idTerapeuta}
                                  >
                                      {terapeuta.nombre}
                                  </option>
                                  ))
                                }
                            </select>
                          </div>
                          </td>
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
