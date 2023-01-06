
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function FormularioRegistro(props)
{
    const crearUsuario = props.crearUsuario;

    const handleOnChange = props.handleOnChange;

    const validacionNombre = props.validacionNombre;

    const validacionTelefono = props.validacionTelefono;

    const validacionEdad = props.validacionEdad;

    const validacionPassword = props.validacionPassword;

    const validacionEmail = props.validacionEmail;

    return (
        <>
            <Form >
                <Form.Label  htmlFor="nombre"><b> Nombre: </b></Form.Label>

                <Form.Control type="text" id="nombre" size="sm" className="col-md-8" name="nombre" onChange={handleOnChange} ></Form.Control> 
                
                {validacionNombre === "no-valido" ? ( <Form.Label className="color-red"> El nombre solo debe contener letras  </Form.Label> )   : ('') }  

                <br></br>

                <Form.Label htmlFor="telefono"><b> Telefono:</b> </Form.Label>

                <Form.Control type="text" id="telefono" size="sm" className="col-md-8" name="telefono" onChange={handleOnChange} ></Form.Control> 

                {validacionTelefono === "no-valido" ? ( <Form.Label className="color-red"> El telefono solo debe contener números y exactamente 10 digitos  </Form.Label> )   : ('') } 

                <br></br>
                
                <Form.Label htmlFor="edad"><b> Edad: </b></Form.Label>

                <Form.Control type="number" id="edad" size="sm" className="col-md-8" name="edad" onChange={handleOnChange} ></Form.Control> 

                {validacionEdad === "no-valido" ? ( <Form.Label className="color-red"> La edad debe ser positiva  </Form.Label> )   : ('') } 

                <br></br>

                <Form.Label htmlFor="email"> <b>Email:</b> </Form.Label>

                <Form.Control type="text" id="email" size="sm" className="col-md-8" name="email" onChange={handleOnChange} ></Form.Control>

                {validacionEmail === "no-valido" ? ( <Form.Label className="color-red"> Se debe escribir un email   </Form.Label> )   : ('') }

                <br></br>

                <Form.Label htmlFor="password"><b> Password: </b></Form.Label>

                <Form.Control type="password" id="password" size="sm" className="col-md-8" name="password" onChange={handleOnChange} ></Form.Control> 

                {validacionPassword === "no-valido" ? ( <Form.Label className="color-red"> Se debe escribir una clave  </Form.Label> )   : ('') }

                <br></br>
                <Button onClick={crearUsuario} > Enviar </Button>
            </Form>
            <br></br>
        </> 
    )

}