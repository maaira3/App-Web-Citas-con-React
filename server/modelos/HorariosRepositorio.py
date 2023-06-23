import pymysql
from json.decoder import JSONDecodeError
from modelos.FuncionesGenerales import obtenerConexion

"""
Obtiene los horarios que corresponden a un terapeuta y tienen un determinado estado
Parametros
idTerapeuta -> Identificador del terapeuta que le correponde el horario
estado -> Indica que tipo de estado se quiere 1(disponible) o 0(no-disponible)
Salida:
Se compone de 3 cosas (status,message,horarioTerapeuta)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*horariosTerapeuta->Es la informacion de los horarios del terapeuta con cierto estado, existe solo si todo salio bien
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-excepction si ocurrio algun error no identificado
"""

def obtenerHorariosTerapeutaDB(idTerapeuta,estado):
    try:
        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' , "horariosTerapeuta":None } 

        #Realiza la consulta a la base de datos, dependiendo del estado 

        sql = ""

        values = ""

        if( estado == "cualquiera" ):

            sql="""SELECT *,DATE(horariodisponible) AS fecha,DATE_FORMAT(horariodisponible,"%%H:%%i") AS hora 
                    FROM horarios 
                    WHERE idterapeuta=%s"""

            values = ( idTerapeuta )         
        else:

            sql="""SELECT *,DATE(horariodisponible) AS fecha,DATE_FORMAT(horariodisponible,"%%H:%%i") AS hora 
                    FROM horarios 
                    WHERE idterapeuta=%s AND estado=%s"""

            values = ( idTerapeuta , estado )         

        cur.execute( sql , values )

        #Convierte la fecha y hora en formato string

        horarios = cur.fetchall()  

        for horario in horarios:
            horario["fecha"] = str( horario["fecha"] )
            horario["hora"] = str( horario["hora"] ) 

        conexion.close()    

        return { "status":'success', "message":'' , "horariosTerapeuta":horarios } 

    except JSONDecodeError  as e:
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return { "status":'not-success', "message":str(e) , "horariosTerapeuta":None }

"""
Obtiene el horario utilizando la fecha
Parametros
fecha -> Fecha que se usa como filtro para determinar el horario
Salida:
Se compone de 3 cosas (status,message,horario)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*horario->Es la informacion del horario con la fecha pasada por parametro, existe solo si todo salio bien
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-excepction si ocurrio algun error no identificado
"""

def obtenerHorarioPorFechaBD( fecha ):
    try:
        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' , "horario":None } 

        #Realiza la peticion a la base de datos

        sql = """SELECT *,DATE(horariodisponible) as fecha,TIME(horariodisponible) as hora FROM horarios WHERE horariodisponible=%s"""

        values = ( fecha )

        cur.execute( sql , values )    

        horario = cur.fetchall()[0]

        horario["fecha"] = str( horario["fecha"] )

        horario["hora"] = str( horario["hora"] ) 

        conexion.close()

        return { "status":'success', "message":'' , "horario":horario } 

    except JSONDecodeError as e:
        return {"status":'not-success',"message":str(e),"horario":None}

"""
Actualiza el estado de un horario a un valor determinado
Parametros
idHorario -> Identificador del horario a modificar
estado -> Nuevo estado del horario 0(disponible) o 1(no-disponible)
Salidas:
Se compone de 3 cosas (status,message,horario)
*status->Indica si tuvo exito o no la operacion, tiene los valores
-success , para denotar que fue exitosa
-not-success, para denotar que no fue exitosa
*message->Si existe un error indica el porque fue, tiene los valores
-conexion-no-exitosa si la conexion con la base de datos no se pudo establecer
-excepction si ocurrio algun error no identificado
"""

def actualizarEstadoHorarioBD( idHorario , estado ):
    try:
        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' } 

        #Realiza la peticion a la base de datos

        sql = """UPDATE horarios SET estado=%s WHERE idhorario=%s"""

        values = ( estado,idHorario )

        cur.execute( sql , values )    

        conexion.commit()

        conexion.close()

        return { "status":'success', "message":'' } 

    except JSONDecodeError as e:
        return {"status":'not-success',"message":str(e)}

def crearHorariosBD( idTerapeuta, listaHorarios ):
    try:
        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' } 

        #Crea cada horario de la lista 

        for horario in listaHorarios:
            #Realiza la peticion a la base de datos

            sql = """INSERT INTO horarios (horariodisponible,estado,idterapeuta) VALUES (%s,1,%s)"""

            values = ( horario, idTerapeuta )

            cur.execute( sql , values )    

        conexion.commit()

        conexion.close()

        return { "status":'success', "message":'' } 

    except JSONDecodeError as e:
        return {"status":'not-success',"message":str(e)}

def actualizarHorariosBD( idTerapeuta, listaHorarios ):
    try:
        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' } 

        #Crea cada horario de la lista 

        for horario in listaHorarios:

            if( horario[2] ):

                #Realiza la peticion a la base de datos

                sql = """UPDATE horarios SET horariodisponible=%s WHERE horariodisponible LIKE %s and idterapeuta=%s"""

                values = ( horario[1],horario[0]+"%" ,idTerapeuta )

                cur.execute( sql , values )    

        conexion.commit()

        conexion.close()

        return { "status":'success', "message":'' } 

    except JSONDecodeError as e:
        return {"status":'not-success',"message":str(e)}

def borrarHorariosBD( idTerapeuta, listaHorarios ):
    try:
        #Establece conexion con la base de datos    
        cur,conexion = obtenerConexion()  

        if( conexion == "not-success" ):
            return { "status":'not-success', "message":'conexion-no-exitosa' } 

        #Crea cada horario de la lista 

        for horario in listaHorarios:

            if( horario[2] ):

                #Realiza la peticion a la base de datos

                sql = """DELETE FROM horarios WHERE horariodisponible LIKE %s and idterapeuta=%s"""

                values = ( horario[0]+"%" ,idTerapeuta )

                cur.execute( sql , values )    

        conexion.commit()

        conexion.close()

        return { "status":'success', "message":'' } 

    except JSONDecodeError as e:
        return {"status":'not-success',"message":str(e)}        