import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from "react";

export default function ErrorRegistrarse(props)
{
    //Obtiene los atributos
    const setExternalShow = props.setExternalShow;

    const mensaje = props.mensaje;

    //Define vairables globales a usar
    const [show, setShow] = useState(props.show);

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
    }, [ props.show ]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>UPS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensaje} 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}> Aceptar </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}