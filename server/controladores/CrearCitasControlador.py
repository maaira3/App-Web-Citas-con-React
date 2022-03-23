from __main__ import app
from flask import request
from modelos.TerapeutasRepositorio import obtenerTerapeutaPorId
from modelos.HorariosRepositorio import obtenerHorariosTerapeutaDB,crearHorariosBD,actualizarHorariosBD,borrarHorariosBD
from helpers.EstructurarHorarioHelper import crearCalendarioCitas
from json.decoder import JSONDecodeError

@app.route("/terapeuta/obtenerCalendario",methods=["POST"])
def obtenerCalendario():
    try:
        #Obtiene los parametros

        parametros = request.json

        idTerapeuta = parametros["idTerapeuta"]

        #Obtiene el terapeuta por id

        resultadoConsulta = obtenerTerapeutaPorId( idTerapeuta )

        if( resultadoConsulta["status"] == 'not-success' ):
            return { "status":"not-success", "message": resultadoConsulta["message"] }    

        terapeuta = resultadoConsulta["terapeuta"]            

        #Obtiene los horarios del terapeuta 

        resultado = obtenerHorariosTerapeutaDB( idTerapeuta , "cualquiera" )

        #Si no tuvo exito la consulta de horarios
        if( resultado["status"] == "not-success"  ):
            return {"status":"not-success", "message":resultado["message"] }

        #Le da forma a la informacion de los horarios

        calendario = crearCalendarioCitas( resultado["horariosTerapeuta"] )

        #Retorna los horarios

        return { "status":"success" , "message":'' ,"calendario":calendario  } 

    except JSONDecodeError as e:
        return {"status":"not-success","message":str(e)}


@app.route("/terapeuta/guardarCalendario",methods=["POST"])
def guardarCalendario():
    try:
        #Obtiene los parametros

        parametros = request.json

        idTerapeuta = parametros["idTerapeuta"]

        horariosNuevos = parametros["horariosNuevos"]

        horariosBorrados = parametros["horariosBorrados"]

        horariosActualizados = parametros["horariosActualizados"]

        crearHorariosBD( idTerapeuta ,horariosNuevos )        

        actualizarHorariosBD( idTerapeuta,horariosActualizados )

        borrarHorariosBD( idTerapeuta,horariosBorrados )

        return { "status":"success" , "message":'' ,"calendario":horariosActualizados  } 

    except JSONDecodeError as e:
        return {"status":"not-success","message":str(e)}        