from email import message
from json.decoder import JSONDecodeError
from modelos.TerapeutasRepositorio import *
from modelos.GeneralRepositorio import *
from flask import request,  send_from_directory
from __main__ import app

os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')


@app.route( "/obtenerTerapeutas" , methods=["POST"] )
def obtenerTerapeutas():
    try:

        #Obtiene los parametros

        parametros = request.json

        tipo = parametros["tipo"]

        #Obtiene la informacion de los terapeutas

        resultado = obtenerTerapeutasDB()

        if( resultado["status"] == "not-success" ):
            return { "status":"not-success" , "message": resultado["message"] , "terapeutas":None }    

        #Si el tipo de usuario que hace la peticion es un cliente, filtra algunos datos del terapeuta

        terapeutas = []

        if( tipo == "cliente" ):
            
            terapeutasTemp = resultado["terapeutas"]

            for terapeuta in  terapeutasTemp:
                terapeutas.append( {
                    "rutaImagen": terapeuta["rutaImagen"],
                    "descripcion": terapeuta["descripcion"],
                    "nombre": terapeuta["nombre"],
                })

        #Si es administrador retorna toda la informacion del terapeuta        

        if( tipo == "administrador" ):
            terapeutasTemp = resultado["terapeutas"]

            for terapeuta in  terapeutasTemp:
                terapeutas.append( {
                    "idusuario": terapeuta["idusuario"],
                    "nombre": terapeuta["nombre"],
                    "telefono": terapeuta["telefono"],
                    "edad": terapeuta["edad"],
                    "email": terapeuta["email"],
                    "idTerapeuta": terapeuta["idTerapeuta"],
                })   

        #Si el tipo de usuario que hace la peticion es terapeuta, no regresar informacion        

        if( tipo == "terapeuta" ):

            terapeutas = None       
        
       
        return { "status":"success" , "message": '' , "terapeutas":terapeutas }    

    except JSONDecodeError as e:
        return { "status":"not-success" , "message": str(e) }



@app.route("/guardarCambiosTerapeutas",methods=["POST"])
def guardarCambiosTerapeutas():

    try:

        #Obtiene los parametros

        parametros = request.json

        terapeutas = parametros["terapeutas"]

        #Modifica a los terapeutas

        for terapeuta in terapeutas:
            if( terapeuta["modificarlo"] ):
                ModificarPerfilUsuario( terapeuta["idusuario"], terapeuta, "terapeuta" )

        #Borra a los terapeutas

        terapeutasBorrar = []

        for terapeuta in terapeutas:
            if( terapeuta["borrarlo"] ):
                terapeutasBorrar.append( terapeuta )

        borrarUsuarios( terapeutasBorrar )        


        return {"status":"success","message":""}

    except JSONDecodeError as e:
        return { "status":"not-success" , "message": str(e) }

@app.route('/terapeutas/bringImgs/<filename>')
def uploaded_fileterapeutas(filename):
    return send_from_directory(IMAGE_FOLDER, path=filename, as_attachment=False)