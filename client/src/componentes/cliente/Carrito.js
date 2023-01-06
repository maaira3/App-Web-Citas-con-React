import React from 'react'
import BarraPrincipal from "./BarraPrincipal";
import Servicio from "./Servicio"
export default function Carrito() {
/*
    // Handle price update
    function updatePrice() {
        let quantity = document.getElementById("quantity").value;
        let unitPrice = document.getElementById("unit-price").innerHTML;
        let amount = parseInt(unitPrice) * parseInt(quantity);
        
        document.getElementById("cart-total").innerHTML = "$ " + amount;
        document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
        document.getElementById("summary-quantity").innerHTML = quantity;
        document.getElementById("summary-total").innerHTML = "$ " + amount; 
    }
        
    document.getElementById("quantity").addEventListener("change", updatePrice);
    updatePrice(); 
    */ 
  return (
    <>
    <BarraPrincipal/>
      <div>
    <div className="shopping-cart dark">
        <div className="container" id="container">
        <br/><br/><br/>
          <div className="block-heading">
            <h2>Servicios</h2>
            <p>Seleccione los servicios que desea comprar.</p> 
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  <div className="product">
                    <Servicio>
                    <div className="col-md-3 product-detail">
                        <label for="quantity"><h5>Cantidad</h5></label>
                        <input type="number" id="quantity" value="1" min="1" className="form-control"/>
                    </div>
                    </Servicio>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Carrito</h3>
                  <div className="summary-item"><span className="text">Subtotal</span><span className="price" id="cart-total"></span></div>
                  <button className="btn btn-primary btn-lg btn-block" id="checkout-btn">Pagar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
  )
}
