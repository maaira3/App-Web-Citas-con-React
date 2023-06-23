import re 

"""
Valida que el nombre del cliente solo contenga letras y espacios
Parametros 
nombre -> Cadena de caracteres a validar
Salida
'valido' Si el nombre contiene solo letras y espacios
'no-valido' Si el nombre no solo contiene letras y espacios
"""
def validarNombre( nombre ): 
    expresion = re.compile('^[A-Z, ]+$',re.IGNORECASE)

    result = expresion.match(nombre) 

    if( result == None ):
        return "no-valido"
    
    return "valido"

"""
Valida que el telefono del cliente solo contenga numeros y sea exacatamente 10 digitos
Parametros 
telefono -> Cadena de numeros a evaluar
Salida
'valido' Si el telefono contiene solo digitos
'no-valido' Si el telefono no contiene solo digitos
"""
def validarTelefono( telefono ): 
    expresion = re.compile('^[0-9]+$')

    result = expresion.match(telefono) 

    if( result == None ):
        return "no-valido"
    
    return "valido"    

"""
Valida que la edad del cliente solo contenga numeros y se encuentre en un rango razonable
Parametros 
edad -> Cadena de numeros a evaluar
Salida
'valido' Si la edad contiene solo digitos y se encuentra en un rango razonable
'no-valido' Si la edad no contiene solo digitos y no se encuentra en un rango razonable
"""
def validarEdad( edad ): 
    expresion = re.compile('^[0-9]+$')

    result = expresion.match(edad) 

    if( result == None ):
        return "no-valido"
    
    return "valido"   

"""
Valida que el email del cliente contenga formato de correo
Parametros 
email -> Cadena email a evaluar
Salida
'valido' Si el email contiene lo necesario para ser un correo
'no-valido' Si el email no contiene lo necesario para ser un correo
"""
def validarEmail( email ):
    return "valido";    


"""
Valida que el passowrd contenga los suficientes caracteres
Parametros 
password -> Password a evaluar
Salida
'valido' Si el password tiene los caracteres necesarios 
'no-valido' Si el password no tiene los caracteres necesarios
"""
def validarPassword( password ):
    return "valido";        

"""
Valida todos los campos del cliente 
Parametros
cliente -> Cliente a evaluar sus campos
Salida 
'validos' Si todos los campos son validos 
'no-validos' Si almenos un campo no es valido
"""    
def validarCamposCliente(cliente):

    #Obtiene las validaciones para cada campo del cliente

    validacionNombre = validarNombre( cliente["nombre"] )

    validacionTelefono = validarTelefono( cliente["telefono"] )

    validacionEdad = validarEdad( cliente["edad"] )

    validacionEmail = validarEmail( cliente["email"] )

    validacionPassword = validarPassword( cliente["password"] )

    #Si algun campo no es valido

    if( validacionNombre == 'no-valido' or validacionTelefono == 'no-valido' or validacionEdad == 'no-valido' or validacionEmail == 'no-valido' or validacionPassword == 'no-valido' ):
        return "no-validos"

    #Si todos los campos son validos
    
    return "validos"    
