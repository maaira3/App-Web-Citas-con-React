import { useEffect,useState } from "react";
import {requestPost} from "../../helpers/Request";
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loading from "../Loading";
const idCliente = localStorage.getItem('idCliente')


export default function Horarios()
{
    const [calendario,setCalendario] = useState( [] )

    const MySwal = withReactContent(Swal)

    const meses = [" " , "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const [loading,setLoading] = useState(false);

    //Obtiene los horarios disponibles del terapeuta asignado a ese cliente
    useEffect ( ()=> {

        let url = "/obtenerHorariosTerapeuta";

        let parameters = { idCliente: idCliente };

        const accionThen = (response)=>{
            if( response.data.status === "success" )
                {
                    let calendario = response.data.calendario;
                
                    setCalendario( calendario );

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

        requestPost( url , parameters , accionThen , undefined, setLoading  );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] )

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

    /*Solicita al servidor aceptar la cita seleccionada
    Parametros
    fecha -> Tipo string con formato year-month-day
    hora -> Tipo string con formato hour:minute:second
    */

    const solicitarCita  = ( fecha,hora ) => {

        let horario = fecha + " " + hora;

        let url = "/solicitarCita"

        let parameters = { horario:horario , idCliente:idCliente }

        const accionThen = (response)=>{
            if( response.data.status === "success" )
            {
                Swal.fire('Cita realizada', '', 'success');

                localStorage.setItem("pagoServicio", response.data.pagoServicio)

                setTimeout(function(){
                    window.location.replace('/perfil');
                }, 1000);

                return;
            }

            if( response.data.status === "not-success" )
            {
                let message = ""

                if( response.data.message === "horario-no-disponible" )
                {
                    message = "El horario solicitado ya no esta disponible. Recomendamos actualizar la pagina para tener los mas recientes horarios disponibles."
                }
                else if( response.data.message === "conexion-no-exitosa" )
                {
                    message = "Hubo un problema con la conexion. Intente de nuevo."
                }

                Swal.fire(message, '', 'error');

                return;
            }
        }

        requestPost( url , parameters , accionThen , undefined , setLoading );
    }

    /*Verifica si el cliente en verdad desea aceptar la cita seleccionada
    Parametros
    indexFila -> Fila donde se encuentra el horario
    indexColumna -> Columna donde se encuentra el horario
    */

    const seleccionarCita = (indexFila,indexColumna) => {

        let fecha = calendario[0][indexColumna];
   
        let hora = calendario[indexFila][indexColumna];

        let mensaje = "Estas seguro de hacer la cita en la fecha " + cambiarFormatoFecha(fecha) + " a las " + hora;

        MySwal.fire({
            title: mensaje,

            showDenyButton: true,

            confirmButtonText: 'Aceptar',

            denyButtonText: `Cancelar`,

          }).then((result) => {

            if (result.isConfirmed) 
            {
                solicitarCita( fecha , hora );

            } 
            else if (result.isDenied) 
            {
             
            }
          })
    }

    return (
        <>
            <Loading loading={loading} />
            <h3 className="ml-center mb-5"> Selecciona un horario para tu cita </h3>
            <Table striped bordered hover className="text-center">
                <tbody>
                        {calendario.map((filas,indexFila) => 
                        { 
                            return  <tr key={filas}>
                                        {filas.map( (columnas,indexColumna) => 
                                        { 
                                            return  indexFila !== 0 && columnas!=="" ?  
                                                    (
                                                        <td  key={ columnas } className="cursor-pointer" onClick={ () => seleccionarCita(indexFila,indexColumna)}>
                                                            {columnas}
                                                        </td>
                                                    )
                                                    :
                                                    (
                                                        <td key={ columnas }>
                                                            {cambiarFormatoFecha(columnas)}
                                                        </td>
                                                    )
                                        })}
                                    </tr>
                        })}
                </tbody>
            </Table>
        </>
    )

}