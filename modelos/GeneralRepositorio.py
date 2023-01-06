from modelos.TerapeutaRepositorio import obtenerIdterapeuta
from modelos.FuncionesGenerales import obtenerConexion
from helpers.ValidacionClienteHelper import *
from json.decoder import JSONDecodeError
from helpers.ValidacionImagenPerfilHelper import *;
import pymysql
"""
Registra un nuevo usuario a la base de datos siempre y cuando, la conexion se logra hacer y los campos del usuario son validos
Parametros
usuario -> Objeto usuario que contiene los campos 
Salida
Retorna una terna (status,usuario,message)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*usuario->Es la informacion del usuario registrado, existe solo si todo salio bien
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-campos-no-validos si algun campo del usuario no es valido
"""
def crearUsuarioBD(usuario,tipo):
    try:
        #Valida los campos del cliente
        validacionCampos = validarCamposCliente(usuario)

        if( validacionCampos == 'no-validos' ):
            return { "status":'not-success' ,"message":'campos-no-validos' , "usuario":None }

        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()   

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' , "usuario":None } 

        #Realiza la consulta a la base de datos
        sql = "INSERT INTO usuarios (nombre,telefono,edad,email,password,tipo) VALUES (%s,%s,%s,%s,%s,%s)"

        values = ( usuario["nombre"],usuario["telefono"],usuario["edad"],usuario["email"],usuario["password"], tipo )

        cur.execute( sql , values )

        #Obtiene el id asignado a ese usuario

        idUsuario = conexion.insert_id()

        #Incia instruccion sql y los valores

        sql = ""

        values = ()

        #Si el tipo es cliente crea una instruccion para insertar a un cliente

        if( tipo == "cliente" ):

            sql = "INSERT INTO cliente (idterapeuta,horariosesion,pagoservicio,link,idusuario) VALUES (%s,%s,%s,%s,%s)"

            values = ( None,None,0,None,idUsuario )

        #Si el tipo es terapeuta crea una instruccion para insertar a un terapeuta    

        if( tipo == "terapeuta" ):    

            sql = "INSERT INTO terapeuta (idterapeuta,rutaimagen,descripcion,idusuario) VALUES (%s,%s,%s,%s)"

            values = ( None,"","",idUsuario )

        #Crea el usuario    

        cur.execute( sql , values )

        conexion.commit()

        conexion.close()

        return { "status":'success' , "message":'' , "usuario":usuario }
    except JSONDecodeError  as e:
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()

        return { "status":'not-success' , "message": str(e) , "usuario":None }

