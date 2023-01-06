import {requestGetAwait, requestPostAwait} from "../helpers/Request"
import  { React, useState, useEffect } from 'react'
import BarraPrincipal from './cliente/BarraPrincipal'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import BarraPrincipalTerapeuta from './terapeuta/BarraPrincipalTerapeuta';
import Loading from "./Loading";




const idusuario = localStorage.getItem('id')
const tipousuario = localStorage.getItem('tipo')

export default function ModificarContrasena() {
    let history = useNavigate();
    const [contrasenausuario, setContrasenaUsuario] = useState("")
    const [loading,setLoading] = useState(false);
    const [errorvalidacion,setErrorValidacion] = useState({
        actual:'',
        confirmacion:'',
        vacios:''
    })
    const [error, setError] = useState({
        actual:'',
        confirmacion:'',
        vacios:''
    })
    const [contrasena, setContrasena] = useState({
        actual:'',
        nueva:'',
        confirmacion:''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setContrasena({
            ...contrasena,
            [name]: value
        });
    }

    async function getPassword(){
        const { data } = await requestGetAwait(`api/ContrasenaUsuario/${idusuario}`,setLoading); 
        setContrasenaUsuario(data.data.password)
    }

    
    useEffect(() => {
        getPassword()
    },[])

    async function setPassword(){
        const obj = {password:contrasena.nueva}
        const {data} = await requestPostAwait(`api/ActualizarContrasena/${idusuario}`,obj,setLoading);
        if(data.status==="success"){
            Swal.fire({
                icon: 'success',
                title: 'La contraseña ha sido modificada.',
                showConfirmButton: false,
                timer: 2000
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se pudo modificar la contraseña, intente de nuevo.',
                showConfirmButton: false,
                timer: 2000
              })
        }
    }

    function ValidarContrasenas(){
        getPassword()
        if(contrasenausuario!==contrasena.actual){
            setError({...error, ['actual']: "La contraseña es incorrecta, ingrese nuevamente."})
            setTimeout(function(){
                setError({...error, ['actual']:""})
            }, 2000);
            errorvalidacion.actual=true
        }else{
            errorvalidacion.actual=false
        }

        if(contrasena.nueva!==contrasena.confirmacion){
            setError({...error, ['confirmacion']:"La contraseña actual y de confirmación deben de coincidir, ingrese nuevamente."})
            setTimeout(function(){
                setError({...error,['confirmacion']:""})
            }, 2000);
            errorvalidacion.confirmacion=true
        }else{
            errorvalidacion.confirmacion=false
        }

        if(contrasena.nueva===''||contrasena.confirmacion===''||contrasena.actual===''){
            setError({...error, ['vacios']:"Favor de llenar todos los campos."})
            setTimeout(function(){
                setError({...error,['vacios']:""})
            },2000);
            errorvalidacion.vacios=true
        }else{
            errorvalidacion.vacios=false
        }
        CambiarContrasena()
    }

    function CambiarContrasena(){
        if(errorvalidacion.actual===false&&errorvalidacion.confirmacion===false&&errorvalidacion.vacios===false){
            setPassword()
            history("/modificar-perfil");
        }
    }

    return (
        <div>
            <Loading loading={loading} />
            {tipousuario==='cliente'
            ?<>
            <BarraPrincipal/>
            </>
            :<>
            <BarraPrincipalTerapeuta/>
            </>
            }
            <div className="container px-4 px-lg-5 h-100">
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-lg-6">
                <div className="p-3 mb-2 bgcolor-content-card text-dark " align="center">
                    <br/>
                    <h4>Cambiar contraseña</h4>
                    <br/>
                    <div className="form-group col-md-6" >
                        <label htmlFor="passwordActual"> <b>Contraseña actual </b></label>
                        <input type="password" className="form-control" name="actual" onChange={ handleChange}/>
                    </div>
                    <div className="form-group col-md-6"  >
                        <label htmlFor="passwordNueva"><b>Nueva contraseña</b></label>
                        <input type="password" className="form-control" name="nueva" onChange={ handleChange}/>
                    </div>
                    <div className="form-group col-md-6" >
                        <label htmlFor="passwordConfirmacion"><b>Confirmación contraseña</b></label>
                        <input type="password" className="form-control" name="confirmacion" onChange={ handleChange}/>
                    </div>
                    {error.vacios && <p className="error-text">{error.vacios}</p>}
                    {error.actual && <p className="error-text">{error.actual}</p>}
                    {error.confirmacion && <p className="error-text">{error.confirmacion}</p>}
                    <br/>
                    <div className="form-group col-md-6" >
                        <button type="submit" className="btn btn-primary" onClick={ValidarContrasenas}>Cambiar contraseña</button>
                    </div >
                    <br/>
                    <br/>
                </div>
                </div>
        </div>
        </div>
        </div>
)
}
