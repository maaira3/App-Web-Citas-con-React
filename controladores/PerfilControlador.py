from flask import Flask, send_from_directory, request
import os
from modelos.ClienteRepositorio import *
from modelos.GeneralRepositorio import *
from modelos.TerapeutaRepositorio import *
from json.decoder import JSONDecodeError
from __main__ import app

os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')

@app.route("/user/<idusuario>/<tipo>",methods=['GET'])
def getUser(idusuario,tipo):
    try:
        #Valida si el usuario y contraseña existe en la base de datos      
        usuarioEncontrado = obtenerUsuarioPorId( idusuario,tipo )  
        print(usuarioEncontrado)
        if( usuarioEncontrado != None ):
            return {"status":"success","message":"usuario-existe", "data":usuarioEncontrado[0]}
        else:
            return {"status":"not-success","message":"usuario-no-existe", "data":0}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/HistorialSesiones/<id>/<tipousuario>",methods=['GET'])
def getHistorialSesiones(id,tipousuario):
    try:
        #Valida si el usuario tiene historial de sesiones     
        historialSesiones = obtenerHistorialSesiones( id,tipousuario)  
        if( historialSesiones != None ):
            return {"status":"success","message":"usuario-tiene historial", "data":historialSesiones}
        else:
            return {"status":"not-success","message":"usuario-no-tiene historial" ,"data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/ModificarPerfil/<idusuario>/<tipousuario>",methods=['POST'])
def ModificarPerfil(idusuario,tipousuario):
    try:
        usuario = request.json
        status = ModificarPerfilUsuario(idusuario, usuario, tipousuario)
        if( status == 1 ):
            return {"status":"success","message":"el usuario ha sido modificado"}
        else:
            return {"status":"not-success","message":"el usuario no se pudo modificar","lala":status}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/ContrasenaUsuario/<idusuario>",methods=['GET'])
def UsuarioContrasena(idusuario):
    try:
        contrasena = EncontrarContrasena(idusuario)
        if( contrasena != None ):
            return {"status":"success","message":"el usuario existe", "data":contrasena}
        else:
            return {"status":"not-success","message":"el usuario no existe"}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/ActualizarContrasena/<idusuario>",methods=['POST'])
def ActualizarContrasena(idusuario):
    try:
        contrasena = request.json
        status = ModificarContrasena(idusuario,contrasena['password'])
        if( status == 1 ):
            return {"status":"success","message":"contraseña actualizada"}
        else:
            return {"status":"not-success","message":"no de pudo actualizar la contraseña"}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route('/manejoImgs/<idusuario>', methods=['PUT'])
def uploadimage(idusuario):
    try:
        imagenfile = request.files
        status = subirImagen( idusuario, imagenfile)
        if( status == 1 ):
            return {"status":"success","message":"imagen actualizada"}
        else:
            return {"status":"not-success","message":"no se pudo actualizar la imagen"}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}
        
@app.route('/bringImgs/<filename>')
def uploaded_file(filename):
    return send_from_directory(IMAGE_FOLDER, path=filename, as_attachment=False)
