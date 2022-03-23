import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import FormLogin from './../FormLogin';
import logo from './../../logoblanco.png'
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem('token')
const nombre = localStorage.getItem('nombre')

export default function BarraPrincipalAdministrador()
{
    const saludo = "¡Hola "+ nombre +"!";
    let history = useNavigate();
    
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem('nombre')
        localStorage.removeItem('id')
        localStorage.removeItem('tipo')
        history.push("/");
    }

    return (
        <>
                <Navbar collapseOnSelect expand="lg" fixed="top" bg="navbar" className="py-3" >
                    <Container  className="px-4 px-lg-5">
                        <Navbar.Brand href="/"> 
                        <img
                            alt=""
                            src={logo}
                            width="60"
                            height="30"
                            className="d-inline-block align-top"
                        />{'  '}&nbsp;<font color="white"><b>PSICOELEMENTAL</b></font>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto ">
                            <Nav.Link href="/"  className="navlink">Inicio</Nav.Link>
                            <Nav.Link href="/blog" className="navlink">Blog</Nav.Link>
                            <Nav.Link href="/verTerapeutas" className="navlink">Terapeutas</Nav.Link>
                            {token
                            ?<>
                                <Nav.Link href="/citas">Citas</Nav.Link>
                                <Nav.Link href="/listaTerapeutas">Informacion Terapeutas</Nav.Link>
                                <Nav.Link href="/clientes">Clientes</Nav.Link>
                                <Nav.Link href="/registrarse">Alta Terapeutas</Nav.Link>
                                <NavDropdown title={saludo} autoClose={false}>
                                    <NavDropdown.Item href="/" onClick={() => logout()}>Salir</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :<><NavDropdown title="Iniciar Sesión" autoClose={false} >
                                    <NavDropdown.Item style={{width:'30vw'}}  >
                                        <FormLogin className='w-300px'/>
                                    </NavDropdown.Item>
                                </NavDropdown>
                             </>
                            }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )

}