"""
Obtiene la el tipo de usuario y su id
Parametros
email -> Correo del usuario a buscar
password -> Contraseña del usuario a buscar
Salidas
*None si el cliente con ese email y password no existe
*Obtiene los datos del usuario.
"""
def obtenerUsuario( parameters, tipo ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "SELECT * FROM usuarios WHERE email='{0}' AND password='{1}' AND tipo='{2}'".format(parameters['email'],parameters['password'], tipo)
        cur.execute( sql)
        usuario = cur.fetchall()  
        if( len(usuario) == 0 ):
            return None
            
        if( usuario[0]["tipo"] == "terapeuta" ):
            sql = "SELECT * FROM terapeuta WHERE idusuario=%s"
            values = (usuario[0]["idusuario"])
            cur.execute( sql , values )
            terapeuta = cur.fetchall()[0]
            for (key,value) in terapeuta.items():
                usuario[0][key] = value
        if( usuario[0]["tipo"] == "cliente" ):
            sql = "SELECT * FROM cliente WHERE idusuario=%s"
            values = (usuario[0]["idusuario"])
            cur.execute( sql , values )
            cliente = cur.fetchall()[0]
            for (key,value) in cliente.items():
                usuario[0][key] = value
        conexion.close()
        if( usuario == () ):
            return None
        return usuario

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Obtiene el historial de sesiones del usuario logeado
Parametros
idusuario -> id del usuario a buscar
Salidas
*None si el usuario no existe
*Obtiene el historial de sesiones del usuario
"""
def obtenerHistorialSesiones( id, tipousuario):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success conexion"
        if(tipousuario=='cliente'):
            #Obtiene el id, idusuarioterapeuta, horariosesion
            sql1 = "SELECT h.idhistorialsesiones, t.idusuario,  date_format(h.horariosesion, '%d/%m/%y %H:%i') as horariosesion FROM historialsesiones h LEFT JOIN terapeuta t ON t.idterapeuta=h.idterapeuta  WHERE h.idcliente='{0}'".format(id)
            cur.execute( sql1)
            historialusuario = cur.fetchall() 

            #Para cada sesion obtiene el nombre del terapeuta por medio del idusuario del terapeuta
            for i in historialusuario:
                idterapeuta=i['idusuario']
                sql2 = "SELECT nombre FROM usuarios WHERE idusuario='{0}'".format(idterapeuta) 
                cur.execute(sql2)
                terapeuta=cur.fetchone()
                i['terapeuta']=terapeuta['nombre']
        if(tipousuario=='terapeuta'):
            #Obtiene el id, idusuariocliente, horariosesion
            sql1 = "SELECT h.idhistorialsesiones, c.idusuario,  date_format(h.horariosesion, '%d/%m/%y %H:%i') as horariosesion FROM historialsesiones h LEFT JOIN cliente c ON c.idcliente=h.idcliente  WHERE h.idterapeuta='{0}'".format(id)
            cur.execute( sql1)
            historialusuario = cur.fetchall() 
            #Para cada sesion obtiene el nombre del cliente por medio del idusuario del cliente
            for historial in historialusuario:
                idcliente=historial['idusuario']
                sql2 = "SELECT nombre FROM usuarios WHERE idusuario='{0}'".format(idcliente) 
                cur.execute(sql2)
                cliente=cur.fetchone()
                historial['cliente']=cliente['nombre']

        conexion.close()
        if( historialusuario == () ):
            return None
        return historialusuario

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Obtiene la el tipo de usuario y su id
Parametros
idusuario -> id del usuario a buscar
Salidas
*None si el cliente con ese id no existe
*Obtiene los datos del usuario.
"""
def obtenerUsuarioPorId( idusuario, tipo ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        if (tipo=='cliente'):
            sql = "SELECT c.idcliente as idcliente, u.nombre, u.telefono, u.edad, u.email,  date_format(c.horariosesion, '%d/%m/%y %H:%i') as horariosesion, c.link, t.idusuario FROM usuarios u LEFT JOIN cliente c ON u.idusuario=c.idusuario LEFT JOIN terapeuta t ON t.idterapeuta=c.idterapeuta WHERE u.idusuario='{0}'".format(idusuario)
            cur.execute( sql)
            usuario = cur.fetchall() 
            idterapeuta=usuario[0]['idusuario']
            sql2 = "SELECT nombre FROM usuarios WHERE idusuario='{0}'".format(idterapeuta) 
            cur.execute(sql2)
            terapeuta=cur.fetchone()
            if( terapeuta != None ):
                usuario[0]['terapeuta']=terapeuta['nombre']
            usuario[0]['imagen']='null'
        if (tipo=='terapeuta'):
            sql = "SELECT  u.nombre, u.telefono, u.edad, u.email, t.descripcion,t.idterapeuta as idterapeuta, t.rutaimagen FROM usuarios u LEFT JOIN terapeuta t ON u.idusuario=t.idusuario WHERE u.idusuario='{0}'".format(idusuario)
            cur.execute( sql)
            usuario = cur.fetchall()

        conexion.close()     
        if( usuario == () ):
            return None
        return usuario

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Modifica la contraseña
Parametros
descripcion -> descripcion del terapeuta
idterapeuta -> id del terapeuta
Salidas
*1 si se modifico la descripcion
"""
def ModificarDescripcion(descripcion, idterapeuta):
    
    try:
        cur,conexion = obtenerConexion()

        if( conexion == "not-success" ):
            return "not-success"
        #Modifica los datos del usuario
        
        sql1 = "UPDATE  terapeuta SET descripcion='{0}' WHERE idterapeuta='{1}'".format(descripcion, idterapeuta)
        cur.execute( sql1)
        conexion.commit()
        conexion.close()
        return 1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Modifica la informacion del perfil
Parametros
idusuario -> id del usuario a modificar
usuario -> los datos del usuario a modificar
Salidas
*Success si la información del usuario se pudo modificar
"""
def ModificarPerfilUsuario(idusuario, usuario, tipousuario):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success conex"
        #Modifica los datos del usuario
        sql1 = "UPDATE  usuarios SET nombre='{0}', telefono='{1}', edad='{2}', email='{3}'  WHERE idusuario='{4}'".format(usuario['nombre'], usuario['telefono'], usuario['edad'], usuario['email'], idusuario)
        cur.execute( sql1)
        if (tipousuario=='terapeuta'):
            idterapeuta= obtenerIdterapeuta(idusuario)
            status=ModificarDescripcion(usuario['descripcion'], idterapeuta)
            if (status!=1):
                return "not-success"
        conexion.commit()
        conexion.close()
        return 1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Obtiene la contraseña del usuario
Parametros
idusuario -> id del usuario a buscar contraseña
tipousuario -> tipo de usuario a buscar contraseña
Salidas
*Success si encontró contraseña del usuario con el id
"""
def EncontrarContrasena(idusuario):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success conex"
        #print(idusuario)
        #selecciona la contraseña del usuario
        sql1 = "SELECT  password FROM usuarios  WHERE idusuario='{0}'".format(idusuario)
        cur.execute( sql1)
        password=cur.fetchone()
        conexion.close()
        #print(password)
        return password
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Modifica la contraseña
Parametros
idusuario -> id del usuario a modificar contraseña
contrasena -> contrasena nueva
Salidas
*Success si modificó la contraseña del usuario con el id
"""
def ModificarContrasena(idusuario, contrasena):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        #Modifica los datos del usuario
        sql = "UPDATE usuarios SET password='{0}'  WHERE idusuario='{1}'".format(contrasena, idusuario)
        cur.execute( sql)
        conexion.commit()
        conexion.close()
        return 1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

def borrarUsuarios( usuarios ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        #Borra cada usuario
        sql = """DELETE FROM usuarios WHERE idusuario=%s"""
        for usuario in usuarios:
            values = ( usuario["idusuario"] )         
            cur.execute( sql , values )       
        conexion.commit()
        conexion.close()
        return 1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"    
"""
Obtiene la informacion de los posts del blog
Salidas
*None si no existen posts
*Obtiene los datos de todos los posts.
"""
def obtenerPosts():
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"

        sql = "SELECT * FROM blog"
        cur.execute( sql)
        posts = cur.fetchall()  
        conexion.close()
        if( posts == () ):
            return None
        return posts

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Inserta un nuevo post
Salidas
*not-success si no se pudo insertar el post
*idpost si se pudo insertar el post
"""
def NuevoPost(post):
    try:
        cur,conexion = obtenerConexion()
        cur = conexion.cursor()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "INSERT INTO blog (titulo, imagenpost, contenido) VALUES ('{0}','imagenpost.svg','{1}')".format(post['titulo'], post['contenido'])
        cur.execute( sql)
        conexion.commit()
        print(cur.rowcount, "registros afectado/s")
        cur = conexion.cursor(pymysql.cursors.DictCursor)
        sql2 = "SELECT LAST_INSERT_ID()"
        cur.execute( sql2)
        idpost=cur.fetchone()
        print("idpost", idpost['LAST_INSERT_ID()'])
        conexion.close()
        if idpost==None:
            return '-1'
        else:
            return idpost['LAST_INSERT_ID()']

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Sube la imagen del post
Parametros
idpost -> id del post
imagenfile -> imagen a subir
Salidas
*not-success si no se pudo subir la imagen
*success si se pudo subir la imagen
"""
def subirImagenPost( idpost, imagenfile):
    try:
        cur,conexion = obtenerConexion()
        cur = conexion.cursor()

        if( conexion == "not-success" ):
            return "not-success"

        if(idpost!=None):
            filename = validarImagen(imagenfile)
            if(filename!="not-success"):
                #Actualiza la imagen
                sql = "UPDATE blog SET imagenpost='{0}' WHERE idpost= '{1}' ".format(filename,idpost)
                cur.execute( sql )
                conexion.commit()
                conexion.close()
                return 1
            else:
                return -1
        return "not-success"

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Obtiene la informacion de los terapeutas
Salidas
*None si no existen terapeutas
*Obtiene los datos de todos los terapeutas
"""
def obtenerTerapeutasSlider():

    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"

        sql = "SELECT t.idterapeuta, t.rutaimagen, t.descripcion, u.nombre FROM terapeuta t INNER JOIN usuarios u ON u.idusuario=t.idusuario"
        cur.execute( sql)
        terapeutas = cur.fetchall()  
        conexion.close()
        if( terapeutas == () ):
            return None
        return terapeutas

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Elimina el post por el id
Parametros
idpost -> id del post
Salidas
Salidas
*not-success si no se pudo eliminar el post
*success si se pudo eliminar el post
"""
def DeletePost(idpost):

    try:
        cur,conexion = obtenerConexion()
        cur = conexion.cursor()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "DELETE FROM blog WHERE idpost='{0}'".format(idpost)
        cur.execute(sql) 
        conexion.commit()
       # print("response: ", cur.rowcount)
        conexion.close()
        if cur.rowcount==1:
            return 1
        else:
            return -1

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return -1

"""
Modifica el post por el id
Parametros
idpost -> id del post
post -> informacion del post
Salidas
Salidas
*not-success si no se pudo modificar el post
*success si se pudo modificar el post
"""
def ModifyPost(idpost,post):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success conex"
        #Modifica el post
        print(post)
        sql = "UPDATE  blog SET titulo='{0}', contenido='{1}' WHERE idpost='{2}'".format(post['titulo'], post['contenido'], idpost)
        cur.execute( sql)
        conexion.commit()
        conexion.close()
        if cur.rowcount==1:
            return 1
        else:
            return -1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return -1

"""
Obtiene la informacion de los servicios
Salidas
*None si no existen servicios
*Obtiene los datos de todos los servicios
"""
def obtenerServicios():
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"

        sql = "SELECT * FROM servicios"
        cur.execute( sql)
        servicios = cur.fetchall()  
        conexion.close()
        if( servicios == () ):
            return None
        return servicios

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Inserta un nuevo servicio
Salidas
*not-success si no se pudo insertar el servicio
*idservicio si se pudo insertar el servicio
"""
def NuevoServicio(servicio):
    try:
        cur,conexion = obtenerConexion()
        cur = conexion.cursor()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "INSERT INTO servicios (nomservicio, descservicio, cantidadsesiones, precioservicio) VALUES ('{0}','{1}','{2}','{3}')".format(servicio['nombre'], servicio['descripcion'], servicio['cantidadsesiones'], servicio['precio'])
        cur.execute( sql)
        conexion.commit()
        print(cur.rowcount, "registros afectado/s")
        conexion.close()
        if cur.rowcount==0:
            return -1
        else:
            return 1

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Elimina el servicio por el id
Parametros
idservicio -> id del servicio
Salidas
*not-success si no se pudo eliminar el servicio
*success si se pudo eliminar el servicio
"""
def eliminarServicio(idservicio):

    try:
        cur,conexion = obtenerConexion()
        cur = conexion.cursor()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "DELETE FROM servicios WHERE idservicio='{0}'".format(idservicio)
        cur.execute(sql) 
        conexion.commit()
       # print("response: ", cur.rowcount)
        conexion.close()
        if cur.rowcount==1:
            return 1
        else:
            return -1

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return -1

"""
Modifica el servicio por el id
Parametros
idservicio -> id del servicio
servicio -> informacion del servicio
Salidas
*not-success si no se pudo modificar el servicio
*success si se pudo modificar el servicio
"""
def ModifyServicio(idservicio,servicio):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success conex"
        #Modifica el servicio
        print(servicio)
        sql = "UPDATE servicios SET nomservicio='{0}', descservicio='{1}', cantidadsesiones='{2}', precioservicio='{3}' WHERE idservicio='{4}'".format(servicio['nombre'], servicio['descripcion'], servicio['cantidadsesiones'], servicio['precio'], idservicio)
        print(sql)
        cur.execute( sql)
        conexion.commit()
        conexion.close()
        if cur.rowcount==1:
            return 1
        else:
            return -1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return -1

"""
Modifica el estado del pago por el id
Parametros
idusuario -> id del usuario
pago -> booleano
Salidas
*not-success si no se pudo modificar el pago
*success si se pudo modificar el pago
"""
def actualizarPago(idusuario,pago):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success conex"
        #Modifica el pago
        sql = "UPDATE cliente SET pagoservicio='{0}' WHERE idusuario='{1}'".format(pago, idusuario)
        print(sql)
        cur.execute( sql)
        conexion.commit()
        conexion.close()
        if cur.rowcount==1:
            return 1
        else:
            return -1
    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return -1