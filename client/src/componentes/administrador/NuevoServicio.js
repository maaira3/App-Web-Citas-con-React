import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import {requestPostAwait} from "../../helpers/Request"

export default function NuevoServicio() {
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [service, setService] = useState({
        nombre:'',
        descripcion:'',
        cantidadsesiones: '',
        precio:'',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setService({
            ...service,
            [name]: value
        });
    }

    
    async function GuardarServicio(){
        /////////////////Inserción de los datos///////////////////////////////
        const {data} = await requestPostAwait(`api/servicios/nuevo`, service,setLoading);
        
        if(data.data!=="-1"){
            Swal.fire({
                icon: 'success',
                title: 'El servicio ha sido agregado.',
                showConfirmButton: false,
                timer: 2000
            })
            window.location.replace('/servicios');
            handleClose()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'No se pudo agregar el servicio, intente de nuevo.',
                showConfirmButton: false,
                timer: 2000
            })
        }

      }
      
      function NuevoServicio(){
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
                GuardarServicio()
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
            <div className="card-body-new">
               <br/>
                <button className='btn-add' align="center" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
                <br/>
                    <b>Nuevo Servicio</b>
                </button>
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title><b>Nuevo Servicio</b></Modal.Title>
                </Modal.Header>
                <form id="formLink"> 
                <Modal.Body>
                <div className="row">
                    <div className="col-lg-12">
                        <div >
                            <label className="col-form-label"><b>Nombre:</b></label>
                            <input type="text" className="form-control" name="nombre" defaultValue={service.nombre} onChange={ handleChange} autoFocus/>
                        </div>
                        <div >
                            <label className="col-form-label"><b>Descripcion:</b></label>
                            <textarea type="text" className="form-control" name='descripcion'  rows="2"  defaultValue={service.descripcion} onChange={ handleChange}/> 
                        </div>
                        <div >
                            <label className="col-form-label"><b>Cantidad Sesiones:</b></label>
                            <input type="text" className="form-control" name='cantidadsesiones'  defaultValue={service.cantidadsesiones} onChange={ handleChange}/> 
                        </div>
                        <div >
                            <label className="col-form-label"><b>Precio:</b></label>
                            <input type="text" className="form-control" name='precio' defaultValue={service.precio} onChange={ handleChange}/> 
                        </div>
                    </div>
                </div>  
 
                </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                    </Button>
                    <Button variant="primary" onClick={NuevoServicio}>Agregar</Button>
                </Modal.Footer>
                </Modal>
            </div>
        </div>

    )
}
