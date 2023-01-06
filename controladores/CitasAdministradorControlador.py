from flask import Flask
from modelos.AdministradorRepositorio import *
from json.decoder import JSONDecodeError
from __main__ import app

@app.route("/api/citas", methods=['GET'])
def CitasAdministrador():
    try:
       
        #Valida si existen los clientes       
        clientesEncontrados = obtenerClientes()    

        if( clientesEncontrados != None ):
            return {"status":"success","message":"usuario-existe", "data": clientesEncontrados}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}