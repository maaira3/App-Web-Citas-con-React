from flask import Flask
from flask import request
from modelos.ClienteRepositorio import obtenerClientePorEmail
from modelos.GeneralRepositorio import crearUsuarioBD,obtenerUsuario
from json.decoder import JSONDecodeError
from __main__ import app

"""
Registra a un cliente si el email pasado como parametro no existe en la base de datos
Parametros
nombre-> Nombre del cliente 
telefono-> Telefono del cliente
edad->Edad del cliente
email->Email del cliente 
password->Clave de la cuenta del cliente
Salidas
Se compone de 2 componentes [status,message] o [status,cliente]
*status->El resultado de la operacion, tiene los siguientes valores
-success -> Todas las operaciones salieron bien
-not-success -> Algo salio mal 
*message->El porque salio mal la operacion, tiene los siguientes valores
-cliente-ya-existe -> El email pasado como parametro ya se encuentra en la base de datos
-conexion-no-exitosa -> Si la conexion con la base de datos no se pudo establecer
-campos-no-validos -> Si algun campo del cliente no es valido
-exception -> Si ocurrio una excepcion
*cliente -> La informacion del cliente registrado si todo salio bien
"""

@app.route("/api/registroCrearUsuario",methods=['POST'])
def registroCrearUsuario():
    try:
        #Obtiene los parametros del usuario y el tipo de usuario a crear
        parameters = request.json

        usuario = parameters["datosUsuario"]

        tipo = parameters["tipo"]
       
        #Valida si el usuario ya existe en la base de datos        
        
        usuarioEncontrado =  obtenerUsuario( usuario,tipo )

        print( usuarioEncontrado )

        if( usuarioEncontrado != None ):
            return {"status":"not-success","message":"usuario-ya-existe"}       

        #Solicita crear el usuario en la base de datos
         
        resultado =  crearUsuarioBD( usuario , tipo )

        #Si no tuvo exito la creacion del usuario
        if( resultado["status"] == "not-success"  ):
            return {"status":"not-success", "message":resultado["message"] }

        return {"status":"success","usuario":usuario}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}
   