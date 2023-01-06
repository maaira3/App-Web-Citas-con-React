import React, {useState} from "react";
import {requestPost} from "../helpers/Request"
import BarraPrincipal from "./cliente/BarraPrincipal";
import FormularioRegistro from "./FormularioRegistro";
import ErrorRegistrarse from "./cliente/ErrorRegistrarse";
import BarraPrincipalAdministrador from "./administrador/BarraPrincipalAdministrador"
import {validarCampos} from "../helpers/ValidacionesFormulario";
import Loading from "./Loading";

const tipo = localStorage.getItem('tipo')

export default function Registrarse()
{
    //Valores iniciales del formulario
    const initialForm = {
        nombre:"",
        telefono:"",
        edad:0,
        email:"",
        password:""
    }

    //Variable que almacena el formulario

    const [form,setForm] = useState([initialForm]);

    //Variables que almacenan el estado de la validacion de los campos del formulario

    const [validacionNombre,setValidacionNombre] = useState("valido");

    const [validacionTelefono,setValidacionTelefono] = useState("valido");

    const [validacionEdad,setValidacionEdad] = useState("valido");

    const [validacionEmail,setValidacionEmail] = useState("valido");

    const [validacionPassword,setValidacionPassword] = useState("valido");

    const [showModalError,setShowModalError] = useState(false);

    const [mensajeModal,setMensajeModal] = useState("");

    const [loading,setLoading] = useState(false);

    const determinarTipo = (tipoTmp) => {

        if( tipoTmp !== "administrador" && tipoTmp !== "terapeuta" )
        {
            return "cliente";
        }

        if( tipoTmp === "administrador" )
        {
            return "administrador";
        }

        if( tipoTmp === "terapeuta" )
        {
            return "terapeuta";
        }
    }



    //Esta a la escucha de cambios en el formulario, agrega lo que existe ya en el formulario y el nuevo valor
    const handleOnChange = (e) => {

        setForm(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
    }


    //Solicita al servidor crear un nuevo cliente si todos los campos son validos
    const crearUsuario = () => 
    {
        let url = "/api/registroCrearUsuario";

        let tipoUsuario = "";

        if( determinarTipo(tipo) === "cliente" )
        {
            tipoUsuario = "cliente";
        }
        else if( determinarTipo(tipo) === "administrador" )
        {
            tipoUsuario = "terapeuta";
        }

        let parameters = { datosUsuario:form, tipo:tipoUsuario };

        let resultadoValidacion = validarCampos(form);

        if( resultadoValidacion !== "validos" )
        {

            setValidacionNombre( resultadoValidacion["validacionNombre"] );

            setValidacionTelefono( resultadoValidacion["validacionTelefono"] );
    
            setValidacionEdad( resultadoValidacion["validacionEdad"] );
    
            setValidacionEmail( resultadoValidacion["validacionEmail"] );
    
            setValidacionPassword( resultadoValidacion["validacionPassword"] );
    
            return;
        }

        const accionThen = (response) =>{
            if( response.data.status === "success" )
            {
                window.location.href = '/'; 
            }
            if( response.data.status === "not-success" )
            {

                if( response.data.message === "usuario-ya-existe" )
                {
                    setMensajeModal("El email seleccionado ya existe en la base de datos. Por favor escriba un email diferente");
                }
                else if( response.data.message === "conexion-no-exitosa" )
                {
                    setMensajeModal("Hubo un problema. Por favor intente de nuevo");
                }
                else if( response.data.message === "campos-no-validos" )
                {
                    setMensajeModal("Algun campo tiene un formato incorrecto. Por favor verifique la información contenga el formato solicitado.");
                }
                else
                {
                    setMensajeModal("Hubo un problema. Por favor intente de nuevo");
                }

                setShowModalError( true );

                return;
            }
        }

        requestPost( url , parameters, accionThen , undefined , setLoading  );

    }

    return(
        <>
           <Loading loading={loading}/> 
            <div>
                { 
                    determinarTipo(tipo) === "cliente"
                    ?
                    (
                        <BarraPrincipal/>                    
                    )
                    :
                    (
                        <></>
                    )
                } 

                { 
                    determinarTipo(tipo) === 'administrador' 
                    ?
                    (
                        <BarraPrincipalAdministrador/>                    
                    )
                    :
                    (
                        <></>
                    )
                } 
                
                <div className="container px-4 px-lg-5 h-100">
                <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
                <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
                <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                    <div className="col-lg-6">
                    <div className=" bgcolor-content-card text-dark" align="center" >
                        <br></br>
                            <h4>Registro</h4>
                        <br></br>
                    
                    <FormularioRegistro 
                    crearUsuario={crearUsuario} 
                    handleOnChange={handleOnChange} 
                    validacionNombre={validacionNombre} 
                    validacionTelefono={validacionTelefono} 
                    validacionEdad={validacionEdad} 
                    validacionEmail={validacionEmail}
                    validacionPassword = {validacionPassword}
                    />
                </div>
                </div>
                </div>
                </div>



                <ErrorRegistrarse show={showModalError} setExternalShow={setShowModalError} mensaje={mensajeModal} />
            </div>
        </>
    )
}