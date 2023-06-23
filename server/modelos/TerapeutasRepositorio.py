import pymysql
from json.decoder import JSONDecodeError
from modelos.FuncionesGenerales import obtenerConexion


def obtenerTerapeutasDB():
    try:

        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' , "terapeutas":None } 

        #Realiza la consulta a la base de datos    

        sql="""SELECT * FROM terapeuta INNER JOIN usuarios ON usuarios.idusuario = terapeuta.idusuario"""

        values = (  )    

        cur.execute( sql , values )

        terapeutas = cur.fetchall()

        return { "status":'success', "message":'' , "terapeutas":terapeutas } 


    except JSONDecodeError as e:
        return {"status":"not-success","message":str(e), "terapeutas":None }    

"""
Obtiene a un terapeuta utilizando el identificador
Parametros:
idTerapeuta -> Identificador del terapeuta que se usara para buscarlo
Salida:
Salida:
Se compone de 3 cosas (status,message,horarioTerapeuta)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*terapeuta->Informacion del terapeuta, existe solo si todo salio bien
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-excepction si ocurrio algun error no identificado
"""
def obtenerTerapeutaPorId( idTerapeuta ):
    try:

        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' }

        #Realiza la consulta 

        sql = """SELECT * FROM terapeuta INNER JOIN usuarios ON usuarios.idusuario = terapeuta.idusuario WHERE idterapeuta=%s"""

        values =( idTerapeuta )

        cur.execute( sql , values )

        terapeuta = cur.fetchall()

        #Si el terapeuta existe retorna su informacion de otro modo retorna un nulo

        if( len(terapeuta) == 0 ):
            return {"status":"success","message":"","terapeuta":None}

        return {"status":"success","message":"","terapeuta":terapeuta}

    except JSONDecodeError as e:
        return {"status":"not-success","message":str(e)}    

