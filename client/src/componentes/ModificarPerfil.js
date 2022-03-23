import  { React, useEffect, useState } from 'react'
import avatar from  './../images/avatar.png'
import BarraPrincipal from './cliente/BarraPrincipal'
import {requestGetAwait, requestPutAwait, requestPostAwait} from "../helpers/Request"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import BarraPrincipalTerapeuta from './terapeuta/BarraPrincipalTerapeuta';
import Loading from "./Loading";


const tipousuario = localStorage.getItem('tipo')
const idusuario = localStorage.getItem('id')

export default function ModificarPerfil() {

    const [imagebinary, setImagebinary] = useState(null)
    const [formDataS, setFormdatas]= useState(null)
    const [user, setUser] = useState({})
    const [errorimagen, setErrorImagen] = useState(false)
    const [loading,setLoading] = useState(false);


    async function getUser(){
        const { data } = await requestGetAwait(`user/${idusuario}/${tipousuario}`,{},setLoading);
        setUser(data.data)

        if(tipousuario==='terapeuta'){
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
            setImagebinary(null)
        }
    }

    

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    useEffect(() => {
        getUser()
    },[])

    

    const convertiraBase64=(archivos)=>{
        Array.from(archivos).forEach(archivo=>{
          if(archivo.type.match(/image.*/i)){
            const imgurl= URL.createObjectURL(archivo)
            setImagebinary(imgurl)
            var formData = new FormData();
            var fileField = document.querySelector("input[type='file']");
            formData.append('file', fileField.files[0]);
            setFormdatas(formData)
            setUser({
                ...user,
                ['imagen']: imgurl
            });
          }else{
              setImagebinary(null)
          }
        })
      }

      async function setImagen(){
        console.log(formDataS)
        const {data} = await requestPutAwait(`manejoImgs/${idusuario}`,formDataS,setLoading);
        if(data.status==='success'){
            setErrorImagen(false)
        }else{
            setErrorImagen(true)
        }
      }

      async function setDatos(){
        const obj = {
            nombre : user.nombre,
            telefono : user.telefono,
            edad : user.edad,
            email : user.email,
            descripcion : user.descripcion
        }

        /////////////////Inserción de los datos///////////////////////////////
        const {data} = await requestPostAwait(`ModificarPerfil/${idusuario}/${tipousuario}`,obj,setLoading);
        /////////////////Inserción de la imagen /////////////////////////////////
        setImagen()
        
        if(data.status==="success"&&errorimagen===false){
            Swal.fire({
                icon: 'success',
                title: 'Los datos han sido modificados.',
                showConfirmButton: false,
                timer: 2000
            })
            window.location.replace('/perfil');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se pudo modificar los datos, intente de nuevo.',
                showConfirmButton: false,
                timer: 2000
            })
            window.location.replace('');
        }

      }

      function ModificarInformacion(){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estas segur@ que desea guardar los cambios?',
            text: "No se podrán revertir los cambios después.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                setDatos()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Los datos no se modificaron.',
                'error'
              )
              window.location.replace("/perfil");
            }
          })
        
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
            <div className="container px-4 px-lg-5 h-100 border">
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-lg-6">
                    <div className="p-3 mb-2 bg-light text-dark border" align="center">
                    <h4>Modificar perfil</h4>
                    <div className="text-center">
                        <img src={(imagebinary===null) ? avatar : imagebinary} width="98" height="100" className="rounded" alt="imagen de perfil " align="center"/>
                    </div>
                    <br/>
                    {tipousuario==='cliente'
                    ?<></>
                    :<>
                    <div className="form-group-sm col-md-14" >
                        <form encType="multipart/form-data">
                        <label htmlFor="imagenPerfil"> <b>Imagen</b></label>
                        <input type="file" className="form-control" name="file" accept="image/*" onChange={(e)=>convertiraBase64(e.target.files)} />
                        </form>
                    </div>
                    <br/>
                    </>}
                    
                    <div className="form-group col-md-8" >
                        <label htmlFor="nombrePerfil"> <b>Nombre </b></label>
                        <input type="text" className="form-control" name="nombre" value={user.nombre} onChange={ handleChange}/>
                    </div>
                    <div className="form-group col-md-8"  >
                        <label htmlFor="telefonoPerfil" align="left"> <b>Telefono </b></label>
                        <input type="text" className="form-control" name="telefono" value={user.telefono} onChange={ handleChange}/>
                    </div>
                    <div className="form-group col-md-8" >
                        <label htmlFor="edadPerfil"> <b>Edad </b></label>
                        <input type="text" className="form-control" name="edad" value={user.edad} onChange={ handleChange}></input>
                        </div>
                    <div className="form-group col-md-8"  >
                        <label htmlFor="emailPerfil"> <b>Email </b></label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={ handleChange}/>
                    </div>
                    {tipousuario==='cliente'
                    ?<></>
                    :<>
                    <div className="form-group col-md-8"  >
                        <label htmlFor="emailPerfil"> <b>Descripción </b></label>
                        <input type="email" className="form-control" name="descripcion" value={user.descripcion} onChange={ handleChange}/>
                    </div>
                    </>
                    }
                    <br/>
                    <div className="form-group col-md-8" >
                        <a className="btn btn-primary"  href="/modificar-contrasena" role="button">Cambiar contraseña</a>
                    </div >
                    <br/>
                    <div className="form-group col-md-6" >
                        <button type="submit" className="btn btn-primary" onClick={ModificarInformacion} >Guardar cambios</button>
                    </div >
                    <br/>
                </div>
                </div>
        </div>
        </div>
        </div>
    )
}
