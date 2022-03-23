import pymysql
from helpers.ValidacionClienteHelper import *
from json.decoder import JSONDecodeError
from modelos.FuncionesGenerales import obtenerConexion

"""
Registra un nuevo cliente a la base de datos siempre y cuando, la conexion se logra hacer y los campos el cliente son validos
Parametros
cliente -> Objeto cliente que contiene los campos 
Salida
Retorna una terna (status,cliente,message)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*cliente->Es la informacion del cliente registrado, existe solo si todo salio bien
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-campos-no-validos si algun campo del cliente no es valido
"""
def crearClienteBD(cliente):
    try:
        #Valida los campos del cliente
        validacionCampos = validarCamposCliente(cliente)

        if( validacionCampos == 'no-validos' ):
            return { "status":'not-success' ,"message":'campos-no-validos' , "cliente":None }

        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()   

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' , "cliente":None } 

        #Realiza la consulta a la base de datos
        sql = "INSERT INTO usuarios (nombre,telefono,edad,email,password,tipo) VALUES (%s,%s,%s,%s,%s,%s)"

        values = ( cliente["nombre"],cliente["telefono"],cliente["edad"],cliente["email"],cliente["password"],"cliente" )

        cur.execute( sql , values )

        #Obtiene el id asignado a ese cliente

        idUsuario = conexion.insert_id()

        sql = "INSERT INTO cliente (idTerapeuta,horarioSesion,pagoServicio,link,idusuario) VALUES (%s,%s,%s,%s,%s)"

        values = ( None,None,0,None,idUsuario )

        cur.execute( sql , values )
        
        cliente["id"] = conexion.insert_id()

        #Ejecuta todas las consultas
        conexion.commit()

        conexion.close()

        return { "status":'success' , "message":'' , "cliente":cliente }
    except JSONDecodeError  as e:
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()

        return { "status":'not-success' , "message": str(e) , "cliente":None }

"""
Obtiene la informacion de un cliente por medio de su email
Parametros
email -> Correo del usuario a buscar
Salidas
*None si el cliente con ese email no existe
*La informacion del cliente con ese email
"""
def obtenerClientePorEmail( email ):
    try:
        cur,conexion = obtenerConexion()

        if( conexion == "not-success" ):
            return "not-success"

        sql = "SELECT * FROM usuarios WHERE email=%s"

        values = ( email )

        cur.execute( sql , values )

        cliente = cur.fetchall()  

        conexion.close()

        if( len(cliente) == 0 ):
            return None

        return cliente[0]

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()

        return "not-success"

"""
Obtiene la informacion de un cliente por medio de su id
Parametros
id -> Identificador del cliente a buscar
Salidas
Retorna una terna (status,message,cliente)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*cliente->Es la informacion del cliente registrado, existe solo si todo salio bien
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-campos-no-validos si algun campo del cliente no es valido
"""
def obtenerClientePorId( idCliente ):
    try:
        cur,conexion = obtenerConexion()

        if( conexion == "not-success" ):
            return {"status":"not-success" , "message":"conexion-no-exitosa" , "cliente":None  }

        sql = 'SELECT * FROM usuarios INNER JOIN cliente ON cliente.`idusuario` = usuarios.`idusuario` WHERE idCliente=%s'    

        values = ( idCliente )

        cur.execute( sql , values )

        clienteObtenido = cur.fetchall()  

        conexion.close()

        if( len(clienteObtenido) == 0 ):
            return {"status":"success" , "message":'' , "cliente":None  }    

        clienteObtenido = clienteObtenido[0]    

        return {"status":"success" , "message":'' , "cliente":clienteObtenido  } 

    except JSONDecodeError  as e:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()

        return {"status":"not-success" , "message":str(e) , "cliente":None  }



