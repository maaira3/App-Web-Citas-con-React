import  { React, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import {deletePost, requestPostAwait, requestPutAwait } from "../helpers/Request"

const tipousuario = localStorage.getItem('tipo')

export default function Post(props) {

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [imagebinary, setImagebinary] = useState(null)
    const [formDataS, setFormdatas]= useState(null)
    const [post, setPost] = useState(
      {
        titulo:props.titulo, 
        contenido: props.contenido
      })
    const [errorimagen, setErrorImagen] = useState(false)
    const [loading,setLoading] = useState(false);


    function handleClose(option){
        if(option==='view')
            setShowView(false);
        if(option==='edit')
            setImagebinary(null);
            setShowEdit(false);
    };
    function handleShow(option){
        if(option==='view')
            setShowView(true);
        if(option==='edit')
            setShowEdit(true);
    } 

    const handleChange = e => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        });
    }

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

    async function deletePostBlog(idpost){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estas segur@?',
            text: "No se podrán revertir los cambios después.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Si, eliminalo!',
            cancelButtonText: '¡No, cancela!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'El post ha sido eliminado de forma correcta.',
                'success'
              )
              deletePost(idpost)
              props.getPosts()
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'El post no se eliminó.',
                'error'
              )
            }
          })

    }
    
    async function setImagen(){
        console.log(formDataS)
        const {data} = await requestPutAwait(`blog/manejoImgs/${props.idpost}`,formDataS,setLoading);
        if(data.status==='success'){
            setErrorImagen(false)
        }else{
            setErrorImagen(true)
        }
      }

    async function setPostBlog(idpost){
        const obj = {
            titulo : post.titulo,
            contenido : post.contenido
        }
        /////////////////Inserción de los datos///////////////////////////////
        const { data } = await requestPostAwait( `blog/post/update/${idpost}` , obj, setLoading )
        /////////////////Inserción de la imagen /////////////////////////////////
        if(imagebinary!==null)
          setImagen()
        
        if(data.status==="success"&&errorimagen===false){
            Swal.fire({
                icon: 'success',
                title: 'Los datos han sido modificados.',
                showConfirmButton: false,
                timer: 2000
            })
            setImagebinary(null)
            window.location.replace('/blog');
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

    function updatePostBlog(idpost){
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
                setPostBlog(idpost)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'El post no se modificó.',
                'error'
              )
            }
          })
        
      }

    return (
        <div className="">
            {tipousuario==="administrador"
            ?
            <div align="right">
                <button className='btn-blog' onClick={handleShow.bind(this,'edit')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </button>
                <button className='btn-blog' onClick={deletePostBlog.bind(this, props.idpost)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg " viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                    <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                </svg>
                </button>
            </div>

            :<div/>}
            <div className="text-center">
                <img src={props.imagenpost} width="100%" height="270" alt="imagen post"/>
            </div>
            <br/>
            <div align="justify" className="text-post"> {props.contenido}</div>
            <br/>
            <div className="card-buttons" align="center">
                <button className="btn btn-post" onClick={handleShow.bind(this,'view')} > + </button>   
            </div>
            <Modal
            show={showView}
            onHide={handleClose.bind(this,'view')}
            backdrop="static"
            keyboard={false}
            size="xl"
            >
            <Modal.Header>
                <Modal.Title align="center">{props.titulo}</Modal.Title>
            </Modal.Header>
            <form id="formEdit"> 
            <Modal.Body>
                    <div className="" align="center">
                        <img  src={props.imagenpost} width="250" height="250" alt="imagen post"/>
                        <br/>
                    <div >
                    <br/>
                        <p className="parrafo">{props.contenido}</p>
                    </div>
                    </div> 
            </Modal.Body>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose.bind(this,'view')}>Cerrar</Button>
            </Modal.Footer>
            </Modal>

            <Modal
                show={showEdit}
                onHide={handleClose.bind(this,'edit')}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title><b>Editar Post</b></Modal.Title>
                </Modal.Header>
                <form id="formLink"> 
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                        <div className="form-group" align="center">
                            <img  src={(imagebinary===null) ? props.imagenpost : imagebinary} width="150" height="150" className="rounded" alt="imagen post"/>
                            <div>
                                <label className="col-form-label"><b> Imagen:</b></label>
                             <input type="file" className="form-control" id="file" name="file" accept="image/*" onChange={(e)=>convertiraBase64(e.target.files)}/>
                            </div>
                            <br/>
                        <div >
                            <label className="col-form-label"><b>Titulo:</b></label>
                            <input type="text" className="form-control" name="titulo" defaultValue={props.titulo} onChange={ handleChange} autoFocus/>
                        </div>
                        <div >
                            <label className="col-form-label"><b>Contenido:</b></label>
                            <textarea type="text" className="form-control" name='contenido'  rows="10"  defaultValue={props.contenido} onChange={ handleChange}/>
                            
                        </div>
                        </div>
                        </div>
                        </div>   
                </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose.bind(this,'edit')}>
                    Cerrar
                    </Button>
                    <Button variant="primary"  onClick={updatePostBlog.bind(this,props.idpost)} >Guardar</Button>
                </Modal.Footer>
                </Modal>
    </div>

    )
}
