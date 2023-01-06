import React, { useState } from 'react'
import BarraPrincipal from "./BarraPrincipal";
import { useMercadopago } from 'react-sdk-mercadopago';
import {requestPost} from "../../helpers/Request";

export default function Pago(props) {


  const mercadopago = useMercadopago.v2('TEST-d75b5a30-f129-460f-930e-c4ec0eaf0554', {
    locale: 'es-CO' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  });

  const realizarPago = () => {
    const orderData = {
      id: props.id,
      quantity: 1,
      description: props.descripcion,
      price: props.precio,
      numsessions: props.cantidadsesiones,
    };
      
    fetch("/create_preference", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function(response) {
        console.log(response)
          return response.json();
      })
      .then(function(preference) {
          console.log(preference);
          createCheckoutButton(preference.id);
      })
      .catch(function() {
          alert("Unexpected error");
      });

}

// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  mercadopago.checkout({
    preference: {
      id: preferenceId
    },
    autoOpen: true,
  });
}

  return (
    <>
      <BarraPrincipal/>
      <div>
           
      <div className="payment-form dark">
        <div className="container_payment">
          <div className="block-heading">
            <h2>Pago de Consulta</h2>
            <p>Una vez efectuado el pago de la consulta psicologica podrá seleccionar el día y hora de su cita.</p>
          </div>
          <div className="form-payment">
            <div className="products">
              <h2 className="title">Resumen</h2>
              <div className="item">
                <span className="price" id="summary-price">${props.precio}</span>
                <p className="item-name">{props.nombre} <span id="summary-quantity"></span></p>
              </div>
              <div className="total">Total<span className="price" id="summary-total">${props.precio}</span></div>
            </div>
            <div className="payment-details">
              <div className="form-group col-sm-12">
                <br/>      
                <div id="button-checkout" align="center">
                  <button  id="btn-pago" className='btn btn-pago' onClick={realizarPago} >Pagar</button>
                </div>                 
                <br/>
                <a id="go-back" onClick={() => props.setCompra(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" >
                    <path fill="#009EE3" fill-rule="nonzero"id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                  </svg>
                  Volver a los servicios
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div> 
    </>
  )
}
