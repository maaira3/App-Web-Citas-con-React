import pymysql

""""
Establece la conexion con la base de datos
Salidas
*La tupla cur,conexion si todo salio bien
*La tupla not-success,not-success si algo salio mal
"""
def obtenerConexion():
    try:
        conexion = pymysql.connect( host="localhost" , user ="root" , password="" , db="elementalv2" )
        cur = conexion.cursor(pymysql.cursors.DictCursor)
        return cur,conexion
    except:
        return "not-success","not-success"

"""
Obtiene el nombre del terapeuta
Salidas
*None si no existen citas
*La informacion de todas las citas
"""
def obtenerNombreTerapeuta( ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "SELECT u.nombre, u.email, u.telefono, u.edad, c.idTerapeuta, c.idCliente, date_format(c.horarioSesion, '%d/%m/%y %H:%i') as horarioSesion, c.pagoServicio FROM cliente c LEFT JOIN usuarios u ON u.idusuario=c.idusuario"
        cur.execute(sql)
        clientes = cur.fetchall()  
        #Para cada cliente obtiene el nombre del terapeura por medio de idTerapeuta 
        for cliente in clientes:
            idterapeuta = cliente['idTerapeuta']
            sql2 = "SELECT u.nombre FROM terapeuta t LEFT JOIN usuarios u ON u.idusuario=t.idusuario WHERE idTerapeuta='{0}'".format(idterapeuta) 
            cur.execute(sql2)
            terapeuta=cur.fetchone()
            print(terapeuta[0]['nombre'] )
            cliente['nombreterapeuta']=terapeuta[0]['nombre'] 
       # print(clientes)
        #conexion.commit()
        conexion.close()
        if( len(clientes) == 0 ):
            return None
        return clientes

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Obtiene la informacion de todos los clientes
Salidas
*None si no existen los clientes
*La informacion de todas los clientes
"""
def obtenerClientes( ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "SELECT u.nombre, u.email, u.telefono, u.edad, c.idTerapeuta, c.idCliente, date_format(c.horarioSesion, '%d/%m/%y %H:%i') as horarioSesion, c.pagoServicio FROM cliente c LEFT JOIN usuarios u ON u.idusuario=c.idusuario"
        cur.execute(sql)
        clientes = cur.fetchall()
        #Para cada cliente obtiene el nombre del terapeura por medio de idTerapeuta 
        for cliente in clientes:
            if (cliente['idTerapeuta']!=None):
                idterapeuta = cliente['idTerapeuta']
                sql2 = "SELECT u.nombre FROM terapeuta t LEFT JOIN usuarios u ON u.idusuario=t.idusuario WHERE idTerapeuta='{0}'".format(idterapeuta) 
                cur.execute(sql2)
                terapeuta=cur.fetchall()
                conexion.commit()
                cliente['nombreterapeuta']=terapeuta[0]['nombre']
            else:
                cliente['idTerapeuta']=0
                cliente['nombreterapeuta']='No asignado' 
        conexion.close()
        if( len(clientes) == 0 ):
            return None
        return clientes

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Obtiene el nombre, idusuario, idterapeuta
Salidas
*None si no existen terapeutas
*La informacion de los terapeutas
"""
def obtenerTerapeutas( ):
    try:
        cur,conexion = obtenerConexion()
        if( conexion == "not-success" ):
            return "not-success"
        sql = "SELECT u.nombre, u.idusuario, t.idTerapeuta FROM usuarios u LEFT JOIN terapeuta t ON u.idusuario=t.idusuario WHERE u.tipo='terapeuta'"
        cur.execute(sql)
        terapeutas = cur.fetchall() 
        conexion.close()
        if( len(terapeutas) == 0 ):
            return None
        return terapeutas

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"

"""
Actualiza el id del terapeuta
Salidas
*not-success si no se pudo actualizar
*success si se pudo actualizar
"""
def ActualizarTerapeuta(idcliente, idterapeuta):
    try:
        conexion = pymysql.connect( host="localhost" , user ="root" , password="" , db="elementalv2" )
        cur = conexion.cursor()

        if( conexion == "not-success" ):
            return "not-success"
        sql = "UPDATE cliente SET idTerapeuta={0} WHERE idCliente={1}".format(idterapeuta, idcliente)
        print( sql )
        cur.execute(sql)
        conexion.commit()
        cur.execute(sql)
        print(cur.rowcount, "registros afectado/s")
        conexion.close()
        return 'succes'

    except:    
        #Si la conexion se realizo, cierra la conexion
        if( conexion!= None and conexion!='not-success' ):
            conexion.close()
        return "not-success"