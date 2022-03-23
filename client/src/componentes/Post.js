import  { React, useState } from 'react'
import imagen from './../images/imagen.svg'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const tipousuario = localStorage.getItem('tipo')

export default function Post(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
        <div className="mb-3" max-width="20rem" >
        <div className="card-body-user">
            {tipousuario=="administrador"
            ?
            <div align="right">
                <button className='btn' >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                </svg>
                </button>
            </div>
            :<div/>}
            <div className="text-center">
                <img src={props.imagenpost} width="200" height="200" alt="imagen post"/>
            </div>
            <br/>
            <div align="center"><h5><b className="card-sub"> {props.titulo} </b></h5> </div>
            <br/>
            <div align="center" className="text-post"> {props.contenido}</div>
            <br/>
            <div className="card-buttons" align="center">
                <button className="btn btn-primary" onClick={handleShow} > Ver más... </button>   
            </div>
            <Modal
            show={show}
            onHide={handleClose}
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
                        <p className="">{props.contenido}</p>
                    </div>
                    </div> 
            </Modal.Body>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
    </div>
    </div>
    )
}
