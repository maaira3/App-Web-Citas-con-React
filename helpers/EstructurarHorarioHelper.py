

"""
Busca en un calendario si una fecha ya fue almacenada
Parametros:
fecha->Tipo string, fecha a buscar en el calendario
calendario->Tipo json, almacena las fechas
Salidas:
*key ->Si se encontro la fecha, Indice donde se encuentra la fecha dentro del calendario
*None ->Si no se encuentra la fecha, Valor nulo
"""
def buscarFechaEnCalendario( fecha , calendario ):

    index = 0

    for horario in calendario:

        if( horario["fecha"] == fecha ):
            return index

        index = index + 1    

    return None        

"""
Coloca los horarios con sus correpondientes fechas
Parametros
horarios ->Tipo json, debe tener los campos (fecha,hora) 
Salidas
calendario -> Tipo json, contiene los campos (contadorHora,fecha,hora1,hora2,...,horak,id) para cada horario pasado por parametro
"""
def organizarPorFechas( horarios ):

     #Inicia variables

    calendario = []

    contadorFechas = 0

    #Organiza los horarios con sus correspondientes fechas

    for horario in horarios:

        #Verifica si la fecha ya existe en el calendario
        indexFecha = buscarFechaEnCalendario( horario["fecha"] , calendario  )

        #Si no existe crea un espacio para esa fecha y almacena el primer horario para esa fecha
        if( indexFecha == None ):

            calendario.append( { "id":contadorFechas,"fecha":horario["fecha"],"contadorHoras":1,"hora0":horario["hora"] } )

            contadorFechas = contadorFechas + 1
        #Si ya existe agrega la nueva hora para esa fecha y actualiza la cantidad de horas ya almacenadas para esa fecha
        else:

            siguienteIndexHora = calendario[indexFecha]["contadorHoras"] 

            indexNuevaHora = "hora"+str( siguienteIndexHora  ) 

            calendario[indexFecha][indexNuevaHora] = horario["hora"]

            calendario[indexFecha]["contadorHoras"] = siguienteIndexHora + 1

    return calendario        

"""
Determina la cantidad maxima de horas creadas considerando todas las fechas
Parametros
calendario -> Tipo json , debe contener el atributo contadorHoras
Salidas
maxCantidadHoras -> Tipo entero, maxima cantidad de horas creadas 
"""

def obtenerMaxCantidadHoras(calendario):
    
    maxCantidadHoras = 0

    for elemento in calendario:
        if( maxCantidadHoras <  elemento["contadorHoras"] ):
            maxCantidadHoras =  elemento["contadorHoras"]

    return maxCantidadHoras        

"""
Convierte un conjunto de horarios al formato calendario de citas
Parametros
horarios -> Tipo json, debe tener los campos (fecha,hora) 
Salida

"""

def crearCalendarioCitas( horarios ):

    #Variables a usar

    calendarioCitas = []

    fechas = []

    calendario = organizarPorFechas(horarios)

    #Agrega las fechas al calendario de citas

    for elemento in calendario:
        fechas.append( elemento["fecha"] )

    calendarioCitas.append( fechas )    

    #Determina la cantidad maxima de horas creadas

    maxCantidadHoras = obtenerMaxCantidadHoras( calendario )

    #Agrega los horarios al calendario de citas

    for indiceHora in range( maxCantidadHoras ):
        horas = []
        for elemento in calendario:
            keyHora = "hora"+str(indiceHora)
            if (  keyHora in elemento.keys() ):
                hora = elemento[keyHora]
                horas.append( hora )
            else:
                horas.append("")    
        calendarioCitas.append( horas )

    return calendarioCitas    
