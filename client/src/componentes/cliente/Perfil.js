import BarraPrincipal from './BarraPrincipal'
import avatar from  './../../images/avatar.png'
import {requestGetAwait} from "../../helpers/Request";
import  { React, useEffect, useState } from 'react'
import TablaHistorial from './TablaHistorial'
import Loading from "../Loading";

const baseURL = process.env.REACT_APP_API_URL
const tipousuario = localStorage.getItem('tipo')
const idusuario = localStorage.getItem('id')

export default function Perfil() {

    const [ user, setUser ] = useState({})
    const [ HistorialSesiones, setHistorialSesiones ] = useState([])
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function getUser(){
        const { data } = await requestGetAwait(baseURL + `api/user/${idusuario}/${tipousuario}`,{},setLoading);
        setUser(data.data)
        getHistorialSesiones(data.data.idcliente)
    }

    async function getHistorialSesiones(id){
        const { data } = await requestGetAwait(baseURL + `api/HistorialSesiones/${id}`,{},setLoading);
        console.log(data.data)
        setHistorialSesiones(data.data)
    }

    return (
        <>
            <Loading loading={loading} />
            <BarraPrincipal/>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-lg-6">
                    <div className="p-3 mb-2 bg-light text-dark" align="center">
                        <h4>Información de perfil</h4>
                        <div className="text-center">
                            <img src={avatar} alt="" width="98" height="100" className="rounded"/>
                            </div>
                            <br/>
                            <div >
                            <b>Nombre: </b><label value="" > {user.nombre} </label>
                            </div>
                            <div >
                            <b>Telefono: </b><label> {user.telefono} </label>
                            </div>
                            <div >
                            <b>Edad: </b><label> {user.edad} </label>
                            </div>
                            <div >
                            <b>Email:</b><label> {user.email} </label>
                            </div>
                                <div >
                                <b>Proxima cita: </b><label> {user.horarioSesion} &nbsp;</label>
                                <a className="btn btn-primary" href="../Principal/verHorarios.php" role="button">Cambiar cita</a>
                                </div>
                                <div >
                                <b>Terapeuta:</b> <label > {user.terapeuta}</label>
                                </div>
                                <div >
                                <b>Link: </b><label > {user.link} </label>
                                </div>
                                <br/>
                                <div >
                                <a className="btn btn-primary" href="/modificar-perfil" role="button">Modificar información</a>
                                </div >
                                <br/>
                                <h4>Historial de sesiones</h4>
                                <br></br>
                                <TablaHistorial
                                    HistorialSesiones={HistorialSesiones}
                                 />
                    </div>
                </div>
           </div>
           </div>
        </>
    )
}
