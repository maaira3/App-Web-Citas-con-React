from flask import Flask
from flask import request
from modelos.TerapeutaRepositorio import *
from modelos.GeneralRepositorio import *
from json.decoder import JSONDecodeError
from __main__ import app

@app.route("/Consultas/<idusuario>",methods=['GET'])
def getCitas(idusuario):
    try:
        #Valida si el usuario tiene consultas    
        consultasEncontrado = obtenerConsulta( idusuario)  

        print( consultasEncontrado )

        if( consultasEncontrado != None and consultasEncontrado != "not-success" ):
            return {"status":"success","message":"usuario-tiene-consultas", "data":consultasEncontrado}
        else:
            return {"status":"not-success","message":"usuario-no-tiene-consultas", "data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}