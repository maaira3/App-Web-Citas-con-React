from urllib import response
from flask import Flask
from flask import request
from modelos.ClienteRepositorio import *
from json.decoder import JSONDecodeError
from __main__ import app

# SDK de Mercado Pago
import mercadopago
from modelos.GeneralRepositorio import *

# Agrega credenciales
sdk = mercadopago.SDK("TEST-7765166333900586-121221-88c753ab01fe9a07172b544138757ad9-1262017546")

@app.route("/create_preference",methods=["POST"])
def crearPreferencia():
    
    try: 
        #Obtiene los parametros 
        parameters = request.json
        print("PRUEBA")
        print(parameters)
        # Crea un ítem en la preferencia
        preference_data = {
            
            "items": [
                {
                    "title": parameters['description'],
                    "quantity": parameters['quantity'],
                    "unit_price": parameters['price'],
                }
            ], 
            "back_urls": {
                "success": "http://localhost:3000/seleccionarCita",
                "failure": "http://localhost:3000/orden",
                "pending": "http://localhost:3000/orden"
            },
            "external_reference": parameters['numsessions'],
        }

        preference_response = sdk.preference().create(preference_data)
        print(preference_response["response"])
        return preference_response["response"]

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}


@app.route("/pago/ipn", methods=['GET'])
def IpnPago():
    try:
        payment = "hola"
        if( payment != None ):
            return {"status":"success","message":"payment-existe", "data": payment}
        else:
            return {"status":"not-success","message":"payment-no-existe", "data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/pago/update/<idusuario>", methods=['POST'])
def UpdatePago(idusuario):
    try:
        pagoactua = request.json
        print(pagoactua)
        pagoactualizado = actualizarPago(idusuario, 1)
        if( pagoactualizado != None ):
            return {"status":"success","message":"pago modificado", "data": pagoactualizado}
        else:
            return {"status":"not-success","message":"pago modificado", "data":[]}
    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/servicios", methods=['GET'])
def Servicios():
    try:
       
        #Valida si existen los servicios       
        serviciosEncontrados = obtenerServicios()    
        if( serviciosEncontrados != None ):
            return {"status":"success","message":"servicios-existe", "data": serviciosEncontrados}
        else:
            return {"status":"not-success","message":"servicios-no-existe", "data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/servicios/nuevo", methods=['POST'])
def NewServicio():
    try:
        servicio = request.json
        #Valida si se inserto el servicio      
        servicioinsertado = NuevoServicio(servicio)   
        print(servicioinsertado)
        if( servicioinsertado != -1 ):
            return {"status":"success","message":"servicio-insertado", "data":servicioinsertado }
        else:
            return {"status":"not-success","message":"servicio-no-insertado", "data":servicioinsertado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}


@app.route("/servicios/eliminar/<idservicio>", methods=['POST'])
def DeleteServicio(idservicio):
    try:
        #Valida si se eliminó el servicio      
        servicioeliminado = eliminarServicio(idservicio)   
        print(servicioeliminado)
        if( servicioeliminado != -1  ):
            return {"status":"success","message":"servicio-eliminado", "data":servicioeliminado }
        else:
            return {"status":"not-success","message":"servicio-no-eliminado", "data":servicioeliminado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/servicios/servicio/update/<idservicio>", methods=['POST'])
def UpdateServicio(idservicio):
    try:
        servicio = request.json
        #Valida si se modificó el servicio     
        serviciomodificado = ModifyServicio(idservicio, servicio)   
        print(serviciomodificado)
        if( serviciomodificado != -1 ):
            return {"status":"success","message":"post-modificado", "data":serviciomodificado }
        else:
            return {"status":"not-success","message":"post-no-modificado", "data":serviciomodificado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}