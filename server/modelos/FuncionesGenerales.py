import pymysql


""""
Establece la conexion con la base de datos
Salidas
*La tupla cur,conexion si todo salio bien
*La tupla not-success,not-success si algo salio mal
"""
def obtenerConexion():
    try:
        conexion = pymysql.connect( host="localhost" , 
        user ="root" , 
        password="" , 
        db="elementalv2" )
        cur = conexion.cursor(pymysql.cursors.DictCursor)
            
        return cur,conexion
    except:
        return "not-success","not-success"