"""
Obtiene la el tipo de usuario y su id
Parametros
email -> Correo del usuario a buscar
password -> Contraseña del usuario a buscar
Salidas
*None si el cliente con ese email y password no existe
*Obtiene los datos del usuario.
"""
def obtenerUsuario( parameters ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "SELECT usuarios.*,cliente.pagoServicio,cliente.idCliente FROM usuarios INNER JOIN cliente ON cliente.`idusuario` = usuarios.`idusuario` WHERE email='{0}' AND password='{1}'".format(parameters['email'],parameters['password'])
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
            sql = "SELECT c.idCliente as idcliente, u.nombre, u.telefono, u.edad, u.email,  date_format(c.horarioSesion, '%d/%m/%y %H:%i') as horarioSesion, c.link, t.idusuario FROM usuarios u LEFT JOIN cliente c ON u.idusuario=c.idusuario LEFT JOIN terapeuta t ON t.idTerapeuta=c.idTerapeuta WHERE u.idusuario='{0}'".format(idusuario)
            cur.execute( sql)
            usuario = cur.fetchall() 
            idterapeuta=usuario[0]['idusuario']
            sql2 = "SELECT nombre FROM usuarios WHERE idusuario='{0}'".format(idterapeuta) 
            cur.execute(sql2)
            terapeuta=cur.fetchone()
            conexion.close()
            usuario[0]['terapeuta']=terapeuta['nombre']
            usuario[0]['imagen']='null'
        if (tipo=='terapeuta'):
            sql = "SELECT  u.nombre, u.telefono, u.edad, u.email, t.descripcion, t.rutaImagen FROM usuarios u LEFT JOIN terapeuta ON u.idusuario=t.idusuario WHERE u.idusuario='{0}'".format(idusuario)
            cur.execute( sql)
            usuario = cur.fetchall() 
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
def obtenerHistorialSesiones( id):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success "
        #Obtiene el id, idusuarioterapeuta, horariosesion
        sql1 = "SELECT h.idhistorialsesiones, t.idusuario,  date_format(h.horarioSesion, '%d/%m/%y %H:%i') as horarioSesion FROM historialsesiones h LEFT JOIN terapeuta t ON t.idTerapeuta=h.idTerapeuta  WHERE h.idCliente='{0}'".format(id)
        cur.execute( sql1)
        historialusuario = cur.fetchall() 

        #Para cada sesion obtiene el nombre del terapeuta por medio del idusuario del terapeuta
        for i in historialusuario:
            idterapeuta=i['idusuario']
            sql2 = "SELECT nombre FROM usuarios WHERE idusuario='{0}'".format(idterapeuta) 
            cur.execute(sql2)
            terapeuta=cur.fetchone()
            i['terapeuta']=terapeuta['nombre']
        conexion.close()
        if( historialusuario == () ):
            return None
        return historialusuario

    except JSONDecodeError as e:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return str(e)

"""
Modifica la informacion del perfil
Parametros
idusuario -> id del usuario a modificar
usuario -> los datos del usuario a modificar
Salidas
*Success si la información del usuario se pudo modificar
"""
def ModificarPerfilUsuario(idusuario, usuario):
    try:
        cur,conexion = obtenerConexion()

        print(usuario)

        if( conexion == "not-success" ):
            return "not-success "
        #Obtiene el id, idusuarioterapeuta, horariosesion
        sql1 = "UPDATE  usuarios SET nombre='{0}', telefono='{1}', edad='{2}, email='{3}  WHERE h.idCliente='{0}'".format(usuario["nombre"], usuario.telefono, usuario.edad, usuario.email, idusuario)
        cur.execute( sql1)
        conexion.close()
        return 1
    except JSONDecodeError as e :    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success" + str(e)

def actualizarPagoServicio(idCliente,pagoServicio):
    try:
        cur,conexion = obtenerConexion()

        if( conexion == "not-success" ):
            return {"status":"not-success" , "message":"conexion-no-exitosa"  }

        sql = """UPDATE cliente SET pagoServicio=%s WHERE idCliente=%s"""    

        values = ( pagoServicio , idCliente )

        cur.execute( sql , values )

        conexion.commit()

        conexion.close()

        return {"status":"success" , "message":'' , "pagoServicio":pagoServicio  } 

    except JSONDecodeError  as e:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()

        return {"status":"not-success" , "message":str(e)  }  
