from json import JSONDecodeError
import pymysql
from helpers.ValidacionImagenPerfilHelper import *;
from modelos.FuncionesGenerales import obtenerConexion;


"""
Obtiene el id del terapeuta
Parametros
idusuario -> id del usuario
Salidas
*None si no existe el terapeuta con ese usuario
*El id del terapeuta con ese usuario
"""
def obtenerIdterapeuta( idusuario):
    try:
        cur,conexion = obtenerConexion()

        if( conexion == "not-success" ):
            return "not-success"
        #Obtiene el idterapeuta
        sql = "SELECT idTerapeuta FROM terapeuta WHERE idusuario='{0}'".format(idusuario)

        cur.execute( sql )

        idterapeuta = cur.fetchone()  

        conexion.close()

        if( idterapeuta == None ):
            return None

        return idterapeuta['idTerapeuta']

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()

        return "not-success"

"""
Obtiene las consultas del terapeuta
Parametros
idusuario -> idusuario del terapeuta
Salidas
*None si el terapeuta con ese usuario no tiene consultas
*Las consultas del terapeuta con ese usuario
"""
def obtenerConsulta( idusuario):
    try:
        cur,conexion = obtenerConexion()

        if( conexion == "not-success" ):
            return "not-success"
        #Obtiene el idterapeuta
        idterapeuta = obtenerIdterapeuta(idusuario)

        if(idterapeuta!=None or idterapeuta!='not-success'):
            #Obtiene la consulta
            sql = "SELECT idCliente, idusuario, date_format(horarioSesion, '%d/%m/%y %H:%i') as horarioSesion, link FROM cliente WHERE idTerapeuta='{0}'".format(idterapeuta)
            cur.execute( sql )
            consultas = cur.fetchall() 
            #Para cada consulta obtiene el nombre y correo del cliente por medio del idusuario del cliente
            for consulta in consultas:
                idcliente=consulta['idusuario']
                sql2 = "SELECT nombre, email FROM usuarios WHERE idusuario='{0}'".format(idcliente) 
                cur.execute(sql2)
                cliente=cur.fetchall()
                print( cliente )
                consulta['nombre']=cliente[0]['nombre'] 
                consulta['email']=cliente[0]['email']
            conexion.close()

            if( consultas == () ):
                return None
            return consultas

    except JSONDecodeError as e:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Sube la imagen
Parametros
idusuario -> idusuario del terapeuta
imagenfile -> imagen a subir
Salidas
*not-success si no se pudo subir la imagen
*success si se pudo subir la imagen
"""
def subirImagen( idusuario, imagenfile):
    try:
        conexion = pymysql.connect( host="localhost" , user ="root" , password="" , db="elementalv2" )
        cur = conexion.cursor()

        if( conexion == "not-success" ):
            return "not-success"
            
        #Obtiene el idterapeuta
        idterapeuta = obtenerIdterapeuta(idusuario)

        if(idterapeuta!=None or idterapeuta!='not-success'):
            filename = validarImagen(imagenfile)
            if(filename!="not-success"):
                #Actualiza la imagen
                sql = "UPDATE terapeuta SET rutaImagen='{0}' WHERE idTerapeuta= '{1}' ".format(filename,idterapeuta)
                cur.execute( sql )
                conexion.commit()
                conexion.close()
                return 1
            else:
                return 'not-success'
        return "not-success"

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"