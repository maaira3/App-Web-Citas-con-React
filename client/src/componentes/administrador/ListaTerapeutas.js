
import {useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import React from 'react';
import ModalModificarTerapeuta from './ModalModificarTerapeuta';
import ModalModificarHorario from './ModalModificarHorario'
import {requestPost} from "../../helpers/Request";
import Loading from "../Loading";

export default function ListaTerapeutas(){

    const [terapeutas,setTerapeutas] = useState( [] );

    const [terapeutaModificar,setTerapeutaModificar] = useState( {} );

    const [terapeutaHorario,setTerapeutaHorario] = useState( {} );

    const [showModalModificar,setShowModalModificar] = useState( false );

    const [showModalHorario,setShowModalHorario] = useState( false );

    const [indiceTerapeuta,setIndiceTerapeuta] = useState(0);

    const [camposValidos,setCamposValidos] = useState( true );

    const [loading,setLoading] = useState(false);

    const [state, updateState] = React.useState();

    const forceUpdate = React.useCallback(() => updateState({}), []);

    /*Obtiene la informacion de los terapeutas y les agrega la propiedad de que accion se va a realizar */
    useEffect( ()=>{

        let url = "/obtenerTerapeutas";

        let parameters = { tipo:"administrador" };

        const accionThen = (response)=>{

            if( response.data.status === "success" )
            {
                //Obtiene la lista de terapeutas

                let terapeutas = response.data.terapeutas;

                //Para cada terapeuta le agrega el campo accion modificar y borrar como falsos

                for( let indiceTerapeuta = 0; indiceTerapeuta < terapeutas.length; indiceTerapeuta++ )
                {
                    terapeutas[indiceTerapeuta]["modificarlo"] = false;

                    terapeutas[indiceTerapeuta]["borrarlo"] = false;
                }

                //Actualiza los valores

                setTerapeutas( response.data.terapeutas );

                return;
            }

            if( response.data.status === "not-success" )
            {
                return;
            }
        }

        requestPost( url , parameters, accionThen, undefined,setLoading );
  
    }, [] )

    /*Cambia la accion de borrarlo terapeuta a true */
    const borrarTerapeuta = (indiceTerapeuta)=>{

        //Obtiene la lista de terapeutas

        let terapeutasTmp = terapeutas;

        //Cambia el valor de borrar a true y todo lo demas a false

        terapeutasTmp[indiceTerapeuta]["borrarlo"] = true;

        terapeutasTmp[indiceTerapeuta]["modificarlo"] = false;

        //Actualiza valores

        setTerapeutas( terapeutasTmp );

        forceUpdate();
    }

     /*Cambia la accion de modificarlo terapeuta a true */

    const actualizarTerapeuta = ( terapeutaActualizado ) => {

        //Obtiene la lista de terapeutas

        let terapeutasTmp = terapeutas;

        //Actualiza al terapeuta

        terapeutasTmp[indiceTerapeuta] = terapeutaActualizado;

        //Cambia el valor de borrarlo a true

        terapeutasTmp[indiceTerapeuta]["modificarlo"] = true;

        //Actualiza valores

        setTerapeutas( terapeutasTmp );

        console.log( terapeutasTmp );

        forceUpdate();

    }

    /*Inicia los valores para modificar al terapeuta */
    const modificarTerapeuta = (indiceTerapeuta)=>{

        //Actualiza valores

        setTerapeutaModificar( terapeutas[indiceTerapeuta] );

        setShowModalModificar( true );

        setIndiceTerapeuta( indiceTerapeuta );

        forceUpdate();
    }

    /*Cambia la accion de borrarlo terapeuta a false */
    const recuperarTerapeuta = (indiceTerapeuta)=>{

        //Obtiene la lista de terapeutas

        let terapeutasTmp = terapeutas;

        //Cambia el valor de borrarlo a false y todo lo demas a false

        terapeutasTmp[indiceTerapeuta]["borrarlo"] = false;

        //Actualiza valores

        setTerapeutas( terapeutasTmp );

        forceUpdate();
    }

    /*Muestra la modal con los horarios del terapueta seleccionado*/

    const verHorarios = (indexTerapeuta) => {

        setTerapeutaHorario( terapeutas[indexTerapeuta] );

        setShowModalHorario( true );
    }

    const guardarCambios = () => {

        let url = "/guardarCambiosTerapeutas";

        let parameters = { terapeutas:terapeutas };

        const accionThen = (response) =>{
            window.location.replace("/listaTerapeutas");
        }

        requestPost( url , parameters, accionThen , undefined,setLoading );
    }

    return(
        <>
            <Loading loading={loading} />
        <br></br>
        <div className="container px-4 px-lg-5 h-100">
            <br></br>
            <div align="right">
                <Button className="ml-5" onClick={guardarCambios}> Guardar </Button>
            </div>
            <div className="col-12 table-responsive">
            <Table striped className="mt-5 text-center" >
                <thead className="table-dark">
                   <tr>
                        <th> Nombre </th>
                        <th> Email </th>
                        <th> Telefono </th>
                        <th> Edad </th>
                        <th> Acciones </th>
                    </tr> 
                </thead>
                <tbody>
                    {
                        terapeutas.map( (terapeuta,indexTerapeuta) =>{
                            return  <tr key={indexTerapeuta}>
                                        <td className={ terapeuta.borrarlo ? "opacity-low" : "" } > {terapeuta.nombre} </td>
                                        <td className={ terapeuta.borrarlo ? "opacity-low" : "" }> {terapeuta.email}  </td>
                                        <td className={ terapeuta.borrarlo ? "opacity-low" : "" }> {terapeuta.telefono}  </td>
                                        <td className={ terapeuta.borrarlo ? "opacity-low" : "" }> {terapeuta.edad}  </td>
                                        <td>
                                            {
                                                !terapeuta.borrarlo
                                                ?
                                                <>
                                                    <Button className="mr-4" onClick={()=>modificarTerapeuta(indexTerapeuta)}> Modificar </Button>
                                                    <Button className="mx-4" onClick={ ()=>verHorarios(indexTerapeuta) } > Ver Horarios </Button>
                                                    <Button className="mx-4" onClick={()=>borrarTerapeuta(indexTerapeuta)}> Borrar </Button>
                                                </>
                                                :
                                                (
                                                    <>
                                                    <Button className="mx-4" onClick={()=>recuperarTerapeuta(indexTerapeuta)}> Recuperar </Button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                        })
                    }
                </tbody>
            </Table>
            </div>
            <ModalModificarTerapeuta show={showModalModificar} 
                                     setExternalShow={setShowModalModificar} 
                                     actualizarTerapeuta={actualizarTerapeuta} 
                                     terapeuta={terapeutaModificar}  />
            
            <ModalModificarHorario  show={showModalHorario} 
                                    setExternalShow={setShowModalHorario} 
                                    terapeuta={terapeutaHorario}  />                         

        </div>
        </>
    )
}