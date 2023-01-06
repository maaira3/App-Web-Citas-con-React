import pymysql

""""
Establece la conexion con la base de datos
Salidas
*La tupla cur,conexion si todo salio bien
*La tupla not-success,not-success si algo salio mal
"""
def obtenerConexion():
    try:
        conexion = pymysql.connect( host="us-cdbr-east-06.cleardb.net" , 
        user ="b6380f35c56e79" , 
        password="8c5cfbc0" , 
        db="heroku_4ebeb6a05adc1dc" )
        cur = conexion.cursor( pymysql.cursors.DictCursor )
        return cur,conexion
    except:
        return "not-success","not-success"