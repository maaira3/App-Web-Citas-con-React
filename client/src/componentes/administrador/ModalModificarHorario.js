import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from "react";
import CalendarioCitas from '../terapeuta/CalendarioCitas';

export default function ModalModificar(props){

    //Obtiene los atributos
    const setExternalShow = props.setExternalShow;

    //Define vairables globales a usar
    const [show, setShow] = useState(false);

    const [terapeuta,setTerapeuta] = useState( {} );

    //Actualiza el show local y el show externo
    const handleClose = () => 
    {
        setShow(false);

        setExternalShow(false);
    };

    //Iguala el show local con el show externo, se ejecuta cuando el atributo show cambia
    useEffect(() => 
    {
        setShow( props.show );  
        
        setTerapeuta( props.terapeuta );  
       
    }, [ props.show, props.terapeuta ]);

    return (
        <>
            <Modal show={show}  onHide={handleClose} size="xl">
                <Modal.Header>
                    <Modal.Title>Modificar Informacion De Terapeuta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <CalendarioCitas idTerapeuta={terapeuta.idTerapeuta} accionDespuesGuardar={handleClose} /> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}> Cerrar </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}