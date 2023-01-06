import React from 'react';
import { useEffect,useState } from "react";
import {requestPost} from "../../helpers/Request";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiOutlineSync } from "react-icons/ai";
import {AiOutlineClose} from "react-icons/ai";
import {AiOutlineReload} from "react-icons/ai";
import Loading from "../Loading";




export default function CalendarioCitas( props ){

    const [idTerapeuta,setIdTerapueta] = useState( 0 )

    const accionDespuesGuardar = props.accionDespuesGuardar;

    const [calendario,setCalendario] = useState( [] )

    const [botonesAgregar,setBotonesAgregar] = useState( [] )

    const [fechaNueva,setFechaNueva] = useState( "" )
    
    const [horaNueva,setHoraNueva] = useState( "" )

    const [horariosNuevos,setHorariosNuevos] = useState( [] )

    const [horariosActualizados,setHorariosActualizados] = useState( [] )

    const [horariosBorrados,setHorariosBorrados] = useState([])

    const [fechaActual,setFechaActual] = useState("")

    const [loading,setLoading] = useState(false);

    const marcaYaAlmacenadoEnBD = "B";

    const marcaYaBorrada = "-";
   
    const MySwal = withReactContent(Swal)

    const meses = [" " , "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const [state, updateState] = React.useState();

    const forceUpdate = React.useCallback(() => updateState({}), []);

    const imprimir = () =>{
        console.log( "calendario" ,  calendario )
        console.log( "Nuevos" ,  horariosNuevos );
        console.log( "Actualizados" , horariosActualizados );
        console.log( "Borrados" , horariosBorrados );
    }


    //Obtiene los horarios disponibles del terapeuta asignado a ese cliente
    useEffect ( ()=> {

        let idTerapuetaTmp = props.idTerapeuta;

        let url = "/terapeuta/obtenerCalendario";

        let parameters = { idTerapeuta: idTerapuetaTmp };

        const accionThen = (response)=>{
            if( response.data.status === "success" )
            {
                let calendario = response.data.calendario;

                //Si el calendario no tiene horarios coloca una fila para almacenar los nuevos horarios

                if( calendario.length === 1 )
                {
                    calendario.push( [] );
                } 

                //Coloca la marca a los horarios que estan almacenados en la base de datos y los registra en la lista de actualizaciones 

                let cantidadFilas = calendario.length;

                let cantidadColumnas = calendario[0].length;

                let horariosActualizadosTmp = [];

                let horariosBorradosTmp = [];

                for( let indiceFila = 1 ; indiceFila < cantidadFilas ; indiceFila++ )
                {
                    for( let indiceColumna = 0 ; indiceColumna < cantidadColumnas ; indiceColumna++ )
                    {
                        let hora = calendario[indiceFila][indiceColumna]; 

                        let fecha = calendario[0][indiceColumna]; 

                        let horario = fecha + " " + hora;

                        if( hora !== "" )
                        {
                            horariosActualizadosTmp.push( [ horario , horario, false ] );

                            horariosBorradosTmp.push( [horario,horario, false] );

                            hora = marcaYaAlmacenadoEnBD + hora; 

                            calendario[indiceFila][indiceColumna] = hora;
                        }
                    }
                }

                //Determina la cantidad de botones + para agregar al calendario

                let botonesAgregar = [];

                let cantidadBotones = calendario[0].length;

                for( let indice = 0; indice < cantidadBotones ; indice++ )
                {
                    botonesAgregar.push( indice );
                }

                //Establece la fecha actual y la fecha nueva como la actual

                let today = new Date();

                let year = today.getFullYear();

                let month = today.getMonth()+1;

                let date = today.getDate();

                if( month < 10 )
                {
                    month = "0" + month;
                }

                let fechaActual = year +'-'+ month +'-'+ date;

                setFechaActual( fechaActual );

                setFechaNueva( fechaActual );

                //Actualiza los valores

                setCalendario( calendario );

                setBotonesAgregar( botonesAgregar );

                setHorariosActualizados( horariosActualizadosTmp );

                setHorariosBorrados( horariosBorradosTmp );

                setIdTerapueta( idTerapuetaTmp );

                imprimir();

                return;    
            }

            if( response.data.status === "not-success" )
            {
                MySwal.fire({
                    title: "Ocurrio un error",
        
                    confirmButtonText: 'Aceptar',

                  }).then((result) => {
        
                    if (result.isConfirmed) 
                    {
                        window.location.replace('/');
                    } 
                  })
                
                return;
            }

        }

        requestPost( url , parameters , accionThen , undefined, setLoading  )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [props.idTerapeuta] )

    /*Determina si un horario ya se encuentra almacenado en la base de datos
    Parametros:
    horario -> Horario que sera evaludao
    Salida:
    boolean -> True si esta en BD , False si no esta en BD
    horario -> Horario sin la marca de ya almacenado en la base de datos
    */
    const determinarHorarioBD = ( horario ) =>{

        //Si tiene el horario con marca de borrado la quita

        if( horario[0] === marcaYaBorrada )
        {
            horario = horario.slice(1);
        }

        //Si tiene la marca entonces retorna el horario sin la marca

        if( horario[0] === marcaYaAlmacenadoEnBD )
        {
            return [ true , horario.slice(1) ];
        }

        //Retorna el horario como es

        return [false,horario];

    }

    /*Cambia el formato de la hora */

    const cambiarFormatoHora = (hora) => {
        if( hora.length === 0 )
        {
            return hora;
        }

        if(  hora[0] === marcaYaBorrada && hora[1] === marcaYaAlmacenadoEnBD )
        {
            return hora.slice(1).slice(1);
        }

        if( hora[0] === marcaYaBorrada || hora[0] === marcaYaAlmacenadoEnBD  )
        {
            return hora.slice(1);
        }

        return hora;
    }


    //Cambia el formato de una fecha de la forma "year-month-day hour:minute:second" por "day de mes"
    const cambiarFormatoFecha = ( fecha ) => {

        if( fecha === "" )
        {
            return "";
        }

        //Obtiene el año, mes y dia de la fecha

        let partesFecha = fecha.split("-");

        //let year = partesFecha[ 0 ];

        let month = partesFecha[ 1 ];

        let day = partesFecha[ 2 ];

        //Si el mes es de un digito, quita el primer digito

        if( month.length === 2 && month[0] === "0" )
        {
            month = month[1];   
        }

        //Establece el texto de la fecha

        fecha = day + " de " + meses[month];

        return fecha;
    }

    /*Valida si una hora dada se encuentra ya en el calendario */

    const validarHora = (calendario,horaNueva,columnaFija) =>{

        if( horaNueva === "" )
        {
            MySwal.fire({
                title: "Debe seleccionar un horario",
    
                confirmButtonText: 'Aceptar',

            })

            return 0;
        }

        let horaYaExiste = false;

        let cantidadFilas = calendario.length

        for( let indiceFila = 0; indiceFila < cantidadFilas; indiceFila++ )
        {
            if( cambiarFormatoHora(calendario[indiceFila][columnaFija]) === horaNueva )
            {
                horaYaExiste = true;

                break;
            }
        }

        if( horaYaExiste )
        {
            let message = "El horario " + horaNueva + " ya se encuentra en el calendario";

            MySwal.fire({
                title: message,
    
                confirmButtonText: 'Aceptar',

            })

            return 0;
        }

        return 1;

    }
    
    /*Agrega la nueva hora como un nuevo horario
    Parametros:
    columnaFija -> Numero de columna donde se agregara el horario
    */
    const agregarHora = (columnaFija) => {

        let calendarioTmp = calendario;

        let horaNuevaTmp = horaNueva;

        //Valida la nueva hora 

        if( !validarHora(calendarioTmp,horaNuevaTmp,columnaFija) )
        {
            return;
        }

        //Establece el formato de horario a agregar

        let horarioNuevo = calendarioTmp[0][columnaFija] + " " + horaNuevaTmp; 

        //Determina si alguna posicion (i,columnaFija) se encuentra vacia

        let cantidadFilas = calendarioTmp.length;

        let posicionDisponible = false;

        let filaFija = 1;

        for( let indiceFila = 1; indiceFila < cantidadFilas ; indiceFila++ )
        {
            if( calendarioTmp[indiceFila][columnaFija] === "" )
            {
                posicionDisponible = true;

                filaFija = indiceFila;

                break;
            }
        }

        //Si la posicion no se encuentra disponible entonces se crea una nueva fila para que exista esa posicion

        if( !posicionDisponible )
        {
            let cantidadColumnas = calendarioTmp[0].length;

            let nuevaFila = [];

            filaFija = calendarioTmp.length;

            for( let indiceColumna = 0; indiceColumna < cantidadColumnas; indiceColumna++  )
            {
                nuevaFila.push("");
            }

            calendarioTmp.push( nuevaFila );
        }
        
        calendarioTmp[filaFija][columnaFija] = horaNuevaTmp;

        //Agrega el horario nuevo a la lista de nuevos horarios

        let horariosNuevosTmp = horariosNuevos;

        horariosNuevosTmp.push( horarioNuevo ); 

        //Actualiza valores

        setCalendario( calendarioTmp );

        setHorariosNuevos( horariosNuevosTmp );

        forceUpdate();

        imprimir();
    }

    //Valida la fecha que se desea agregar al calendario
    const validarFecha = (calendario,fechaNueva,horarioNuevo) => {

        if( fechaNueva === "" )
        {
            MySwal.fire({
                title: "Debe seleccionar una fecha",
    
                confirmButtonText: 'Aceptar',
            })

            return 0;
        }

        if( horarioNuevo === "" )
        {
            MySwal.fire({
                title: "Para agregar la fecha " + cambiarFormatoFecha( fechaNueva ) + " debe selecionar una hora",
    
                confirmButtonText: 'Aceptar',
            })

            return 0;
        }

        let fechaYaExiste = false;

        let cantidadColumnas = calendario[0].length

        for( let indiceColumna = 0; indiceColumna < cantidadColumnas; indiceColumna++ )
        {
            if( calendario[0][indiceColumna] === fechaNueva )
            {
                fechaYaExiste = true;

                break;
            }
        }

        if( fechaYaExiste )
        {
            MySwal.fire({
                title: "La fecha " + cambiarFormatoFecha( fechaNueva ) + " ya se encuentra en el calendario",
    
                confirmButtonText: 'Aceptar',
            })

            return 0;
        }

        return 1;
    }

    /*Agrega una nueva columna al horario, coloca el nuevo horario al calendario*/
    const agregarFecha = () => {

        let fechaNuevaTmp = fechaNueva;

        let horarioNuevoTmp = horaNueva;

        let calendarioTmp = calendario;

        //Valida si la fecha ya esta en el calendario

        if( !validarFecha( calendarioTmp,fechaNuevaTmp, horarioNuevoTmp) )
        {
            return;
        } 

        //Define el horario nuevo

        let horarioNuevo = fechaNuevaTmp + " " + horarioNuevoTmp;

        //Agrega la nueva fecha al calendario

        calendarioTmp[0].push( fechaNuevaTmp );

        //Agrega la nueva hora al calendario

        calendarioTmp[1].push( horarioNuevoTmp );

        //Apartir de la fila 2 agrega una nueva columna

        for(let indiceFila = 2; indiceFila < calendarioTmp.length; indiceFila++ )
        {
            calendarioTmp[indiceFila].push("");
        }

        //Crea un boton de agregar para la nueva columna

        botonesAgregar.push( botonesAgregar.length );

        //Agrega el horario nuevo a la lista de nuevos horarios

        let horariosNuevosTmp = horariosNuevos;

        horariosNuevosTmp.push( horarioNuevo ); 

        //Actualiza valores

        setCalendario(calendarioTmp);

        setHorariosNuevos( horariosNuevosTmp );

        forceUpdate();

        imprimir();
    }

    /*Actualiza una hora seleccionada por una hora nueva*/

    const actualizarHora = ( filaFija,columnaFija)=>{

        let calendarioTmp = calendario;

        let horaNuevaTmp = horaNueva;

        //Valida la nueva hora 

        if( !validarHora(calendarioTmp,horaNuevaTmp,columnaFija) )
        {
            return;
        }

        //Obtiene la fecha y hora actuales

        let fecha = calendarioTmp[0][columnaFija];

        let horaActual = calendarioTmp[filaFija][columnaFija];

        //Determina si el horario esta en la BD

        let resultado = determinarHorarioBD( horaActual );

        let horarioEnBD = resultado[0];

        horaActual = resultado[1];

        //Establece el horario a actualizar y el horario nuevo

        let horarioActual = fecha + " " + horaActual;

        let horarioNuevo = fecha + " " + horaNuevaTmp;

        //Si el horario esta en base de datos

        if( horarioEnBD )
        {

            //Actualiza la hora seleccionada a la nueva hora

            calendarioTmp[filaFija][columnaFija] = marcaYaAlmacenadoEnBD + horaNuevaTmp;

            //Actualiza el horario al nuevo horario en la lista de horarios borrados

            let horariosBorradosTmp = horariosBorrados;

            let indiceHoraBorrada = horariosBorradosTmp.findIndex( (hora) => hora[1] === horarioActual );

            horariosBorradosTmp[indiceHoraBorrada][1] = horarioNuevo;

            //Actualiza el horario al nuevo horario en la lista de horarios actualizados

            let horariosActualizadosTmp = horariosActualizados;

            let indiceHoraActualizar = horariosActualizadosTmp.findIndex( (hora) => hora[1] === horarioActual );

            horariosActualizadosTmp[indiceHoraActualizar][1] = horarioNuevo;

            horariosActualizadosTmp[indiceHoraActualizar][2] = true;

            setHorariosActualizados( horariosActualizadosTmp );
        }
        else
        {
            //Actualiza la hora seleccionada a la nueva hora

            calendarioTmp[filaFija][columnaFija] = horaNuevaTmp;

            //Actualiza el horario al nuevo horario en la lista de insertados

            let horariosNuevosTmp = horariosNuevos;

            let indiceHoraActualizar = horariosNuevosTmp.findIndex( (hora) => hora === horarioActual );

            horariosNuevosTmp[ indiceHoraActualizar ] = horarioNuevo;

            setHorariosNuevos( horariosNuevosTmp );
        }

        
        //Actualiza valores

        setCalendario( calendarioTmp );

        forceUpdate();

        imprimir();

    }

    /*Borra un horario seleccionado del calendario */

    const borrarHorario = (filaFija,columnaFija)=>{

        let calendarioTmp = calendario;
      
        //Obtiene el horario seleccionado 'fecha hora'

        let fecha = calendarioTmp[0][columnaFija];

        let hora = calendarioTmp[filaFija][columnaFija];

        //Actualiza el horario seleccionado a un horario negativo con el objetivo de identificarlo como borrado

        calendarioTmp[filaFija][columnaFija] = "-" + hora;

        //Valida si el horario esta en BD

        let resultado = determinarHorarioBD( hora );

        let horarioEnBD = resultado[0];

        hora = resultado[1];

        //Establece el horario seleccionado

        let horarioSeleccionado = fecha + " " +  hora;

        //Si el horario esta en BD

        if( horarioEnBD )
        {
            //Busca el horario en la lista de horarios Borrados y actualiza su estado de borrado a true

            let horariosBorradosTmp = horariosBorrados;

            let indiceHoraBorrada = horariosBorradosTmp.findIndex( (hora) => hora[1] === horarioSeleccionado );

            horariosBorradosTmp[indiceHoraBorrada][2] = true;

            //Elimina el horario de horarios actualizados, iguala el viejo valor con el nuevo valor

            let horariosActualizadosTmp = horariosActualizados;

            let indiceHoraActualizar = horariosActualizadosTmp.findIndex( (hora) => hora[1] === horarioSeleccionado );

            horariosActualizadosTmp[indiceHoraActualizar][2] = false; 

            //Actualiza las listas

            setHorariosBorrados( horariosBorradosTmp );

            setHorariosActualizados( horariosActualizadosTmp );
        }
        else
        {
            //Borra el horario de la lista de nuevos horarios

            let horariosNuevosTmp = horariosNuevos;

            let indiceHoraBorrar = horariosNuevosTmp.findIndex( (hora) => hora === horarioSeleccionado );

            horariosNuevosTmp.splice( indiceHoraBorrar , 1 );

            setHorariosNuevos( horariosNuevosTmp );
        } 

     
        //Actualiza valores

        setCalendario( calendarioTmp );

        forceUpdate();

        imprimir();
    }

    /*Deja de considerar a un horario seleccionado como borrado*/

    const recuperarHorario = (filaFija,columnaFija) => {

        let calendarioTmp = calendario;

        //Determina la hora que fue seleccionada

        let horaSeleccionada = calendarioTmp[filaFija][columnaFija];

        let fecha = calendarioTmp[0][columnaFija];

        //Determina si la hora se encuentra en la base de datos

        let resultado = determinarHorarioBD( horaSeleccionada );

        let horaEnBD = resultado[0];

        horaSeleccionada = resultado[1]

        //Establece el horario seleccionado

        let horarioSeleccionado = fecha + " " + horaSeleccionada;

        if( horaEnBD )
        {
            
            //Busca el horario en la lista de horarios borrados e indica con un false que se desea borrar

            let horariosBorradosTmp = horariosBorrados;

            let indiceHoraBorrada = horariosBorradosTmp.findIndex( (hora) => hora[1] === horarioSeleccionado );

            horariosBorradosTmp[indiceHoraBorrada][2] = false;

            //Convierte a true la actualizacion de la hora si es que se hizo una actualizacion

            let horariosActualizadosTmp = horariosActualizados;

            let indiceHoraActualizar = horariosActualizadosTmp.findIndex( (hora) => hora[1] === horarioSeleccionado );

            let valorViejo = horariosActualizadosTmp[indiceHoraActualizar][0];

            let valorNuevo = horariosActualizadosTmp[indiceHoraActualizar][1];

            if( valorViejo !== valorNuevo )
            {
                horariosActualizadosTmp[indiceHoraActualizar][2] = true;
            }

            //Actualiza la hora, sin la marca de borrado y solo con la marca de almacenado en BD

            calendarioTmp[filaFija][columnaFija] = marcaYaAlmacenadoEnBD + horaSeleccionada ;

            setHorariosBorrados( horariosBorradosTmp );

            setHorariosActualizados( horariosActualizadosTmp );
        }
        else
        {
            //Almacena el horario nuevo 

            let horariosNuevosTmp = horariosNuevos;
            
            horariosNuevosTmp.push( horarioSeleccionado );

            //Actualiza la hora, sin la marca de borrado y solo con la marca de almacenado en BD

            calendarioTmp[filaFija][columnaFija] =  horaSeleccionada ;

            setHorariosNuevos( horariosNuevosTmp );
        }

        //Actualiza valores

        setCalendario( calendarioTmp );

        forceUpdate();

        imprimir();
    }

    const guardarCalendario = () =>{

        let url = "/terapeuta/guardarCalendario";

        let parameters = { idTerapeuta:idTerapeuta, horariosNuevos:horariosNuevos , horariosBorrados:horariosBorrados, horariosActualizados:horariosActualizados};

        const accionThen = (response)=>{
            accionDespuesGuardar();
        }

        requestPost( url , parameters , accionThen , undefined , setLoading );
    }


    return(
        <>
            <Loading loading={loading} />
            <Button className="ml-3" onClick={ () => { guardarCalendario() } } > Guardar Horarios </Button>
            <br></br>

            <div className='mt-5 mb-5'>
                <label className='ml-3'> Fecha </label> <input min={fechaActual} type="date" className='' value={fechaActual} onChange={(e)=> setFechaNueva( e.target.value ) }></input>

                <input className='ml-3 text' disabled value={cambiarFormatoFecha(fechaNueva)}  ></input>

                <Button className="ml-3 mr-5 pt-0 pb-0" onClick={ () => { agregarFecha() } } > Agregar Fecha </Button>

                <label> Hora </label> <input type="time" className='' onChange={(e)=> setHoraNueva( e.target.value ) } ></input>
            </div>
            <div className="col-12 table-responsive">
            <Table className="mt-4 text-center" striped bordered hover>
                <tbody>
                        {calendario.map((filas,indexFila) => 
                        { 
                            return  <tr key={ "filas" + indexFila}>
                                        {filas.map( (columnas,indexColumna) => 
                                        { 
                                            if( indexFila === 0 )
                                            {
                                                if( columnas !== undefined )
                                                {
                                                    return  <td  className="table-dark" key={ "fecha" + indexFila + "-" + indexColumna }>
                                                                { cambiarFormatoFecha(columnas)}
                                                            </td>
                                                }
                                            }
                                            else
                                            {
                                                if( columnas !== undefined )
                                                {
                                                    if( columnas !== "" )
                                                    {
                                                        if( columnas[0] === "-" )
                                                        {
                                                            return <td  key={ "horario" + indexFila + "-" + indexColumna } className="cursor-pointer">
                                                                        <label className="opacity-low"> { cambiarFormatoHora(columnas)}  </label> 
                                                                        <AiOutlineReload  onClick={(e)=>recuperarHorario( indexFila,indexColumna )}></AiOutlineReload> 
                                                                    </td>
                                                        }
                                                        else
                                                        {
                                                            return  <td  key={ "horario" + indexFila + "-" + indexColumna } className="cursor-pointer">
                                                                        {cambiarFormatoHora( columnas ) } 
                                                                        <AiOutlineSync onClick={(e)=>actualizarHora( indexFila,indexColumna )}></AiOutlineSync> 
                                                                        <AiOutlineClose onClick={(e)=>borrarHorario( indexFila,indexColumna )} ></AiOutlineClose> 
                                                                    </td>
                                                        }
                                                    }
                                                    else
                                                    {
                                                        return  <td  key={ "horario" + indexFila + "-" + indexColumna } className="cursor-pointer">
                                                        {columnas}
                                                        </td>
                                                    }


                                                }
                                            }
                                        })}
                                    </tr>   
                        })}

                        <tr>
                            {
                                botonesAgregar.map( (indiceFecha,index) => {
                                    return <td key={"botonAgregar" + index }>  <Button onClick={()=>agregarHora(indiceFecha)}> + </Button> </td> 
                                })
                            }
                        </tr>
                </tbody>
            </Table>
            </div>
        </>
    )
}