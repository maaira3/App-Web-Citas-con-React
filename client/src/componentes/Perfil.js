import BarraPrincipal from './cliente/BarraPrincipal'
import avatar from  './../images/avatar.png'
import  { React, useEffect, useState } from 'react'
import TablaHistorial from './TablaHistorial'
import BarraPrincipalTerapeuta from './terapeuta/BarraPrincipalTerapeuta'
import {requestGetAwait} from "../helpers/Request"
import Loading from "./Loading";





const tipousuario = localStorage.getItem('tipo')
const idusuario = localStorage.getItem('id')

export default function Perfil() {
    const [ user, setUser ] = useState({})
    const [ HistorialSesiones, setHistorialSesiones ] = useState([])
    const [imagebinary, setImagebinary] = useState(null)
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getUser()
    },[])

    async function getUser(){
        const { data } = await requestGetAwait(`user/${idusuario}/${tipousuario}`,{},setLoading);
        if(data.data!==0){
            setUser(data.data)
            if(tipousuario==='terapeuta'){
                getHistorialSesiones(data.data.idterapeuta)
                var imgblob= data.data.rutaImagen;
                if(imgblob===null){
                    setImagebinary(null)
                }else{
                    const resb = await fetch(`bringImgs/${imgblob}`);
                    const datab = await resb.blob();
                    var sauce= URL.createObjectURL(datab)
                    setImagebinary(sauce)
                }
            }
            if(tipousuario==='cliente'){
                getHistorialSesiones(data.data.idcliente)
                setImagebinary(null)
            } 
        }
    }

    async function getHistorialSesiones(id){
        const { data } = await requestGetAwait(`HistorialSesiones/${id}/${tipousuario}`,{},setLoading);
        setHistorialSesiones(data.data)
    }

    return (
        <>
            <Loading loading={loading} />
            {tipousuario==='cliente'
            ?<>
            <BarraPrincipal/>
            </>
            :<>
            <BarraPrincipalTerapeuta/>
            </>
            }
            <div className="container px-4 px-lg-5 h-100 border">
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-lg-6">
                    <div className="p-3 mb-2 bg-light text-dark border" align="center">
                        <h4>Información de perfil</h4>
                        <div className="text-center">
                            <img src={(imagebinary===null||imagebinary==='') ? avatar : imagebinary} width="98" height="100" className="rounded" alt="imagen de perfil"/>
                            </div>
                            <br/>
                            <div >
                            <b>Nombre: </b><label value="" > {user.nombre} </label>
                            </div>
                            <div >
                            <b>Telefono: </b><label> {user.telefono} </label>
                            </div>
                            <div >
                            <b>Edad: </b><label> {user.edad} años </label>
                            </div>
                            <div >
                            <b>Email: </b><label> {user.email} </label>
                            </div>
                            {tipousuario==='cliente'
                            ?<>
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
                            </>
                            :<>
                            <div >
                                <b>Descripción:</b> <label > {user.descripcion}</label>
                            </div>
                            </>
                            }
                            <div >
                                <a className="btn btn-primary" href="/modificar-perfil" role="button">Modificar información</a>
                            </div >
                            <br/>
                            <h4>Historial de sesiones</h4>
                            <br></br>
                            {HistorialSesiones!==[]
                            ?
                                <TablaHistorial
                                    HistorialSesiones={HistorialSesiones}
                                />
                            :<></>
                            }        
                    </div>
                </div>
           </div>
           </div>
        </>
    )
}
