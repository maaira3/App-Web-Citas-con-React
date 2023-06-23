import  { React, useState } from 'react'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios' //npm i axios
import requestPostAwait from "../../helpers/Request"

const tipousuario = localStorage.getItem('tipo')
const baseURL = process.env.REACT_APP_API_URL

export default function Servicio(props) {

  const [showEdit, setShowEdit] = useState(false);
  const [loading,setLoading] = useState(false);
  const [servicioedit, setServicioEdit] = useState({
      nombre:props.nombre,
      descripcion:props.descripcion,
      cantidadsesiones: props.cantidadsesiones,
      precio:props.precio,
  })

  const realizarCompra = () => {
    props.setCompra(true)
    props.setServicio({
      id:props.id,
      nombre:props.nombre,
      descripcion:props.descripcion,
      cantidadsesiones: props.cantidadsesiones,
      precio:props.precio,
  })
  }

  function handleClose(option){
        setShowEdit(false);
  };

  function handleShow(){
     setShowEdit(true);
  } 

  const handleChange = e => {
      const { name, value } = e.target;
      setServicioEdit({
          ...servicioedit,
          [name]: value
      });
  }

  async function guardarServicio(id){

    /////////////////Inserción de los datos///////////////////////////////
    const {data} = await axios.post(baseURL + `api/servicios/servicio/update/${id}`, servicioedit);

    if(data.status==="success"){
        Swal.fire({
            icon: 'success',
            title: 'Los datos han sido modificados.',
            showConfirmButton: false,
            timer: 2000
        })
        window.location.replace('/servicios');
    }else{
        Swal.fire({
            icon: 'error',
            title: 'No se pudo modificar los datos, intente de nuevo.',
            showConfirmButton: false,
            timer: 2000
        })
        window.location.replace('/servicios');
    }

  }

  function editarServicio(id){
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
           guardarServicio(id)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El servicio no se modificó.',
            'error'
          )
        }
      })
    
  }

  

  async function eliminarServicio(id){
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
            'El servicio ha sido eliminado de forma correcta.',
            'success'
          )
          const { data } = axios.post(baseURL + `/api/servicios/eliminar/${id}`)
          window.location.replace('/servicios');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El servicio no se eliminó. Intente de nuevo.',
            'error'
          )
        }
      })

}

  return (

  <div className="info">
    {tipousuario!=='administrador'
    ?<></>
    :<button className='btn-blog' onClick={eliminarServicio.bind(this, props.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg " viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
              <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
          </svg>
      </button>
    }
    
    <div className="product-details">
        <div className="product-detail">
        <h5>Servicio</h5>
        <div className="product-info">
            
            <p><b>Servicio: </b><span id="product-description">{props.nombre}</span><br/>
            <b>Descripción: </b>{props.descripcion}<br/>
            <b>Precio: </b>{props.precio}<br/>
            </p>
            <div id="button-checkout" align="center">
              
                {tipousuario==="cliente"
                ? <button  id="btn-pago" className='btn' onClick={realizarCompra}>Comprar</button>
                :tipousuario==='administrador'
                  ? <button  id="btn-pago" className='btn' onClick={handleShow}>Editar</button>
                  :<></>
                }
 
            </div> 
        </div>
        </div>
    </div>
    <Modal
      show={showEdit}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header>
          <Modal.Title><b>Editar Servicio</b></Modal.Title>
      </Modal.Header>
      <form id="formLink"> 
      <Modal.Body>
          <div className="row">
              <div className="col-lg-12">
                <div >
                    <label className="col-form-label"><b>Nombre:</b></label>
                    <input type="text" className="form-control" name="nombre" defaultValue={props.nombre} onChange={ handleChange} autoFocus/>
                </div>
                <div >
                    <label className="col-form-label"><b>Descripcion:</b></label>
                    <textarea type="text" className="form-control" name='descripcion'  rows="2"  defaultValue={props.descripcion} onChange={ handleChange}/> 
                </div>
                <div >
                    <label className="col-form-label"><b>Cantidad Sesiones:</b></label>
                    <input type="text" className="form-control" name='cantidadsesiones'  defaultValue={props.cantidadsesiones} onChange={ handleChange}/> 
                </div>
                <div >
                    <label className="col-form-label"><b>Precio:</b></label>
                    <input type="text" className="form-control" name='precio' defaultValue={props.precio} onChange={ handleChange}/> 
                </div>
              </div>
          </div>  
      </Modal.Body>
      </form>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Cerrar
          </Button>
          <Button variant="primary"  onClick={editarServicio.bind(this,props.id)} >Guardar</Button>
      </Modal.Footer>
      </Modal>
</div>
  )
}
