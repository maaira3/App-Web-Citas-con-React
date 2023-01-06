    //Valida el nombre del cliente, si contiene solo letras y espacios entonces retorna 'valido' de lo contrario regresa 'no-valido'
    export function validarNombre(nombre)
    {
        const pettern = new RegExp( '^[A-Z, ]+$' , 'i' );

        if( nombre!==undefined && nombre.length !== 0 )
        {
            //Si el nombre esta compuesto de letras
            if( pettern.test(nombre) )
            {
                return 'valido';
            }
        }
        
        //Si el nombre tiene un caracter que no sea letras
        return "no-valido";
    }

    //Valida el telefono del cliente, si solo contiene numeros y son 10 digitos retorna 'valido' de lo contrario retorna 'no-valido'
    export function validarTelefono(telefono) 
    {
        const pettern = new RegExp( '^[0-9]+$' , 'i' );
        console.log(telefono.length)
        //Si el telefono esta compuesto de numeros
        if( pettern.test(telefono) )
        {

            //Si el telefono no contiene 10 digitos
            if(  telefono.length === 10  )
            {
                return 'valido';   
            }
        }

        //Si no cumple con algun filtro 
        return "no-valido";
    }

    //Valida la edad, si la edad solo contiene numeros y esta dentro de un rango considerable retorna 'valido' de lo contrario retorna 'no-valido'
    export function validarEdad (edad) 
    {

        const pettern = new RegExp( '^[0-9]+$' , 'i' );

        //Si la edad es un numero 
        if( pettern.test(edad) )
        {
            //Si la edad se encuentra entre 3 y 100 años
            if( 3 <= edad && edad <= 100 )
            {
                return 'valido';
            }
        }
        //Si no cumplio con algun filtro
        return "no-valido";
    }

    //Valida el correo 
    export function validarEmail(email)  
    {
        if( email !== undefined && email !== ""  )
        {
            return 'valido';
        }
        return "no-valido";
    }

    //Valida el password
    export function validarPassword(password) 
    {
        if( password !== undefined && password !== ""  )
        {
            return 'valido';
        }
        return "no-valido";
    } 
    

    //Valida cada campo del cliente, actualiza los estados de validacion, si alguno no es valido retorna 'no-validos', si todos son validos retorna 'validos'
    export function validarCampos(form)  
    {
        //Determina la validacion para cada campo

        let validacionNombre = validarNombre( form.nombre );

        let validacionTelefono = validarTelefono( form.telefono );

        let validacionEdad = validarEdad( form.edad );

        let validacionEmail = validarEmail( form.email );

        let validacionPassword = validarPassword( form.password );

        //Establece las validaciones de los campos

        let validaciones =  { 
                                validacionNombre:validacionNombre, 
                                validacionTelefono:validacionTelefono,
                                validacionEdad:validacionEdad,
                                validacionEmail:validacionEmail,
                                validacionPassword:validacionPassword
                            }

        //Si algun campo no es valido

        if( validacionNombre === "no-valido" || validacionEdad === "no-valido" ||  validacionTelefono === "no-valido" ||  validacionEmail === "no-valido" ||  validacionPassword === "no-valido"  )
        {
            return validaciones;         
        }

        //Si todos los campos son validos

        return "validos";
    }
