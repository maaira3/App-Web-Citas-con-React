
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from "react";

export default function FormModificarTerapeuta(props){

    const initialForm  = {
        nombre:"",
        telefono:"",
        edad: 0,
        email:""
    }

    //Funcion para actualizar al terapeuta y el mostrar modal

    const actualizarTerapeuta = props.actualizarTerapeuta;

    const setShow = props.setShow;

    //Variable que almacena el formulario

    const [form,setForm] = useState( initialForm );

    //Variables que almacenan el estado de la validacion de los campos del formulario

    const [validacionNombre,setValidacionNombre] = useState("valido");

    const [validacionTelefono,setValidacionTelefono] = useState("valido");

    const [validacionEdad,setValidacionEdad] = useState("valido");

    const [validacionEmail,setValidacionEmail] = useState("valido");

    useEffect( () => {

        setForm( props.initialForm );

    } , [props.initialForm] )


    //Esta a la escucha de cambios en el formulario, agrega lo que existe ya en el formulario y el nuevo valor
    const handleOnChange = (e) => {

        setForm(
            {
                ...form,
                [e.target.name]:e.target.value
            }
        )
    }

    //Valida el nombre del cliente, si contiene solo letras y espacios entonces retorna 'valido' de lo contrario regresa 'no-valido'
    const validarNombre = (nombre) => {
        const pettern = new RegExp( '^[A-Z, ]+$' , 'i' );

        //Si el nombre esta compuesto de letras
        if( pettern.test(nombre) )
        {
            return 'valido';
        }
        
        //Si el nombre tiene un caracter que no sea letras
        return "no-valido";
    }

    //Valida el telefono del cliente, si solo contiene numeros y son 10 digitos retorna 'valido' de lo contrario retorna 'no-valido'
    const validarTelefono = (telefono) => {
        const pettern = new RegExp( '^[0-9]+$' , 'i' );
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
    const validarEdad = (edad) => {

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
    const validarEmail = (email) => 
    {
        return "valido";
    }

    //Valida el password
    const validarPassword = (password) =>
    {
        return "valido";
    } 
    

    //Valida cada campo del cliente, actualiza los estados de validacion, si alguno no es valido retorna 'no-validos', si todos son validos retorna 'validos'
    const validarCampos = () => 
    {
        //Determina la validacion para cada campo

        let validacionNombre = validarNombre( form.nombre );

        let validacionTelefono = validarTelefono( form.telefono );

        let validacionEdad = validarEdad( form.edad );

        let validacionEmail = validarEmail( form.email );

        let validacionPassword = validarPassword( form.password );

        //Establece las validaciones de los campos

        setValidacionNombre( validacionNombre );

        setValidacionTelefono( validacionTelefono );

        setValidacionEdad( validacionEdad );

        setValidacionEmail( validacionEmail );

        //Si algun campo no es valido

        if( validacionNombre === "no-valido" || validacionEdad === "no-valido" ||  validacionTelefono === "no-valido" ||  validacionEmail === "no-valido" ||  validacionPassword === "no-valido"  )
        {
            return 0;         
        }

        //Si todos los campos son validos

        return 1;
    }

    /*Modifica los valores del terapeuta si los campos son validos */
    const modificarTerapeuta = () =>{
        
        if( !validarCampos() )
        {
            return;
        }

        actualizarTerapeuta( form );

        setShow( false ); 
    }

    return (
        <>
            <Form className="mt-1 text-center">

                <Form.Label htmlFor="nombre"> Nombre </Form.Label>

                <Form.Control type="text" id="nombre" size="sm" className="w-25 element-center" name="nombre" onChange={handleOnChange} value={form.nombre} ></Form.Control> 
                
                {validacionNombre === "no-valido" ? ( <Form.Label className="color-red"> El nombre solo debe contener letras  </Form.Label> )   : ('') }  

                <br></br>

                <Form.Label htmlFor="telefono"> Telefono </Form.Label>

                <Form.Control type="text" id="telefono" size="sm" className="w-25 element-center" name="telefono" onChange={handleOnChange} value={form.telefono} ></Form.Control> 

                {validacionTelefono === "no-valido" ? ( <Form.Label className="color-red"> El telefono solo debe contener números y exactamente 10 digitos  </Form.Label> )   : ('') } 

                <br></br>
                
                <Form.Label htmlFor="edad"> Edad </Form.Label>

                <Form.Control type="number" id="edad" size="sm" className="w-25 element-center" name="edad" onChange={handleOnChange} value={form.edad} ></Form.Control> 

                {validacionEdad === "no-valido" ? ( <Form.Label className="color-red"> La edad debe ser positiva  </Form.Label> )   : ('') } 

                <br></br>

                <Form.Label htmlFor="email"> Email </Form.Label>

                <Form.Control type="text" id="email" size="sm" className="w-25 element-center" name="email" onChange={handleOnChange} value={form.email} ></Form.Control>

                {validacionEmail === "no-valido" ? ( <Form.Label className="color-red">   </Form.Label> )   : ('') }

                <br></br>

                <Button onClick={modificarTerapeuta} > Aceptar </Button>
                
            </Form>
        </> 
    )

}