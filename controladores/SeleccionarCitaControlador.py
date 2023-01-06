from flask import Flask
from flask import request
from modelos.ClienteRepositorio import obtenerClientePorId,actualizarPagoServicio
from modelos.HorariosRepositorio import obtenerHorariosTerapeutaDB
from modelos.HorariosRepositorio import obtenerHorarioPorFechaBD
from modelos.HorariosRepositorio import actualizarEstadoHorarioBD
from helpers.EstructurarHorarioHelper import crearCalendarioCitas
from json.decoder import JSONDecodeError
from __main__ import app
import json



@app.route("/api/obtenerHorariosTerapeuta",methods=['POST'])
def obtenerHorariosTerapeuta():

    try:

        #Obtiene los parametros

        parameters = request.json

        idCliente = parameters["idCliente"]

        #Obtiene el cliente por id

        resultadoConsulta = obtenerClientePorId( idCliente )

        if( resultadoConsulta["status"] == 'not-success' ):
            return { "status":"not-success", "message": resultadoConsulta["message"] }    

        cliente = resultadoConsulta["cliente"]   

        #Valida si ya pago el servicio 

        if( cliente["pagoServicio"] == 0 ):
            return { "status":"not-success", "message": 'cliente-no-pago-servicio' }                

        #Obtiene los horarios del terapeuta del cliente

        resultado = obtenerHorariosTerapeutaDB( cliente["idTerapeuta"] , 1 )

        #Si no tuvo exito la consulta de horarios
        if( resultado["status"] == "not-success"  ):
            return {"status":"not-success", "message":resultado["message"] }

        #Le da forma a la informacion de los horarios

        calendario = crearCalendarioCitas( resultado["horariosTerapeuta"] )

        #Retorna los horarios

        return { "status":"success" , "message":'' ,"calendario":calendario  } 

    except JSONDecodeError  as e:    
        return { "status":"not-success", "message": str(e) }

@app.route("/api/solicitarCita",methods=["POST"])
def solicitarCita():
    try:
        #Obtiene los parametros

        parameters = request.json

        fecha = parameters["horario"]

        idCliente = parameters["idCliente"]

        #Obtiene la informacion del horario solicitado

        resultado = obtenerHorarioPorFechaBD( fecha )

        if( resultado["status"] == "not-success" ):
            return {"status":"not-success","message":resultado["message"]}

        horario = resultado["horario"]  

        #Valida si se encuentra disponible el horario
        
        if( horario["estado"] == 0 ):
            return {"status":"not-success","message":"horario-no-disponible"}

        #Cambia el horario a no disponible

        resultado = actualizarEstadoHorarioBD( horario["idhorario"] , 0 )

        if( resultado["status"] == "not-success" ):
            return {"status":"not-success","message":resultado["message"]}
        
        #Cambia el estado de servicio a no pagado

        actualizarPagoServicio( idCliente , 0 )    

        return {"status":"success","message":"","pagoServicio":0,"res":resultado}

        

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}