import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import imagen from './../images/imagen.svg'
import newPost from './../images/newpost.svg'
import Swal from 'sweetalert2'
import { requestPutAwait, requestPostAwait} from "../helpers/Request"
import Loading from "./Loading";

const baseURL = process.env.REACT_APP_API_URL

export default function NuevoPost() {

    const [show, setShow] = useState(false);
    const [imagebinary, setImagebinary] = useState(null)
    const [formDataS, setFormdatas]= useState(null)
    const [post, setPost] = useState({})
    const [errorimagen, setErrorImagen] = useState(false)
    const [loading,setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const convertiraBase64=(archivos)=>{
        Array.from(archivos).forEach(archivo=>{
          if(archivo.type.match(/image.*/i)){
            const imgurl= URL.createObjectURL(archivo)
            setImagebinary(imgurl)
            var formData = new FormData();
            var fileField = document.querySelector("input[type='file']");
            formData.append('file', fileField.files[0]);
            setFormdatas(formData)
            setPost({
                ...post,
                ['imagen']: imgurl
            });
          }else{
              setImagebinary(null)
          }
        })
      }

    const handleChange = e => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        });
    }

    async function setImagen(idpost){
        const {data} = await requestPutAwait(baseURL + `api/blog/manejoImgs/${idpost}`,formDataS,setLoading);
        if(data.status==='success'){
            setErrorImagen(false)
        }else{
            setErrorImagen(true)
        }
      }
    
    async function GuardarPost(){
        /////////////////Inserción de los datos///////////////////////////////
        const {data} = await requestPostAwait(baseURL + `api/blog/post`, post,setLoading);
        /////////////////Inserción de la imagen /////////////////////////////////
        setImagen(data.data)
        
        if(data.data!=="-1"&&errorimagen===false){
            Swal.fire({
                icon: 'success',
                title: 'El post ha sido agregado.',
                showConfirmButton: false,
                timer: 2000
            })
            window.location.replace('');
            handleClose()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se pudo agregar el post, intente de nuevo.',
                showConfirmButton: false,
                timer: 2000
            })
        }

      }
      
      function NuevoPost(){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estas segur@ que desea guardar el post?',
            text: "No se podrán revertir los cambios después.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                GuardarPost()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'El post no se agregará.',
                'error'
              )
              handleClose()
            }
          })
        
      }

    return (
        <div className="">
            <Loading loading={loading} />
            <div className="card-body-new">
               <br/>
                <div align="center">
                    <img  src={newPost} width="100" height="100" className="rounded" alt="imagen usuario" onClick={handleShow}/>
                </div>
                <div align="center">
                    <label className="col-form-label" ><b>Nuevo Post</b></label>
                </div>
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title><b>Nuevo Post</b></Modal.Title>
                </Modal.Header>
                <form id="formLink"> 
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="form-group" align="center">
                            <img  src={(imagebinary===null) ? imagen : imagebinary} width="150" height="150" className="rounded" alt="imagen usuario"/>
                            <div>
                                <label className="col-form-label"><b> Imagen:</b></label>
                             <input type="file" className="form-control" id="file" name="file" accept="image/*" onChange={(e)=>convertiraBase64(e.target.files)}/>
                            </div>
                            <br/>
                        <div >
                            <label className="col-form-label"><b>Titulo:</b></label>
                            <input type="text" className="form-control" name="titulo" value={post.titulo} onChange={ handleChange} autoFocus/>
                        </div>
                        <div >
                            <label className="col-form-label"><b>Contenido:</b></label>
                            <textarea type="text" className="form-control" name='contenido'  rows="10"  value={post.contenido} onChange={ handleChange}/>
                            
                        </div>
                        </div>
                        </div>
                        </div>   
                </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                    </Button>
                    <Button variant="primary" onClick={NuevoPost}>Agregar</Button>
                </Modal.Footer>
                </Modal>
            </div>
        </div>

    )
}
