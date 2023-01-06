import {React, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import {requestPostAwait} from "../helpers/Request"
import Loading from "./Loading";
const token = localStorage.getItem('token')
const tipo = localStorage.getItem('tipo')

export default function FormLogin() {
    const [errors, setErrors] = useState({msg:'', type:0})
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [loading,setLoading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };

    function validateInfo(data) {
    let error={msg:'', type:0}
    if (values.username===''||values.password==='') {
        error.msg= 'Por favor llene ambos campos.'
        error.type=1
    }
    if (data===0){
        error.msg='El password o contraseña son inválidos.'
        error.type=2
    }
    return error;
    }

    async function submitForm(e){
        e.preventDefault()
        setErrors(validateInfo(1));
        const error= validateInfo(1)  
        if (error.type===0)
        {
            const {data}= await requestPostAwait( 'login' , values,setLoading );
            console.log(data)
            console.log( data.data )
            if (data.data!='not-success')
            {
                const usuario = data.data[0]
                localStorage.setItem("token", usuario.token)
                localStorage.setItem("id",usuario.idusuario)
                localStorage.setItem("nombre", usuario.nombre)
                localStorage.setItem("tipo", usuario.tipo)

                if( usuario.tipo === "cliente" )
                {
                    localStorage.setItem("idCliente",usuario.idcliente)
                    localStorage.setItem("pagoServicio", usuario.pagoservicio)
                }

                if( usuario.tipo === "terapeuta" )
                {
                    localStorage.setItem("idTerapeuta",usuario.idterapeuta)
                }
                
                window.location.replace('');
            }else
            {
                setErrors(validateInfo(0));
            }
        }
      }

    const mostrarRegitrarse = () => {
        window.location.href = '/registrarse'; 
    }

    return (
        <div>
            <Loading loading={loading} />
            <Form>
                <Form.Group  controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" name="email" onChange={handleChange }/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña" name="password" onChange={handleChange }/>
                </Form.Group>
                <div >
                    {errors.msg && <p className="error-text">{errors.msg}</p>}
                </div>
                <Button variant="primary" onClick={submitForm}>
                    Ingresar
                </Button>
                    {token
                    ?<>
                    
                    </>
                    :<>
                    <Button className="ml-5"  variant="primary" onClick={mostrarRegitrarse}>
                        Registrarse
                    </Button></>
                    }
                <br/>
                <span className='form-input-login' aligin="center">
                <NavLink id="RouterNavLink"  to="/contact">¿Olvidó su contraseña?</NavLink>
            </span>
            </Form>
    </div>
    )
}
