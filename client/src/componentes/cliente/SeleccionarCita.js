import { useEffect } from "react";
import BarraPrincipal from "./BarraPrincipal";
import Horarios from "./Horarios";
import axios from 'axios' //npm i axios
import {requestPostAwait } from "../../helpers/Request"

const idusuario = localStorage.getItem('id')

export default function SeleccionarCita()
{
    

useEffect(() => {
    VerificarPago()
},[])

async function VerificarPago(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const statuspago = urlSearchParams.get("status");
    console.log(statuspago)
    if(statuspago==='approved'){
        const pago = '1';
        console.log(pago)
        /////////////////Inserción de los datos///////////////////////////////
        const { data } = await axios.post( `api/pago/update/${idusuario}`, pago );
        localStorage.setItem("pagoServicio", pago)
        window.location.replace("/seleccionarCita")
    }
    
}
    return(
        <>
            <BarraPrincipal/>
            <div className="mt-10">
                <Horarios/>
            </div>  
        </>
    )
}