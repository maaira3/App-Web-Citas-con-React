from flask import Flask
from flask import request
from modelos.GeneralRepositorio import *
from json.decoder import JSONDecodeError
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from __main__ import app

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "dsankldqwp2310953nc812245" 
jwt = JWTManager(app)

@app.route("/login",methods=['POST'])
def IniciarSesion():
    try:
        #Obtiene los parametros 
        parameters = request.json
       
        #Valida si el usuario y contraseña existe en la base de datos      
        usuarioEncontrado = obtenerUsuario( parameters, 'cliente' )    

        if( usuarioEncontrado != None ):
            #Se crea token
            access_token = create_access_token(identity=usuarioEncontrado[0]['email'])
            usuarioEncontrado[0]['token']=access_token

            return {"status":"success","message":"usuario-existe", "data":usuarioEncontrado}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":usuarioEncontrado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/terapeuta/login",methods=['POST'])
def IniciarSesionTerapeuta():
    try:
        #Obtiene los parametros 
        parameters = request.json
       
        #Valida si el usuario y contraseña existe en la base de datos      
        usuarioEncontrado = obtenerUsuario( parameters , 'terapeuta')    

        if( usuarioEncontrado != None ):
            #Se crea token
            access_token = create_access_token(identity=usuarioEncontrado[0]['email'])
            usuarioEncontrado[0]['token']=access_token

            return {"status":"success","message":"usuario-existe", "data":usuarioEncontrado}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":usuarioEncontrado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/administrador/login",methods=['POST'])
def IniciarSesionAdministrador():
    try:
        #Obtiene los parametros 
        parameters = request.json
       
        #Valida si el usuario y contraseña existe en la base de datos      
        usuarioEncontrado = obtenerUsuario( parameters, 'administrador')    

        if( usuarioEncontrado != None ):
            #Se crea token
            access_token = create_access_token(identity=usuarioEncontrado[0]['email'])
            usuarioEncontrado[0]['token']=access_token

            return {"status":"success","message":"usuario-existe", "data":usuarioEncontrado}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":usuarioEncontrado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}