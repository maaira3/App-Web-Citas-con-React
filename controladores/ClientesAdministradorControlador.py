from flask import Flask
from modelos.AdministradorRepositorio import *
from json.decoder import JSONDecodeError
from __main__ import app

@app.route("/terapeutas", methods=['GET'])
def TerapeutasTablaClientes():
    try:
       
        #Valida si existen los terapeutas     
        terapeutasEncontrados = obtenerTerapeutas()   
        if( terapeutasEncontrados != None ):
            return {"status":"success","message":"usuario-existe", "data": terapeutasEncontrados}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/cliente/<idcliente>/<idterapeuta>", methods=['POST'])
def AsignarTerapeuta(idcliente, idterapeuta):
    try:
       
        #Valida si se pudo actualizar el terapeuta     
        terapeutaActualizado = ActualizarTerapeuta(idcliente, idterapeuta)  
        if( terapeutaActualizado != 'not-success' ):
            return {"status":"success","message":"usuario-existe", "data": 'success'}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":"not-success"}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}